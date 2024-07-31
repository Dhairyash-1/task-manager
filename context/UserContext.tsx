"use client"

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react"

export interface User {
  userId: string
  fullName: string
  email: string
}

interface UserContextType {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  refreshSession: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  async function loadUserFromCookie() {
    setLoading(true)
    try {
      const response = await fetch("/api/users/verify")
      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Failed to load user", error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUserFromCookie()
  }, [])

  function refreshSession() {
    loadUserFromCookie()
  }

  return (
    <UserContext.Provider value={{ user, loading, setUser, refreshSession }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
