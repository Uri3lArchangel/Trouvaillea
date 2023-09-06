import {
  decryptData,
  encryptData,
} from "@/src/backend/Auth/CryptoCiphers/Cipher";
import { FullDecode } from "@/src/backend/Auth/cookie_jwt_decode/decode";
import { SessionCookieSetter } from "@/src/backend/Auth/cookies/cookie";
import { JWTDecode, JWTSign } from "@/src/backend/Auth/jwt/jwtFunctions";
import { SEND } from "@/src/backend/Email/send";
import { Signin } from "@/src/backend/database/Actions/SignIn/query";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { Email, Password } = await req.json();

    const user = await Signin(Email, Password);
    if (!user) {
      return NextResponse.json(
        { message: "The credentials you provided are incorrect" },
        { status: 400 }
      );
    }
    var cookie = cookies().get("session-auth-0");
    if (cookie && cookie.value != "") {
      const userdata = await FullDecode(cookie.value);

      if (userdata.Status) {
        if (new Date(Date.now()) < userdata.Expire) {
          return NextResponse.redirect(new URL("/", req.url));
        } else {
          cookies().delete("session-auth-0");
          return NextResponse.redirect(new URL("/auth/signin", req.url));
        }
      }
      console.log("signin sending");
      await SEND(Email, userdata.UUID, user.MagicLinkToken.value);

      return NextResponse.redirect(new URL("/auth/verifyemail", req.url));
    }

    const userobj: {
      Email: string;
      Status: boolean;
      UUID: number;
      Positions: Object[];
      Expire: Date;
    } = {
      Email,
      Status: user.Verified,
      UUID: user.UserId,
      Positions: user.Positions,
      Expire: new Date(Date.now() + 3600000),
    };
    const key = process.env.KEY!;
    const token = JWTSign(userobj, key);
    const digest = encryptData(token);
    SessionCookieSetter(digest);
    return NextResponse.json(
      { message: "Signed In Successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    if (err.code == "ETIMEOUT") {
      let msg = `Network Error Check Your connection`;
      return NextResponse.json({ message: msg }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
