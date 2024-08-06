// components/ProtectedRoute.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase'
import { ReactNode, useEffect } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter()
  const [user, loading, error] = useAuthState(auth)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin')
    }
  }, [user, loading, router])

  if (loading) return <p>Loading...</p>

  if (!user) return null

  return <>{children}</>
}

export default ProtectedRoute
