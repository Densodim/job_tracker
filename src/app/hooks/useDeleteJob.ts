import { useMutation, useQueryClient } from "@tanstack/react-query"


function useDeleteJob() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (_id: string) => {
      const response = await fetch(`/api/jobs/${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
      })
      if (!response.ok) {
        throw new Error("Error during deletion")
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["jobs"],
        exact: true,
        refetchType: "all",
      })
    },
    onError: (error: any) => {
      console.error("Error when deleting:", error.message)
    },
  })
}
export default useDeleteJob
