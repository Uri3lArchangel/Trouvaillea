import { decryptData } from "@/src/backend/Auth/CryptoCiphers/Cipher";
import { FullDecode } from "@/src/backend/Auth/cookie_jwt_decode/decode";
import { JWTDecode } from "@/src/backend/Auth/jwt/jwtFunctions";
import { SEND } from "@/src/backend/Email/send";
import { FetchData } from "@/src/backend/database/Actions/FetchUserData/query";
import { ResetToken } from "@/src/backend/database/Actions/ResetToken/query";
import { Signin } from "@/src/backend/database/Actions/SignIn/query";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
   try {
   const cookie= cookies().get("session-auth-0")
   if(cookie){

    const userobj = await FullDecode(cookie.value)
   const user =  await FetchData(userobj.Email)
   if(user.Verified){
    return NextResponse.redirect(new URL("/",req.url))
   }

   await ResetToken(userobj.Email)

   const res = await SEND(user.Email,user.UserId,user.MagicLinkToken.value)

   if(!res.status){
    return NextResponse.json({data:"Unable to send mail" },{status:500})
   }
  
   }else{
    return NextResponse.redirect(new URL("/auth/signup",req.url))
   }
   return NextResponse.json({data:"Email Has Been Sent To Your Email Address"})
}catch(err:any){
    console.error(err)
   if(err.code == "ETIMEOUT"){
        let msg = `Network Error Check Your connection`
        return NextResponse.json({data:msg},{status:400})
    }
 
    return NextResponse.json({data:"Internal Server Error"},{status:500})

}
}