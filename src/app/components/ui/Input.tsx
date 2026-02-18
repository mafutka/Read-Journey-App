import css from "./Input.module.css"
import { useFormContext } from "react-hook-form";

type InputProps = {
  name: string;
  label: string;
  type?: string;
};

export default function Input({
  name,
  label,
  type = "text",
}: InputProps) {
  const { register } = useFormContext();

  return (
    <div className={css.wrapper}>
      <span className={css.label}>{label}</span>
       <input
      type={type}
      {...register(name)}
      className={css.input}
    />
    </div>
   
  );
}
