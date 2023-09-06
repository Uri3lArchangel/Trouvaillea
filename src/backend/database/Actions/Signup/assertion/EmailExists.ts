import { ConnectMongo } from "../../../utils/connect_disconnect"
import User from "../../../model/UsersModel"

export const EmailCheck = async(Email:string)=>{
    await ConnectMongo()
    const user= await User.findOne({$where:Email})
    if(user){
        return true
    }
    return false
}