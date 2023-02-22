'use client'
import { useAuthUser } from '@react-query-firebase/auth'
import Loading from './Loading'
import { auth } from '@/lib/backend'
import RequireUsername from './RequireUsername'
import { signUserIn } from '@/lib/backend'
export default function RequiresAuthUser({
  children,
}: {
  children: React.ReactNode
}) {
  const user = useAuthUser(['user'], auth)

  if (user.isLoading) {
    return <Loading />
  }
  const signedIn = user.data

  if (!signedIn) {
    return (
      <div>
        <h1>Please Sign In</h1>
        <button onClick={() => signUserIn()}>Sign In</button>
      </div>
    )
  }

  return <RequireUsername>{children}</RequireUsername>
}
