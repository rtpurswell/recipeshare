'use client'
import { useAuthUser } from '@react-query-firebase/auth'
import Loading from './Loading'
import { auth } from '@/lib/backend'
import { collection, query, where } from 'firebase/firestore'
import { firestore } from '@/lib/backend'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'

import SetUserName from './SetUserName'
import { useUserId } from '@/lib/auth'

export default function RequireUsername({
  children,
}: {
  children: React.ReactNode
}) {
  const userId = useUserId()
  const userNameQuery = query(
    collection(firestore, 'usernames'),
    where('userId', '==', userId),
  )
  const username = useFirestoreQueryData(['username', userId], userNameQuery, {
    idField: 'username',
  })

  if (username.isLoading) {
    return <Loading />
  }
  if (username.data?.length === 0) {
    return <SetUserName />
  }
  return <>{children}</>
}
