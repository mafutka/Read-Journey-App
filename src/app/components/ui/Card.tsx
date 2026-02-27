import React from "react";
import css from "./Card.module.css"

type Props = {
  children: React.ReactNode,
  className?: string
}

export const Card = ({ children, className }: Props) => {
  return (
    <div className={`${css.container} ${className ?? ""}`}>
      {children}
    </div>
  );
}