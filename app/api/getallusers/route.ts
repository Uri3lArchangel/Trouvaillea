import { FetchAllData } from "@/src/backend/database/Actions/FetchUserData/all/query"
import { NextResponse } from "next/server"

export async function GET(req:Request) {
    try{
        const allusers = await FetchAllData()

        return NextResponse.json(allusers)
    }catch(err:any){
        console.error(err.message)
        return NextResponse.json(err.message)

    }
}