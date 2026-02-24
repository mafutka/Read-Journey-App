"use client"

import { useReadingStore } from "@/store/useReadingStore"

export default function BookCompletedModal() {
  const { isCompleted } = useReadingStore()

  if (!isCompleted) return null

  return (
    <div className="modal">
      <h2>🎉 Congratulations!</h2>
      <p>You have finished this book!</p>
    </div>
  )
}
