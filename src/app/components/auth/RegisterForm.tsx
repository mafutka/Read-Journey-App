"use client"

import Link from "next/link"
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  registerSchema,
  RegisterFormData,
} from "../../../services/auth/authValidation"
import Input from "../ui/Input"
import Button from "../ui/Button"
import css from "./Auth.module.css"

export const RegisterForm = () => {
  const methods = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={css.form}>
        <div className={css.top}>
            <div className={css.logo}>
          <svg className={css.logoIcon}>
            <use href="/symbol-defs.svg#icon-icon" />
          </svg>
          <p className={css.logoText}> READ JOURNEY</p>
        </div>
        <h1 className={css.title}>
          Expand your mind, reading{" "}
          <span className={css.abook}>a book</span>{" "}
        </h1>
        <div className={css.inputs}>
          <div className={css.field}>
            <Input name="name" label="Name:" />
            <p>{methods.formState.errors.name?.message}</p>
          </div>
          <div className={css.field}>
            <Input name="email" label="Email:" />
            <p>{methods.formState.errors.email?.message}</p>
          </div>
          <div className={css.field}>
            <Input name="password" label="Password:" type="password" />
            <p>{methods.formState.errors.password?.message}</p>
          </div>
        </div>
        </div>
        
        <div className={css.actions}>
          <Button type="submit">Registration</Button>
        <Link href="/login" className={css.link}>
          Already have an account?
        </Link>
        </div>
      </form>
    </FormProvider>
  )
}
