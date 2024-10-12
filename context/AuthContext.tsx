"use client"

import { useRouter } from "next/navigation"
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react"
import { FieldValues } from "react-hook-form"

export interface User {
  id: string
  fullName: string
  email: string
}

interface AuthContextType {
  user: User | null
  isAuthLoading: boolean // For authentication checks
  isActionLoading: boolean // For login/logout actions
  setUser: (user: User | null) => void
  isAuthenticated: boolean
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
  login: (data: FieldValues) => Promise<void>
  logout: () => Promise<void>
  loginError: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const [isActionLoading, setIsActionLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginError, setLoginError] = useState("")
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      try {
        setIsAuthLoading(true)
        const response = await fetch("/api/users/verify", {
          credentials: "include", // Include cookies if using session-based auth
        })
        if (response.ok) {
          const userData = await response.json()
          setUser(userData.user)
          setIsAuthenticated(true)
        } else {
          setUser(null)
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error("Error in checking auth status:", error)
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setIsAuthLoading(false)
      }
    }

    checkAuth()
  }, [])

  const logout = async () => {
    try {
      setIsActionLoading(true)
      const res = await fetch("/api/users/logout", {
        method: "POST",
        credentials: "include",
      })
      if (res.status === 200) {
        router.push("/login")
        setIsAuthenticated(false)
        setUser(null)
      } else {
        // Optionally, handle error states or display messages to the user
        console.log("Logout failed")
      }
    } catch (error) {
      console.log("Error during logout:", error)
    } finally {
      setIsActionLoading(false)
    }
  }

  const login = async (data: FieldValues) => {
    try {
      setIsActionLoading(true)
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      })
      if (res.status === 200) {
        const responseData = await res.json()
        router.push("/")
        setUser(responseData.data)
        setIsAuthenticated(true)
        console.log("Login successful:", responseData)
      } else {
        const errorData = await res.json()
        console.log("Login failed:", errorData)
        setLoginError(errorData.error)
        // Optionally, handle error states or display messages to the user
      }
    } catch (error: any) {
      console.log("Error during login:", error)
      // Optionally, handle error states or display messages to the user
    } finally {
      setIsActionLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthLoading,
        isActionLoading,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        loginError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider")
  }
  return context
}
