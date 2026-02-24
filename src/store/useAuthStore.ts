import { create } from "zustand"

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

  initAuth: () => {
    const token = localStorage.getItem("token")
    set({ token, isInitialized: true })
  },
}))
