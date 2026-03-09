"use client"

import MyReadingBlock from "@/app/components/reading/MyReadingBlock"
import AddReading from "@/app/components/reading/AddReading"
import Details from "@/app/components/reading/Details"
import { Card } from "@/app/components/ui/Card"
import { useReadingStore } from "@/store/useReadingStore"
import css from "./reading.module.css"

export default function ReadingPage() {
  const sessions = useReadingStore((s) => s.sessions)

  const hasStartedReading = sessions.length > 0

  return (
    <div className={css.container}>
      <Card className={css.dashboard}>
        <AddReading />

        {!hasStartedReading ? (
          <div className={css.progress}>
          <div className={css.info}>
            <h2>Progress</h2>
            <p>
              Here you will see when and how much you read.
              To record, click on the red button above.
            </p>
          </div>
          <img className={css.progresImg} src="/star.png" alt="" />
          </div>
        ) : (
          <Details />
        )}
      </Card>

      <Card>
        <MyReadingBlock />
      </Card>
    </div>
  )
}