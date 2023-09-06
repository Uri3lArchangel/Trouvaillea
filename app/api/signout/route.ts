import { Signout } from "@/src/backend/Auth/signout/SignoutFull";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    Signout()
    return NextResponse.redirect(new URL("/auth/signin",req.url))
}