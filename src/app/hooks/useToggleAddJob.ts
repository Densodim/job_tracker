"use client"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export function useToggleAddJob() {
  const queryClient = useQueryClient()

  const { data: isAdding = false } = useQuery({
    queryKey: ["isAdding"],
    initialData: false,
  })

  const toggleAdding = () => {
    queryClient.setQueryData(["isAdding"], !isAdding)
  }

  return { isAdding, toggleAdding }
}
