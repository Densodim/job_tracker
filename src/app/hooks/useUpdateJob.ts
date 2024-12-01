import { useSuspenseQuery } from "@tanstack/react-query"
import { BASE_URL } from "@/app/hooks/useJobsQuery"
import { Job } from "@/app/jobs/page"

export function useUpdateJob() {
  const query = useSuspenseQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const path = "/api/jobs"
      const url = BASE_URL + path

      const res: Job[] = await (
        await fetch(url, {
          cache: "no-store",
        })
      ).json()
      return res
    },
  })

  const updateJob = async (updatedJob: { _id: string; [key: string]: any }) => {
    const response = await fetch(`${BASE_URL}/api/jobs/${updatedJob._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJob),
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
