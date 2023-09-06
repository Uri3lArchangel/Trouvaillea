import { SEND } from "@/src/backend/Email/send";
import { DeleteUser } from "@/src/backend/database/Actions/Signup/delete/query";
import { Signup } from "@/src/backend/database/Actions/Signup/query";
import { LinkToken } from "@/src/backend/database/utils/magiclinktoken";
import { generateRandomNumbers } from "@/src/backend/database/utils/randomuuid";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try{const {Email,Password}=await req.json()
    const uuid= generateRandomNumbers(parseInt(Password.length+Email.length+(Math.random()*100).toFixed(0)))
    const magictoken=LinkToken(Email,uuid)
    await Signup(magictoken,uuid,Email,Password)
   let res= await SEND(Email,uuid,magictoken)
   if(res.status == false){
    await DeleteUser(uuid,Email)
    return NextResponse.json({data:"Sign Up Unsuccessful Try Again" },{status:400})
   }
   console.log(res)
   await fetch(new URL("/api/signin",req.url),{
    method:'POST',
    body:JSON.stringify({Email,Password})
   })
    return NextResponse.json({data:'Sign Up Successful'},{status:201})
}catch(err:any){
    console.error(err)
    if(err.code == 11000){
        let type="error"
        let msg = `An account already exists With this ${Object.keys(err.keyValue)[0]} : ${err.keyValue[Object.keys(err.keyValue)[0]]}`
        return NextResponse.json({data:msg},{status:400})
    }if(err.code == "ETIMEOUT"){
        let type="error"
        let msg = `Network Error Check Your connection`
        return NextResponse.json({data:msg,status:type,},{status:400})
    }

    return NextResponse.json({data:"Internal Server Error"},{status:500})

}
}