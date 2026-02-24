"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { useAuthStore } from "@/store/useAuthStore"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  loginSchema,
  LoginFormData,
} from "../../../services/auth/authValidation"
import { useRouter } from "next/navigation"
import { loginUser } from "../../../services/auth/authApi"
import Input from "../ui/Input"
import Button from "../ui/Button"
import css from "./Auth.module.css"

export const LoginForm = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string>("")
  const setToken = useAuthStore((s) => s.setToken)
  const methods = useForm<LoginFormData>({
    mode: "onTouched",
    resolver: yupResolver(loginSchema),
  })

  async function onSubmit(data: LoginFormData) {
    try {
      setErrorMessage("")

      const result = await loginUser({
        email: data.email,
        password: data.password,
      })

      if (result.token) {
        setToken(result.token)
        router.push("/recommended")
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage("Unexpected error occurred")
      }
    }
  }

  return (
    <>
      {errorMessage && <div className={css.errorMessage}>{errorMessage}</div>}
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
            <Button type="submit">Log in</Button>
            <Link href="/register" className={css.link}>
              Don’t have an account?
            </Link>
          </div>
        </form>
      </FormProvider>
    </>
  )
}
