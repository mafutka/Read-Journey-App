"use client"

import {Card} from "../../components/ui/Card"

export default function Dashboard({children, 

}: {children: React.ReactNode}) {
  return (
    <Card>
      {children}
    </Card>
  )
}
