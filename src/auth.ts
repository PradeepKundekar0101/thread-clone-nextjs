import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/db";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          name: "email",
        },
        password: {
          label: "Password",
          name: "password",
        },
      },
      async authorize(credentials, request) {
        const { email, password } = credentials;
        if( typeof email !=="string"  || typeof password !=="string"){
          throw new CredentialsSignin("Invalid creds")
        }
        const existingUser = await prisma.user.findFirst({
          where:{email}
        })
        if(!existingUser){
          throw new CredentialsSignin({cause:"Invalid creds"})

        } 
        const isPasswordCorrect = await compare(password,existingUser.password)
        if(!isPasswordCorrect){
          throw new CredentialsSignin({cause:"Invalid creds"})
        }
        return existingUser;
      },
    }),
  ],
  pages:{
    signIn:"/login"
  }
});
