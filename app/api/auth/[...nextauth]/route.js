import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// (1:29:56) - Connect to MongoDB/Atlast Cluster0
import { connectToDB } from '@utils/database';


//Test by console logging an object with both:
// console.log({
//     clientId: process.env.GOOGLE_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// })

// Set up around (19:45ish): https://youtu.be/wm5gMKuwSYk?t=4785
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    async session({ session }) {

    },
    async signIn({ profile }) {
    //Built out (1:24:46)
        try {
            //serverless route => lambda function spins up only when called
            // (1:29:56) - Connect to MongoDB/Atlast Cluster0
            await connectToDB();

            //1. Check if a user already exists:


            //2. If not, create a NEW user and save it to the database:

            return true;
        } catch (error) {
            console.log("signIn fn error from route.js is: ",error)
            return false;
        }
    }
})

export {handler as GET, handler as POST};