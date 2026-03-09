"use client"

import { useReadingStore } from "@/store/useReadingStore"
import ProgressCircle from "./ProgressCircle"

export default function Statistics() {

  const sessions = useReadingStore((s) => s.sessions)
  const totalPages = useReadingStore((s) => s.totalPages)

  if (!sessions.length) {
    return <p style={{ marginTop: 20 }}>No data yet</p>
  }

  const pagesRead = sessions.reduce(
    (sum, s) => sum + s.pagesRead,
    0
  )

  const percentage = Math.round(
    (pagesRead / totalPages) * 100
  )

  return (
    <div
      style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        backgroundColor: "#262626",
        borderRadius: 12,
        padding: 20,
        
      }}
    >
      <ProgressCircle percentage={percentage} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 18,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 4,
            background: "#30b94d",
          }}
        />

        <div>
          <strong>{percentage}%</strong>
          <p style={{ fontSize: 14, opacity: 0.7 }}>
            {pagesRead} pages read
          </p>
        </div>
      </div>
    </div>
  )
}