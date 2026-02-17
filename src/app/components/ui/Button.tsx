import css from "./Button.module.css"

export default function Button({
  children,
  type = "button",
}: {
  children: React.ReactNode;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      className={css.button}
    >
      {children}
    </button>
  );
};