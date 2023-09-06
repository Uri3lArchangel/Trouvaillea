import { FetchDataToken } from "@/src/backend/database/Actions/FetchUserData/Bytoken/query"
import { VerifyUser } from "@/src/backend/database/Actions/VerifyUser/query"
import { NextResponse } from "next/server"

export async function GET(req:Request) {
   try{ const {searchParams}= new URL(req.url)
    const token = searchParams.get('verifytoken')
    if(!token){
       return NextResponse.json({data:'Bad Request Missing Verification Token'},{status:400}) 
    }
const user =await FetchDataToken(token)
if(!user){
return NextResponse.redirect(process.env.BASEURL+'/auth/signup')
}
if(Date.now() >= user.MagicLinkToken.ExpiresAt){
    return NextResponse.redirect(process.env.BASEURL+"/auth/tokenexpiry")
}
await VerifyUser(user.Email)
return NextResponse.redirect(process.env.BASEURL+"/")
}catch(err:any){
    if(err.code == "ETIMEOUT"){
        let type="error"
        let msg = `Network Error Check Your connection`
        return NextResponse.json({data:msg,status:type,},{status:400})
    }

    return NextResponse.json({data:"Internal Server Error"},{status:500})

}

}