import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "./lib/db"
import {compare} from "bcryptjs"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        credentials:{
            email:{
                name:"email",
                label:"Email"
            },
            password:{
                name:"password",
                label:"Password"
            }
        },
        authorize:async(credentials)=>{
            const {email,password} = credentials
            if( typeof email !="string" || typeof password !='string'){
                throw new CredentialsSignin({cause:"Please provide email and password"})
            }
            const existingUser = await prisma.user.findFirst({
                where:{email}
            })
            if(!existingUser){
                throw new CredentialsSignin({cause:"Invalid credentials"})
            }
            const correctPassword = await compare(existingUser.password,password);
            if(!correctPassword){
                throw new CredentialsSignin({cause:"Invalid credentials"})
            }
            return existingUser
        }
    })
  ],

  pages:{
    signIn:"/login"
  }
})