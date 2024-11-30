import React from "react"
import ItemForm from "@/app/components/ItemForm/ItemForm"
import { Job } from "@/app/jobs/page"
import { useDeleteJob } from "@/app/hooks/useDeleteJob"
import { useJobsQuery } from "@/app/hooks/useJobsQuery"

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

  if (isPending) {
    return <div>Загрузка...</div>
  }

  return (
    <div>
      {isError && <div className="text-red-500">Ошибка: {error?.message}</div>}
      {isPending && <div className="text-blue-500">Удаление...</div>}
      {isSuccess && (
        <div className="text-blue-500">Вакансия успешно удалена</div>
      )}

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
