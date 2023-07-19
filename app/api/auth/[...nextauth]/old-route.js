import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// (1:34:50) import User model we created in Models
import User from '@models/user';
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
    //Add callbacks (1:47:50): https://youtu.be/wm5gMKuwSYk?t=6470
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            });
    
            //(1:36:47) - session user id
            session.user.id = sessionUser._id.toString();
    
            return session;
        },
        async signIn({ profile }) {
        // async signIn({ account, profile, user, credentials }) {

        //Built out (1:24:46)
            try {
                //serverless route => lambda function spins up only when called
                // (1:29:56) - Connect to MongoDB/Atlast Cluster0
                await connectToDB();
    
                //1. Check if a user already exists:
                const userExists = await User.findOne({
                    email: profile.email
                });
    
                //2. If not, create a NEW user and save it to the database:
                // (1:35:45ish)- no spaces username: profile.name.repace(" ", "").toLowerCase(),
                if(!userExists){
                    await User.create({
                        email: profile.email,
                        username: profile.name.repace(" ", "").toLowerCase(),
                        image: profile.picture
                    });
                }
    
                return true;
            } catch (error) {
                console.log("signIn fn error from route.js is: ",error)
                return false;
            }
        }
    }
})

export {handler as GET, handler as POST};