import { decryptData } from "../CryptoCiphers/Cipher"
import { JWTDecode } from "../jwt/jwtFunctions"

export const FullDecode = async(cookie:string)=>{
    const jwttoken = decryptData(cookie)
    const userdata = JWTDecode(jwttoken) as {Email:string,Status:boolean,UUID:number,Positions:{EntryDate:Date,EntryPrice:number}[],Expire:Date}

    return userdata
    
}