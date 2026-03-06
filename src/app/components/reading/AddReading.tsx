"use client"

import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useReadingStore } from "@/store/useReadingStore"
import toast from "react-hot-toast"

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
  } = useReadingStore()

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      page: currentPage + 1,
    },
  })

  useEffect(() => {
    const nextPage = currentPage === 0 ? 1 : currentPage + 1
    reset({ page: nextPage })
  }, [currentPage, reset])

  const onSubmit = async (data: FormValues) => {
    const page = Number(data.page)

    if (isNaN(page)) {
      toast.error("Page must be a number")
      return
    }

    if (page < 1) {
      toast.error("Page must be greater than 0")
      return
    }

    if (page > totalPages) {
      toast.error("Page exceeds book length")
      return
    }

    try {
      if (!isReading) {
        await startReading(page)
        toast.success("Reading started")
      } else {
        if (page <= currentPage) {
          toast.error(
            `Stop page must be greater than start page (${currentPage})`
          )
          return
        }

        await finishReading(page)
        toast.success("Reading session saved")
      }
    } catch (error) {
      console.error(error)
      toast.error("Server error")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="number"
        min={1}
  max={totalPages}
  step={1}
        {...register("page", { required: true, valueAsNumber: true })}
      />

      <button type="submit">
        {isReading ? "To stop" : "To start"}
      </button>
    </form>
  )
}