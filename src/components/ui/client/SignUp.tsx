"use client"
import React from 'react'
import { Input } from '../input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signupSchema, SignUpSchemaType } from '@/types/auth'
import {zodResolver} from "@hookform/resolvers/zod"
import { Button } from '../button'
import { handleSignUp } from '@/app/actions/auth'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'

const SignUpForm = () => {

    const {register,handleSubmit,formState:{errors,isLoading}} = useForm<SignUpSchemaType>({resolver:zodResolver(signupSchema)})
    const onSubmit:SubmitHandler<SignUpSchemaType> =async (data)=>{
      const {email,password,username} = data
      const toastId = toast.loading("Creating user")
      const response  = await handleSignUp(email,password,username)
      if( "error" in  response){
        toast.error(response.error,{id:toastId})
        return
      }
      toast.success("User Created!",{id:toastId})
      redirect("/signin")
    }
  return (
    <form className=' flex flex-col space-y-2 ' onSubmit={handleSubmit(onSubmit)}>
    <Input {...register("username")} type="text" placeholder='pradeep' />
    {errors.username && <span className=' text-red-400'>{errors.username.message}</span>}
    <Input {...register("email")} type="email" placeholder='pradeep@gmail' />
    {errors.email && <span className=' text-red-400'>{errors.email.message}</span>}
    <Input {...register("password")} type="password" placeholder='****' />
    {errors.password && <span className=' text-red-400'>{errors.password.message}</span>}
    <Button type="submit">Create Account</Button>
    </form>
  )
}

export default SignUpForm