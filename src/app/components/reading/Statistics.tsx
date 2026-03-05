"use client"

import { useReadingStore } from "@/store/useReadingStore"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function Statistics() {
  const sessions = useReadingStore((s) => s.sessions)

  if (!sessions.length) {
    return <p style={{ marginTop: 20 }}>No data yet</p>
  }

  const data = sessions.map((s) => ({
    date: new Date(s.date).toLocaleDateString(),
    pages: s.pagesRead,
  }))

  return (
    <div style={{ marginTop: 20 }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="pages" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}