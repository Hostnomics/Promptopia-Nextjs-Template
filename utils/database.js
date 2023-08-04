//built out at (1:25:28): https://youtu.be/wm5gMKuwSYk?t=5128

import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }
 
  try {
    console.log("In try block of mongoose.connect")
    await mongoose.connect(
        process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );

    isConnected = true;

    console.log('MongoDB connected from utils/database.js')
  } catch (error) {
    console.log("error from utils/database.js catch block if isConnected is false",error);
  }
}