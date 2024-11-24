import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SignInForm from '@/components/ui/client/SignIn'

import React from 'react'
const SignIn = () => {
  return (
    <main className='  h-screen flex justify-center items-center'>
        <Card className='w-1/2 mx-auto'>
            <CardHeader>
                <CardTitle>
                  <h1 className='text-center'>
                    Login
                  </h1>
                </CardTitle>
            </CardHeader>
            <CardContent >
              <SignInForm/>
            </CardContent>
        </Card>
    </main>
  )
}

export default SignIn