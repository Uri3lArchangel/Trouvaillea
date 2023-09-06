import { FullDecode } from "@/src/backend/Auth/cookie_jwt_decode/decode"
import { SENDCONFIRMATION } from "@/src/backend/Email/send"
import { OpenPosition } from "@/src/backend/database/Actions/OpenPosition/query"
import { fetchPrice } from "@/src/backend/web3/price/fetchLive"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req:Request) {
    try{const {walletaddress} = await req.json()
    const init = cookies().get("session-auth-0")
    if(!init){
        return NextResponse.redirect(new URL("/auth/signin",req.url))
    }
    const user =await FullDecode(init.value)
    if(!user || !user.Email){
        return NextResponse.redirect(new URL("/auth/signin",req.url))
    }
    const btcPrice = await fetchPrice()
    console.log(btcPrice)
    const btcunit = 26 / btcPrice
    await OpenPosition(user.Email,btcPrice,walletaddress,String(btcunit),user.UUID)
    await SENDCONFIRMATION(user.Email,user.UUID,btcPrice)
    return NextResponse.json({data:`Position Successfully opened at $${btcPrice.toLocaleString()}`},{status:201})}
    catch(err:any){
        if(err.code == "ETIMEOUT"){
            let msg = `Network Error Check Your connection`
            return NextResponse.json({data:msg},{status:400})
        }
     console.log(err)
        return NextResponse.json({data:"Internal Server Error"},{status:500})
     
    }
}