'use client'
import { useCallback, useState } from 'react'
import _debounce from 'lodash/debounce'
export default function DebouncedInput({
  onChange,
  className,
  onStart,
}: {
  onChange: (value: string) => void
  className?: string
  onStart: () => void
}) {
  const [value, setValue] = useState('')
  const debouncedOnChange = useCallback(_debounce(onChange, 1000), [])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    debouncedOnChange(e.target.value)
    onStart()
  }
  return (
    <input value={value} className={className} onChange={handleInputChange} />
  )
}
