import { SignInClient } from './SignInClient'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Page(req) {
  const cookieStore = cookies()
  const jwt = cookieStore.get('jwt')
  if (jwt) {
    return redirect('/')
  }

  return <SignInClient />
}
