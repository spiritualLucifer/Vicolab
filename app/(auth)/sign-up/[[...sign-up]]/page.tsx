import { SignUp } from '@clerk/nextjs'
import React from 'react'

function SignUpPage() {
  return (
    <main className='flex h-screen w-full justify-center items-center'>
        <SignUp/>
    </main>
  )
}

export default SignUpPage