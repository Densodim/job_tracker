import React from "react"
import ItemForm from "@/app/components/ItemForm/ItemForm"
import { Job } from "@/app/jobs/page"
import { useDeleteJob } from "@/app/hooks/useDeleteJob"
import { useJobsQuery } from "@/app/hooks/useJobsQuery"
import { useShowNotification } from "@/app/hooks/useShowNotification"

export function JobsInfo() {
  const [jobs] = useJobsQuery()

  const {
    mutate: deleteJob,
    isSuccess,
    isPending,
    isError,
    error,
  } = useDeleteJob()

  const handleDeleteJob = async (_id: string) => {
    deleteJob(_id)
  }
  useShowNotification({
    isSuccess,
    isError,
    error,
    messageIsSuccess: "Вакансия была успешно удалена",
  })

  if (isPending) {
    return <div>Загрузка...</div>
  }

  return (
    <div>
      {jobs.map((item: Job) => {
        return (
          <div key={item._id}>
            <ItemForm job={item} deleteJob={handleDeleteJob} />
          </div>
        )
      })}
    </div>
  )
}
