"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"

export default function Home() {
  const router = useRouter()
  const { token, isInitialized } = useAuthStore()

  useEffect(() => {
    if (!isInitialized) return

    if (token) {
      router.replace("/recommended")
    } else {
      router.replace("/login")
    }
  }, [token, isInitialized, router])

  return null
}