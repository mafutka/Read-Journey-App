"use client";

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  registerSchema,
  RegisterFormData,
} from "../../../services/auth/authValidation";
import Input from "../ui/Input";
import Button from "../ui/Button";

export const RegisterForm = () => {
  const methods = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <Input name="name" placeholder="Name" />
        <p>{methods.formState.errors.name?.message}</p>

        <Input name="email" placeholder="Email" />
        <p>{methods.formState.errors.email?.message}</p>

        <Input
          name="password"
          placeholder="Password"
          type="password"
        />
        <p>{methods.formState.errors.password?.message}</p>

        <Button type="submit">Registration</Button>
      </form>
    </FormProvider>
  );
};

