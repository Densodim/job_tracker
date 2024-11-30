import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BASE_URL } from "@/app/hooks/useJobsQuery"

export const useAddJob = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newJob: {
      company: string
      position: string
      salary: number
      status: string
      note: string
    }) => {
      const response = await fetch(`${BASE_URL}/api/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      })
      if (!response.ok) throw new Error("Error creating job")
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
        exact: true,
        refetchType: "all",
      })
    },
    onError: (error: any) => {
      console.error("Ошибка добавления вакансии:", error.message)
    },
  })
}
