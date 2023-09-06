import User from "../../../model/UsersModel"
import { ConnectMongo, DisconnectMongo } from "../../../utils/connect_disconnect"

export const FetchDataToken=async(Token:string)=>{
  await ConnectMongo()
  var user =await User.findOne({"MagicLinkToken.value":Token})
  await DisconnectMongo()
  return user
}