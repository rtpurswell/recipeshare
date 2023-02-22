'use client'

import { useAuthUser } from '@react-query-firebase/auth'
import { auth, signUserIn, signUserOut } from '@/lib/backend'
import Link from 'next/link'
export default function Navigation() {
  const user = useAuthUser(['user'], auth)
  const isSignedIn = user.data
  return (
    <nav>
      <ul className="flex justify-between p-3">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/recipes">Browse</Link>
        </li>
        <li>
          {isSignedIn ? (
            <button onClick={signUserOut}>Sign Out</button>
          ) : (
            <button onClick={signUserIn}>Sign In</button>
          )}
        </li>
      </ul>
    </nav>
  )
}
