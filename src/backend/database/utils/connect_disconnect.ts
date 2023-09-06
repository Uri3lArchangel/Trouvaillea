import Mongoose from 'mongoose'

const URL = process.env.MONGODBURL!
export async function ConnectMongo(){
    console.log("connecting to database")
    await Mongoose.connect(URL)
    console.log("connected")


}

export async function DisconnectMongo(){
    console.log("disconnecting from database")
    await Mongoose.disconnect()
    console.log("diconnected")


}