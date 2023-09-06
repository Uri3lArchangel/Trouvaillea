import User from "../../model/UsersModel"
import { ConnectMongo, DisconnectMongo } from "../../utils/connect_disconnect"

export const ResetToken=async(Email:string)=>{
  await ConnectMongo()
  await User.updateOne({Email},{"MagicLinkToken.ExpiresAt":new Date(Date.now()+1800000)})
  await DisconnectMongo()
}