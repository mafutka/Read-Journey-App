"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthLayout } from "../components/auth/AuthLayout"
import { useAuthStore } from "@/store/useAuthStore"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { token, isInitialized } = useAuthStore()

useEffect(() => {
  if (isInitialized && token) {
    router.replace("/recommended")
  }
}, [token, isInitialized, router])

if (!isInitialized) return null

  return <AuthLayout>{children}</AuthLayout>
}
