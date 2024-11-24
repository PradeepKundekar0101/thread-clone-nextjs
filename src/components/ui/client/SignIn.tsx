"use client"
import React from 'react'
import { Input } from '../input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SignInSchemaType,signinSchema} from '@/types/auth'
import {zodResolver} from "@hookform/resolvers/zod"
import { Button } from '../button'
import { handleSignIn  } from '@/app/actions/auth'
import { toast } from 'sonner'
import Link from 'next/link'
// import { redirect } from 'next/navigation'

const SignInForm = () => {
    const {register,handleSubmit,formState:{errors}} = useForm<SignInSchemaType>({resolver:zodResolver(signinSchema)})
    const onSubmit:SubmitHandler<SignInSchemaType> =async (data)=>{
      const {email,password} = data
      const toastId = toast.loading("Logging in user")
      const response  = await handleSignIn(email,password)
      if( "error" in  response){
        toast.error(response.error,{id:toastId})
        return
      }
      toast.success("Login Success!",{id:toastId})

    }
  return (
    <form className=' flex flex-col space-y-2 ' onSubmit={handleSubmit(onSubmit)}>
   
    <Input {...register("email")} type="email" placeholder='pradeep@gmail' />
    {errors.email && <span className=' text-red-400'>{errors.email.message}</span>}
    <Input {...register("password")} type="password" placeholder='****' />
    {errors.password && <span className=' text-red-400'>{errors.password.message}</span>}
    <Button type="submit">Login</Button>
    <Link href={"/signup"}> Don't have an account</Link>
    </form>
  )
}

export default SignInForm