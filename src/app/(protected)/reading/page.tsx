"use client"

import Dashboard from "../../components/reading/Dashboard"
import MyBook from "../../components/reading/MyBook"
import { Card } from "@/app/components/ui/Card"

export default function ReadingPage() {
  return (
    <>
    <Card> <Dashboard /></Card>
     <Card><MyBook /></Card> 
      
    </>
  )
}
