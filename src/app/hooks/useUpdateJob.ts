import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BASE_URL } from "@/app/hooks/useJobsQuery"

export const useUpdateJob = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updatedJob: { _id: string; [key: string]: any }) => {
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
      return response.json()
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["jobs"],
        exact: true,
        refetchType: "all",
      })
    },
    onError: (error: any) => {
      console.error("Error when updating:", error.message)
    },
  })
}
