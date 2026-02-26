import { create } from "zustand"
import { getCurrentUser } from "@/services/auth/authApi"

type AuthState = {
  token: string | null
  isInitialized: boolean

  setToken: (token: string | null) => void
  logout: () => void
  initAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isInitialized: false,

  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token)
    } else {
      localStorage.removeItem("token")
    }

    set({ token })
  },

  logout: () => {
    localStorage.removeItem("token")
    set({ token: null })
  },

 initAuth: async () => {
  const token = localStorage.getItem("token")

  if (!token) {
    set({ token: null, isInitialized: true })
    return
  }

  try {
    await getCurrentUser() 
    set({ token, isInitialized: true })
  } catch {
    localStorage.removeItem("token")
    set({ token: null, isInitialized: true })
  }
},
}))
