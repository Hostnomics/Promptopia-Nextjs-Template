import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Set up around (19:45ish): https://youtu.be/wm5gMKuwSYk?t=4785
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: '',
            clientSecret: '',
        })
    ],
    async session({ session }) {

    },
    async signIn({ profile }) {

    }
})

export {handler as GET, handler as POST};