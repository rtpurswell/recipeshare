'use client'
import { useRecipe, useRecipeMutation } from '@/lib/hooks'

export default function Recipe({ id }: { id: string }) {
  const recipe = useRecipe(id)
  const mutation = useRecipeMutation(id)
  if (recipe.isLoading || !recipe.data) return <div>Loading...</div>
  if (recipe.isError) return <div>Recipe not found</div>
  console.log(recipe.data)

  return <div>Recipe</div>
}
