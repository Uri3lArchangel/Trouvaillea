import User from "../../model/UsersModel"
import { ConnectMongo, DisconnectMongo } from "../../utils/connect_disconnect"

export const VerifyUser=async(Email:string)=>{
  await ConnectMongo()
  console.log(Email)
  await User.updateOne({Email},{Verified:true,"MagicLinkToken.value":null,"MagicLinkToken.Used":true})
  await DisconnectMongo()
 
}