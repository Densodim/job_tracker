import React, { Suspense } from "react"
import ItemForm from "@/app/components/ItemForm/ItemForm"
import { Job } from "@/app/jobs/page"
import { useShowNotification } from "@/app/hooks/useShowNotification"
import useDeleteJob from "@/app/hooks/useDeleteJob"
import useJobsQuery from "@/app/hooks/useJobsQuery"

function JobsInfo() {
  const { jobs } = useJobsQuery()

  const { mutate: deleteJob, isSuccess, isError, error } = useDeleteJob()

  const handleDeleteJob = (id: string) => {
    deleteJob(id)
  }
  useShowNotification({
    isSuccess,
    isError,
    error,
    messageIsSuccess: "Вакансия была успешно удалена",
  })

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {jobs.map((item: Job) => {
          return (
            <div key={item._id}>
              <ItemForm job={item} deleteJob={handleDeleteJob} />
            </div>
          )
        })}
      </div>
    </Suspense>
  )
}

export default JobsInfo
