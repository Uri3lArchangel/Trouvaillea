import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    Email:{
        type:String,
        required:true,
        unique:true
    },
    UserId:{
        type:Number,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
    },
    Positions:
        {

            type:[
                {
                 UUID:Number,
                    EntryDate:{
                    type:Date,
                    default:new Date(Date.now())

                    },
                    EntryPrice:{
                    type:Number,
                    default:0
                },WalletAddress:String,
                Amount:String
            }
            ]
            
           
        },
        Verified:{
            type:Boolean,
            default:false,
        },
   
        MagicLinkToken:{
            type:{
                value:{
                    type:String,
                },
            
                ExpiresAt:{
                type:Date,
                default:new Date(Date.now()+1800000)
                },
            }

        },
     

            
      
    
})

const User = models.User ||  model("User",UserSchema)

export default User