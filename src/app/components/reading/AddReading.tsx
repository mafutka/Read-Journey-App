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
  const methods = useForm<FormValues>({
    defaultValues: {
      page: 1,
    },
  })

  const { handleSubmit, reset } = methods

  const isReading = useReadingStore((s) => s.isReading)
  const totalPages = useReadingStore((s) => s.totalPages)
  const startReading = useReadingStore((s) => s.startReading)
  const finishReading = useReadingStore((s) => s.finishReading)

  const onSubmit = async (data: FormValues) => {
    const pageNumber = Number(data.page)

    console.log("pageNumber", pageNumber)
    console.log("totalPages", totalPages)

    if (isNaN(pageNumber)) {
      toast.error("Page must be a number")
      return
    }

    if (pageNumber < 1) {
      toast.error("Page must be greater than 0")
      return
    }

    if (pageNumber > totalPages) {
      toast.error("Page exceeds book length")
      return
    }

    try {
      if (!isReading) {
        await startReading(pageNumber)
        toast.success("Reading started")
      } else {
        await finishReading(pageNumber)
        toast.success("Reading session saved")
      }

      reset()
    } catch (error) {
      console.error(error)
      toast.error("Server error")
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        className={css.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className={css.inputText}>
          {isReading ? "Stop page:" : "Start page:"}
        </p>

        <Input
          name="page"
          label="Page number:"
          type="number"
        />

        <DarkButton
          className={css.addBtn}
          type="submit"
        >
          {isReading ? "To stop" : "To start"}
        </DarkButton>
      </form>
    </FormProvider>
  )
}