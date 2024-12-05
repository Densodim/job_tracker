import useJobs from "@/app/hooks/useJobs"

// const isProduction = process.env.NODE_ENV === 'production';
// export const BASE_URL = isProduction
//     ? process.env.NEXT_PUBLIC
//     : 'http://localhost:3000';

export function useUpdateJob() {
  const query = useJobs()

  const updateJob = async (updatedJob: {_id: string; [key: string]: any }) => {
    const response = await fetch(`/api/jobs/${updatedJob._id}`, {
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
