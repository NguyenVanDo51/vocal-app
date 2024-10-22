'use client'

import { setCookie } from '@/lib/utils'
import { httpClient } from '@/services/httpClient'
import { GoogleLogin } from '@react-oauth/google'
import {useRouter} from 'next/navigation'
export const SignInClient = () => {
  const router = useRouter()

  return (
    <div className="flex items-center justify-center min-w-screen min-h-screen">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse)
          httpClient
            .post('/auth/google', { access_token: credentialResponse.credential })
            .then((data) => {
              console.log('Server response:', data)
              document.cookie = `jwt=${data.data.token}; path=/;`;
              setCookie('jwt', data.data.token, 3600)
              window.location.href = '/'
            })
            .catch((error) => {
              console.error('Error:', error)
            })
        }}
        onError={() => {
          console.log('Login Failed')
        }}
      />
    </div>
  )
}
