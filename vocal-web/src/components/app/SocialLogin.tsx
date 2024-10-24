'use client'

import { setCookie } from '@/lib/utils'
import { httpClient } from '@/services/httpClient'
import { GoogleLogin } from '@react-oauth/google'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export const SignInClient = () => {
  const onSuccess = (credentialResponse) => {
    console.log('credentialResponse', credentialResponse)
    httpClient
      .post('/auth/google', {
        access_token: credentialResponse.credential,
      })
      .then((data) => {
        console.log('Server response:', data)
        document.cookie = `jwt=${data.data.token}; path=/;`
        setCookie('jwt', data.data.token, 3600)
        window.location.href = '/app'
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="primary-color-bg rounded-[20px] rounded-br-none border px-5 py-2 text-lg font-light text-white transition ease-linear md:inline-block lg:px-8 lg:py-4 bg-indigo-500 hover:bg-indigo-400">
            Get Started
          </button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            {/* <AlertDialogTitle className="text-center">Sign in to <span className='text-primary'>Vocal</span></AlertDialogTitle> */}

            <AlertDialogDescription className="flex flex-col gap-4 justify-center items-center pb-8">
              <img src="/images/welcome.svg" className="w-[330px]" alt="welcome-image" />

              <div className='mb-6'>
                <h2 className="text-center text-lg font-bold text-[#1a1a1a]">
                  Hello, welcome back!
                </h2>
                <p>Login via social media to continue</p>
              </div>

              <GoogleLogin
                onSuccess={onSuccess}
                onError={() => {
                  console.log('Login Failed')
                }}
                theme="outline"
                shape="circle"
              />
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
