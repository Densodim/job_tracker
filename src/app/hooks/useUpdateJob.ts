import { BASE_URL } from "@/app/hooks/useJobsQuery"
import useJobs from "@/app/hooks/useJobs"

export function useUpdateJob() {
  const query = useJobs()

  const updateJob = async (updatedJob: {_id: string; [key: string]: any }) => {
    const response = await fetch(`${BASE_URL}/api/jobs/${updatedJob._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJob),
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error("Error updating job")
    }

    const data = await response.json()

    await query.refetch()

    return data
  }

  return {
    data: query.data,
    updateJob,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    error: query.error,
  }
}
