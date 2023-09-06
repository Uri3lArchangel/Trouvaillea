import User from "../../model/UsersModel"
import { ConnectMongo, DisconnectMongo } from "../../utils/connect_disconnect"

export const OpenPosition=async(Email:string,EntryPrice:number,address:string,amount:string,UUID:number)=>{
    console.log(Email)
    const obj = {UUID,EntryPrice,WalletAddress:address,Amount:String(parseFloat(amount).toFixed(6))}
    

  await ConnectMongo()
  await User.updateOne({Email},{$push:{Positions:obj}})
  await DisconnectMongo()
}