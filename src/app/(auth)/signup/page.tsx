import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SignUpForm from '@/components/ui/client/SignUp'

import React from 'react'


const SignUp = () => {
  return (
    <main className='  h-screen flex justify-center items-center'>
        <Card className='w-1/2 mx-auto'>
            <CardHeader>
                <CardTitle>
                  <h1 className='text-center'>
                    Create Account
                  </h1>
                </CardTitle>
            </CardHeader>
            <CardContent>
              <SignUpForm/>
            </CardContent>
        </Card>
    </main>
  )
}

export default SignUp