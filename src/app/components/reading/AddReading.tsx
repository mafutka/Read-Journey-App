"use client"

import { useForm, FormProvider } from "react-hook-form"
import { useEffect } from "react"
import { useReadingStore } from "@/store/useReadingStore"
import toast from "react-hot-toast"
import DarkButton from "../ui/DarkButton"
import Input from "../ui/Input"
import css from "./AddReading.module.css"

type FormValues = {
  page: number
}

export default function AddReading() {
  const {
  startReading,
  finishReading,
  isReading,
  currentPage,
  totalPages,
  setPageInput
} = useReadingStore()

  const methods = useForm<FormValues>({
    defaultValues: {
      page: currentPage + 1,
    },
  })

  const { reset } = methods

  useEffect(() => {
    const nextPage = currentPage === 0 ? 1 : currentPage + 1
    reset({ page: nextPage })
    setPageInput(nextPage)
  }, [currentPage, reset, setPageInput])

  const onSubmit = async (data: FormValues) => {
        console.log("CLICK")
    const page = Number(data.page)
    setPageInput(page)

    if (page < 1 || page > totalPages) {
      toast.error("Invalid page")
      return
    }

    try {
      if (!isReading) {
        await startReading(page)
        toast.success("Reading started")
      } else {
        if (page <= currentPage) {
          toast.error(`Stop page must be greater than start page (${currentPage})`)
          return
        }

        await finishReading(page)
        toast.success("Reading session saved")
      }
    } catch {
      toast.error("Server error")
    }
  }

  return (
    
    <FormProvider {...methods}>
      <p className={css.name}>Start page:</p>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input
          name="page"
          label="Page number:"
          type="number"
          min={1}
          max={totalPages}
          step={1}
        />

        <DarkButton type="submit" className={css.addBtn}>
          {isReading ? "To stop" : "To start"}
        </DarkButton>
      </form>
    </FormProvider>
  )
}