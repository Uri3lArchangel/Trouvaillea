import User from "../../model/UsersModel"
import { ConnectMongo, DisconnectMongo } from "../../utils/connect_disconnect"

export const FetchData=async(Email:string)=>{
  await ConnectMongo()
  var user =await User.findOne({Email})
  await DisconnectMongo()
  return user
}