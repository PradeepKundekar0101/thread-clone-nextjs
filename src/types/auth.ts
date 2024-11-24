import {z} from "zod"
export const signupSchema = z.object({
    username: z.string().min(4,"user name must be atleast 4 chars").max(34,"Max 34 chars"),
    email: z.string().email(),
    password: z.string().min(4,"Password must be min 4").max(10,"Max 10 character")
})


export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4,"Password must be min 4").max(10,"Max 10 character")
})

export type SignUpSchemaType = z.infer<typeof signupSchema>
export type SignInSchemaType = z.infer<typeof signinSchema>