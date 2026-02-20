"use client"

import {Card} from "../../components/ui/Card"
import Filters from "./Filters"
import StartWorkoutBlock from "./StartWorkoutBlock"


export default function Dashboard() {
  return (
    <Card>
      <Filters />
      <StartWorkoutBlock />
    </Card>
  )
}
