"use client"
import React, { Suspense } from "react"
import { useShowNotification } from "@/app/hooks/useShowNotification"
import useAddJob from "@/app/hooks/useAddJob"
import AddItemForm from "@/app/components/AddItemForm/AddItemForm"
import JobsInfo from "@/app/components/Jobs-info"
import { useToggleAddJob } from "@/app/hooks/useToggleAddJob"
import { Loader } from "@mantine/core"

function JobPage() {
  const { mutate: addJob, isError, error, isPending, isSuccess } = useAddJob()
  const { isAdding, toggleAdding } = useToggleAddJob()

  useShowNotification({
    isSuccess,
    isError,
    error,
    isPending,
    messageIsSuccess: "Вакансия была успешно добавлена",
  })

  const handleAddJob = (newJobs: JobForm, resetForm: () => void) => {
    addJob(newJobs, {
      onSuccess: () => {
        resetForm()
        toggleAdding()
      },
    })
  }

  return (
    <>
      <Suspense fallback={<Loader color="blue" />}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Вакансии</h1>
          <button
            onClick={toggleAdding}
            className="bg-green-500 text-white text-xl rounded-full w-10 h-10 flex items-center justify-center"
          >
            +
          </button>
        </div>

        {isAdding && (
          <AddItemForm AddJob={handleAddJob} setIsAdding={toggleAdding} />
        )}

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
