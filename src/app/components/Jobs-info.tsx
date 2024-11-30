import React, {useEffect} from "react"
import ItemForm from "@/app/components/ItemForm/ItemForm"
import { Job } from "@/app/jobs/page"
import { useDeleteJob } from "@/app/hooks/useDeleteJob"
import { useJobsQuery } from "@/app/hooks/useJobsQuery"
import {notifications} from "@mantine/notifications";
import showNotification from "@/app/components/showNotification";

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

  useEffect(() => {
    if (isSuccess) {
      showNotification({title:'successfully', message:'Вакансия была успешно удалена', color:'green'})
    }

    if (isError) {
      showNotification({title:'error', message:`Не удалось удалить вакансию: ${error?.message}`, color:'red'})
    }
  }, [isSuccess, isError, error]);

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
