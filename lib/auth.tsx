import { useAuthUser } from '@react-query-firebase/auth'
import { auth } from '@/lib/backend'

export function useUserId() {
  const user = useAuthUser(['user'], auth)
  if (!user.data) return null
  return user.data.uid
}
