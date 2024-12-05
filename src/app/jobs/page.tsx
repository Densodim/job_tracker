"use client"
import React, { Suspense, useState } from "react"
import AddItemForm from "@/app/components/AddItemForm/AddItemForm"
import { useShowNotification } from "@/app/hooks/useShowNotification"
import JobsInfo from "@/app/components/Jobs-info"
import useAddJob from "@/app/hooks/useAddJob"

function JobPage() {
  const [isAdding, setIsAdding] = useState(false)

  const { mutate: addJob, isError, error, isPending, isSuccess } = useAddJob()

  useShowNotification({
    isSuccess,
    isError,
    error,
    isPending,
    messageIsSuccess: "Вакансия была успешно добавлена",
  })

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
  id: string
  company: string
  position: string
  salary: number
  status: string
  note: string
}

export type JobForm = Omit<Job, "id">
