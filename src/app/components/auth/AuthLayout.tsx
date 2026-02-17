import { Card } from "../ui/Card";
import css from "./Auth.module.css"

export const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className={css.container}>
      <Card>{children}</Card>
    </div>
  );
};