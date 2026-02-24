"use client"

import { useState } from "react"
import Diary from "./Diary"
import Statistics from "./Statistics"

export default function Details() {
  const [view, setView] = useState<"diary" | "stats">("diary")

  return (
    <div>
      <button onClick={() => setView("diary")}>Diary</button>
      <button onClick={() => setView("stats")}>Statistics</button>

      {view === "diary" ? <Diary /> : <Statistics />}
    </div>
  )
}
