import User from "../../../model/UsersModel"
import { ConnectMongo, DisconnectMongo } from "../../../utils/connect_disconnect"

export const FetchAllData=async()=>{
  await ConnectMongo()
  var users =await User.find({})
  await DisconnectMongo()
  return users
}