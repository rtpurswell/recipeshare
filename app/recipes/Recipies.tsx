'use client'
import { useState } from 'react'
import { useUserId } from '@/lib/auth'
import { useRecipes, useRecipesMutation } from '@/lib/hooks'
import Recipe from './Recipe'

export default function Recipes() {
  const userId = useUserId()
  const recipes = useRecipes(userId)
  const mutation = useRecipesMutation()

  if (recipes.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {recipes.data.map((recipe) => {
        return <Recipe key={recipe._id} id={recipe._id} />
      })}
      <div>
        <TestInput
          onSubmit={(value) => () => {
            console.log(value, userId)
            mutation.mutate({ name: value, userId })
          }}
        />
      </div>
    </div>
  )
}
const TestInput = ({
  onSubmit,
}: {
  onSubmit: (value: string) => () => void
}) => {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  return (
    <>
      <input value={inputValue} onChange={handleInputChange} />
      <button onClick={onSubmit(inputValue)}> Add New</button>
    </>
  )
}
