import {
  useFirestoreCollectionMutation,
  useFirestoreDocument,
  useFirestoreDocumentMutation,
  useFirestoreQueryData,
} from '@react-query-firebase/firestore'
import { collection, doc, query, where } from 'firebase/firestore'
import { useMemo } from 'react'
import { useQueryClient } from 'react-query'
import { firestore } from './backend'
import type { TRecipe } from './types'
export function useRecipes(userId: string | null) {
  if (userId === null) return { isLoading: false, data: [] }
  const queryData = useFirestoreQueryData(
    ['recipes'],
    query(collection(firestore, 'recipes'), where('userId', '==', userId)),
    {
      idField: '_id',
    },
  )
  return { isLoading: queryData.isLoading, data: queryData.data || [] }
}
export function useRecipe(id: string) {
  const recipeQuery = useFirestoreDocument(
    ['recipe', { id }],
    doc(firestore, 'recipes', id),
  )

  if (recipeQuery.isError)
    return { isError: true, isLoading: false, data: null }
  if (recipeQuery.isLoading)
    return { isError: false, isLoading: true, data: null }

  return {
    isError: false,
    isLoading: false,
    data: { ...recipeQuery.data?.data(), _id: id },
  }
}
export function useRecipesMutation() {
  const queryClient = useQueryClient()
  return useFirestoreCollectionMutation(collection(firestore, 'recipes'), {
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['recipes'], (oldData: any) => {
        return [...oldData, { ...variables, _id: data.id }]
      })
    },
  })
}
export function useRecipeMutation(id: string) {
  const queryClient = useQueryClient()
  return useFirestoreDocumentMutation(
    doc(collection(firestore, 'recipes'), id),
    {
      merge: true,
    },
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(['recipes'], (oldData: any) => {
          const newData = [...oldData]
          const index = newData.findIndex((r: any) => r._id === id)
          if (index === -1) return newData
          newData[index] = { ...variables, _id: id }
          return newData
        })
      },
    },
  )
}
