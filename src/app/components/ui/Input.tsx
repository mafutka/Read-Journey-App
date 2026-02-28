import css from "./Input.module.css"
import { useFormContext } from "react-hook-form";

type InputProps = {
  name: string;
  label: string;
  type?: string;
  icon?: React.ReactNode
  value?: number
  page?: number
};

export default function Input({
  name,
  label,
  type = "text",
  icon,
  page,
}: InputProps) {
  const { register,  formState: { errors }, } = useFormContext();
  const hasError = !!errors[name]

  return (
    <div className={`${css.wrapper} ${hasError ? css.error : ""}`}>
      <span className={css.label}>{label}</span>
       <input
      type={type}
      {...register(name)}
      className={css.input}
      value={page}
    />
    {icon && <div className={css.icon}>{icon}</div>}
    </div>
   
  );
}
