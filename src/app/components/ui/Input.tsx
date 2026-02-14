import { useFormContext } from "react-hook-form";

type InputProps = {
  name: string;
  placeholder: string;
  type?: string;
};

export default function Input({
  name,
  placeholder,
  type = "text",
}: InputProps) {
  const { register } = useFormContext();

  return (
    <input
      type={type}
      placeholder={placeholder}
      {...register(name)}
      className="w-full bg-[#2c2c2e] px-4 py-3 rounded-xl"
    />
  );
}
