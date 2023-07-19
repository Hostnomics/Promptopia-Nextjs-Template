//set up (1:25:25) 
import mongoose from 'mongoose'

let isConnected = false; // track the connection


export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    //(1:26:41) - if not connected, pass in DB uri saved in env
    try {
        console.log("in try block of database.js mongoose NOT connected")
        await mongoose.connect(process.env.MONGODB_URI, {
        // pass in the options
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;
        console.log('MongoDB connected in mongoose.connect try block')
    } catch (error){
        console.log("MongoDB Connect error block returned:",error)
    }
}
