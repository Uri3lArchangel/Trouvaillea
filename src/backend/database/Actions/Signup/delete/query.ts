import User from '../../../model/UsersModel'
import { ConnectMongo, DisconnectMongo } from '../../../utils/connect_disconnect'



export const DeleteUser=async(uuid:number,Email:string)=>{

   await ConnectMongo()
    console.log("corrective deleting .....")
    const user = User.findOne({UserId:uuid,Email})
    if(!user){
        return
    }
    await User.deleteOne({UserId:uuid,Email})
    console.log("correcive deleting done")
    await DisconnectMongo()
} 