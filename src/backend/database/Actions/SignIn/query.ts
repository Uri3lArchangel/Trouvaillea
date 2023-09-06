import User from "../../model/UsersModel"
import { HashPass } from "../../utils/HashPassword"
import { ConnectMongo, DisconnectMongo } from "../../utils/connect_disconnect"

export const Signin=async(Email:string,Password:string)=>{
  await ConnectMongo()
  const PasswordHash=HashPass(Password)
  var user =await User.findOne({Email,Password:PasswordHash})
  await DisconnectMongo()
  return user
}