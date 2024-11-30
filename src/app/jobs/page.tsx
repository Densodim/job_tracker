"use client"
import React, { Suspense, useState } from "react"
import AddItemForm from "@/app/components/AddItemForm/AddItemForm"
import { JobsInfo } from "@/app/hooks/Jobs-info"
import { useAddJob } from "@/app/hooks/useAddJob"

const JobPage = () => {
  const [isAdding, setIsAdding] = useState(false)

  const { mutate: addJob, isError, error, isPending, isSuccess } = useAddJob()

  const handleAddJob = async (newJobs: JobForm, resetForm: () => void) => {
    addJob(newJobs, {
      onSuccess: () => {
        resetForm()
        setIsAdding(false)
      },
    })
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Вакансии</h1>
          <button
            onClick={() => setIsAdding((prevState) => !prevState)}
            className="bg-green-500 text-white text-xl rounded-full w-10 h-10 flex items-center justify-center"
          >
            +
          </button>
        </div>

        {isAdding && (
          <AddItemForm AddJob={handleAddJob} setIsAdding={setIsAdding} />
        )}

        {isError && (
          <div className="text-red-500">Ошибка: {error?.message}</div>
        )}
        {isPending && <div className="text-blue-500">Добавление...</div>}
        {isSuccess && (
          <div className="text-blue-500">Вакансия добавлена успешно</div>
        )}
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <JobsInfo />
      </Suspense>
    </>
  )
}

export default JobPage

// type
export type Job = {
  _id: string
  company: string
  position: string
  salary: number
  status: string
  note: string
}

export type JobForm = Omit<Job, "_id">
