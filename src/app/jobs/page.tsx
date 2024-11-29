"use client"
import React, { useState } from "react"
import AddItemForm from "@/app/components/AddItemForm/AddItemForm"
import { HydrationBoundary } from "@tanstack/react-query"
import { JobsInfo } from "@/app/hooks/Jobs-info"
import { getQueryClient } from "@/app/get-query-client"
import { jobsOptions } from "@/app/hooks/Jobs"
import {useAddJob} from "@/app/hooks/useAddJob";

const JobPage = () => {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(jobsOptions)

  const [isAdding, setIsAdding] = useState(false)

  const {mutate: addJob, isError, error, isPending, isSuccess} = useAddJob()

  const handleAddJob = async (newJobs:JobForm, resetForm: ()=>void) => {
    addJob(newJobs, {
      onSuccess: ()=>{
        resetForm()
        setIsAdding(false)
      }
    })
  }

  return (
    <>
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
        <AddItemForm
          AddJob={handleAddJob}
          setIsAdding={setIsAdding}
        />
      )}

      {isError && <div className="text-red-500">Ошибка: {error?.message}</div>}
      {isPending && <div className="text-blue-500">Добавление...</div>}
      {isSuccess && <div className="text-blue-500">Вакансия добавлена успешно</div>}

      <HydrationBoundary state={queryClient}>
      <JobsInfo />
      </HydrationBoundary>
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
