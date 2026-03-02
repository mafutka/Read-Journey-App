"use client"

import MyReadingBlock from "@/app/components/reading/MyReadingBlock"
import Dashboard from "../../components/reading/Dashboard"
import { Card } from "@/app/components/ui/Card"
import css from "./reading.module.css"

export default function ReadingPage() {
  return (
    <div  className={css.container}>
    <Card> <Dashboard /></Card>
     <Card><MyReadingBlock /></Card> 
      
    </div>
  )
}
