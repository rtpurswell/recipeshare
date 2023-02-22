import Image from 'next/image'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <h1 className="font-bold text-red-700">Hello Recipe App</h1>
    </main>
  )
}
