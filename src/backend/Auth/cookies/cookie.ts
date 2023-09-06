import { cookies } from "next/headers"

export const SessionCookieSetter= (token:string) => {
    cookies().delete("session-auth-0")
    cookies().set("session-auth-0",token,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge:3600
    
    })
}