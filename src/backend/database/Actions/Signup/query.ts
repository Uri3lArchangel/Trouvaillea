import User from '../../model/UsersModel'
import { HashPass } from '../../utils/HashPassword'
import { ConnectMongo, DisconnectMongo } from '../../utils/connect_disconnect'
import { LinkToken } from '../../utils/magiclinktoken'
import { generateRandomNumbers } from '../../utils/randomuuid'



export const Signup=async(magictoken:string,uuid:number,Email:string,Password:string)=>{
  
    const Hash = HashPass(Password)
    const data={
        Email,Password:Hash,UserId:uuid,MagicLinkToken:{value:magictoken}
    }
   await ConnectMongo()
    console.log("signing up .....")
    await User.create(data)
    console.log("sign up successful")
    await DisconnectMongo()
} 