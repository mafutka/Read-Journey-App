import { Card } from "../ui/Card"
import css from "./Auth.module.css"

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={css.container}>
      <div className={css.formWrapper}>
      <Card>{children}</Card>
      </div>
      <div className={css.imageCard}>
        <img className={css.img} src="/iPhone 15 Black 1.png" alt="Books" />
      </div>
    </div>
  )
}
