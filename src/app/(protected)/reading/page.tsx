"use client"

import MyReadingBlock from "@/app/components/reading/MyReadingBlock"
import AddReading from "@/app/components/reading/AddReading"
import Details from "@/app/components/reading/Details"
import { Card } from "@/app/components/ui/Card"
import css from "./reading.module.css"

export default function ReadingPage() {
  return (
    <div className={css.container}>
      <Card className={css.dashboard}>
        <AddReading />
        <Details />
      </Card>

      <Card>
        <MyReadingBlock />
      </Card>
    </div>
  )
}