//Built out at 1:18:20: https://youtu.be/wm5gMKuwSYk?t=4700
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user'; // Imported from models/user.js at (1:34:51)
import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
//   callbacks CORRECTED (1:47:48): {
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // check if user already exists (at 1:35:00)
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    }
  } //callbacks closing bracket
})

export { handler as GET, handler as POST }