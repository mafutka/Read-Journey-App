"use client"

import {Card} from "../../components/ui/Card"
import clsx from "clsx"
import css from "./Dashboard.module.css"


type Props = {
  children: React.ReactNode
  className?: string
}

export default function Dashboard({
  children,
  className,
}: Props) {
  return (
    <Card className={clsx(css.dashboard, className)}>
      {children}
    </Card>
  )
}
