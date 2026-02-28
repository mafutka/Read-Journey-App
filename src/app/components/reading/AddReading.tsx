"use client"

import { useForm, FormProvider } from "react-hook-form"
import { useReadingStore } from "@/store/useReadingStore"
import toast from "react-hot-toast"
import Input from "../../components/ui/Input"
import DarkButton from "../ui/DarkButton"
import css from "./AddReading.module.css"

type FormValues = {
  page: number
}

export default function AddReading() {
  const methods = useForm<FormValues>()
  const { handleSubmit, reset } = methods

  const { isReading, totalPages, startReading, finishReading } =
    useReadingStore()

  const onSubmit = async (data: FormValues) => {
    const pageNumber = Number(data.page)

    if (!pageNumber || pageNumber < 1 || pageNumber > totalPages) {
      toast.error("Invalid page number")
      return
    }

    try {
      if (!isReading) {
        await startReading(pageNumber)
        toast.success("Reading started")
      } else {
        await finishReading(pageNumber)

        if (pageNumber === totalPages) {
          toast.success("🎉 Book completed!")
        } else {
          toast.success("Reading session saved")
        }
      }

      reset()
    } catch (err) {
      toast.error("Error")
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className={css.inputText}>
      {isReading ? "  Stop page:" : "  Start page:"}
    </p>
        <Input
          name="page"
          label="Page number:"
          type="number"
        />

        <DarkButton className={css.addBtn} type="submit">
          {isReading ? "To stop" : "To start"}
        </DarkButton>
      </form>
    </FormProvider>
  )
}