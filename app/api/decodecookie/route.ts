import { FullDecode } from "@/src/backend/Auth/cookie_jwt_decode/decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try{
        
        const {cookie} = await req.json()
       
    const user = await FullDecode(cookie)

    return NextResponse.json({data:user,status:true})
}catch(err:any){
        return NextResponse.json({data:err.message,status:false})
    }
}