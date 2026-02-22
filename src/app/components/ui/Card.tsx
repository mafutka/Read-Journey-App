import css from "./Card.module.css"

export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={css.container}>
      {children}
    </div>
  );
}