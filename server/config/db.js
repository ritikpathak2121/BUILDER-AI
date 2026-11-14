import mongoose from 'mongoose'
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

export async function connectToDatabase(){
    mongoose.connection.on('connected', ()=>{
        console.log("Successfully connected to MongoDB.")
    })
    await mongoose.connect(process.env.MONGODB_URI)
}