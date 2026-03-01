"use client"

import MyReadingBlock from "@/app/components/reading/MyReadingBlock"
import Dashboard from "../../components/reading/Dashboard"
import { Card } from "@/app/components/ui/Card"

export default function ReadingPage() {
  return (
    <>
    <Card> <Dashboard /></Card>
     <Card><MyReadingBlock /></Card> 
      
    </>
  )
}
