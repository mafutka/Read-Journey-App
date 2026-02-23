"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  registerSchema,
  RegisterFormData,
} from "../../../services/auth/authValidation"
import Input from "../ui/Input"
import Button from "../ui/Button"
import { registerUser } from "../../../services/auth/authApi"
import { useRouter } from "next/navigation"
import css from "./Auth.module.css"

export const RegisterForm = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string>("")
  const methods = useForm<RegisterFormData>({
    mode: "onTouched",
    resolver: yupResolver(registerSchema),
  })

  async function onSubmit(data: RegisterFormData) {
    try {
      setErrorMessage("")

      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      if (result.token) {
        localStorage.setItem("token", result.token)

        router.push("/recommended")
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage("Something went wrong")
      }
    }
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
              <Input
                name="password"
                label="Password:"
                type="password"
                icon={
                  <svg width="18" height="18">
                    <use href="/symbol-defs.svg#icon-eye-off" />
                  </svg>
                }
              />
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
        {errorMessage && <p className={css.errorMessage}>{errorMessage}</p>}
      </form>
    </FormProvider>
  )
}
