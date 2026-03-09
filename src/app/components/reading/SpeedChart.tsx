"use client"

import { useReadingStore } from "@/store/useReadingStore"
import css from "./SpeedChart.module.css"

export default function SpeedChart() {
  const sessions = useReadingStore((s) => s.sessions)

  if (!sessions.length) {
    return <p className={css.empty}>No statistics yet</p>
  }

  const maxSpeed = Math.max(...sessions.map((s) => s.speed))

  return (
    <div className={css.chartWrapper}>
      <div className={css.chart}>
        {sessions.map((s, i) => {
          const height = (s.speed / maxSpeed) * 100

          return (
            <div key={i} className={css.barWrapper}>
              <div
                className={css.bar}
                style={{ height: `${height}%` }}
              />
            </div>
          )
        })}
      </div>

      <p className={css.speed}>
        {sessions[sessions.length - 1].speed} pages per hour
      </p>
    </div>
  )
}