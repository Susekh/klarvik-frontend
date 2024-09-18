import SignInForm from '@/components/SignInForm';
import SignUpForm from '@/components/SignUpForm';
import { useState } from 'react'

function Auth() {

  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <>
      <div className='flex items-center justify-center lg:p-12 p-4 dark:bg-neutral-600'>
        <div className='border-2 dark:border-none shadow-lg rounded-lg pt-8 pb-8 pl-12 pr-12 lg:w-96 md:w-3/5 w-10/12 bg-white'>
          {isSignIn? <SignInForm setIsSignIn={setIsSignIn}/> : <SignUpForm setIsSignIn={setIsSignIn}/>}
        </div>
      </div>
    </>
  )
}

export default Auth