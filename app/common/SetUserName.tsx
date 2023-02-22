'use client'
import { useUserId } from '@/lib/auth'
import { auth, firestore } from '@/lib/backend'
import { useAuthUser } from '@react-query-firebase/auth'
import {
  useFirestoreDocumentData,
  useFirestoreDocumentMutation,
} from '@react-query-firebase/firestore'
import { doc } from 'firebase/firestore'
import { useState } from 'react'
import { useQueryClient } from 'react-query'
import DebouncedInput from './DebouncedInput'

export default function SetUserName({}: {}) {
  const queryClient = useQueryClient()
  const userId = useUserId()
  const [selectedUsername, setSelectedUsername] = useState<string>('')
  const [isAvailable, setIsAvailable] = useState<boolean>(false)

  const usernameRef = doc(firestore, 'usernames', selectedUsername || 'taken')
  const usernameMutation = useFirestoreDocumentMutation(usernameRef)
  const isTaken = useFirestoreDocumentData(
    ['usernames', selectedUsername],
    usernameRef,
  )

  const handleInputChange = (value: string) => {
    if (value !== '') {
      setSelectedUsername(value)
      setIsAvailable(true)
    }
  }
  const handleChangeStart = () => {
    setIsAvailable(false)
  }

  return (
    <div>
      <DebouncedInput
        onStart={handleChangeStart}
        onChange={handleInputChange}
      />
      {isTaken.isLoading
        ? 'Loading...'
        : isTaken.data && selectedUsername !== '' && isAvailable
        ? 'Taken'
        : isAvailable
        ? 'Available'
        : selectedUsername === ''
        ? 'Enter username'
        : 'Searching...'}
      <div>
        <button
          onClick={() => {
            usernameMutation.mutate(
              { userId, username: selectedUsername },
              {
                onSuccess: (data, variables) => {
                  queryClient.setQueryData(['username', userId], variables)
                },
              },
            )
          }}
        >
          Use this Username
        </button>
      </div>
    </div>
  )
}
