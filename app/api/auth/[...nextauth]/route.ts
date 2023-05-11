import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma";

export const authOptions: AuthOptions = {

  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user = user;
      }

      return session;
    },
  },
  debug: !(process.env.NODE_ENV === "production"),
  events: {
    async signIn({ user, isNewUser }) {
     
    },
  },
  providers: [
    GoogleProvider({
     clientId: process.env.GOOGLE_ID || "",
     clientSecret: process.env.GOOGLE_SECRET || "",
   }),
   // ...add more providers here
 ],
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }