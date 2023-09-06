import { cookies } from "next/headers"

export const Signout=()=>{
    cookies().delete("session-auth-0")
}