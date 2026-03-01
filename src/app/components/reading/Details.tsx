"use client"

import { useState } from "react"
import Diary from "./Diary"
import Statistics from "./Statistics"
import css from "./Details.module.css"

export default function Details() {
  const [view, setView] = useState<"diary" | "stats">("diary")

  return (
    <div className={css.container}>
      {/* Header */}
      <div className={css.heading}>
        <h3>Diary</h3>

        <div className={css.icons}>
          <span
            style={{
              cursor: "pointer",
              opacity: view === "diary" ? 1 : 0.4,
            }}
            onClick={() => setView("diary")}
          >
            <svg className={css.detaisIcon}>
          <use href="/symbol-defs.svg#icon-hourglass-01" />
        </svg>
          </span>

          <span
            style={{
              cursor: "pointer",
              opacity: view === "stats" ? 1 : 0.4,
            }}
            onClick={() => setView("stats")}
          >
           <svg className={css.detaisIcon}>
          <use href="/symbol-defs.svg#icon-pie-chart-02" />
        </svg>
          </span>
        </div>
      </div>

      {view === "diary" ? <Diary /> : <Statistics />}
    </div>
  )
}