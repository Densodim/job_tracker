import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from "next-auth/react"


// Получение текущей сессии
async function fetchSession() {
  const response = await fetch("/api/auth/session") // NextAuth API для сессии
  if (!response.ok) throw new Error("Failed to fetch session")
  return response.json()
}

// Хук для управления сессией
export function useAuth() {
  const queryClient = useQueryClient()

  const {data: session, isLoading, error,} = useQuery({
    queryKey: ["session"],
    queryFn:fetchSession,
    refetchOnWindowFocus: true,
    // staleTime: 1000 * 60 * 5,
  })

  const signIn = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const result = await nextAuthSignIn("credentials", {
        redirect: false, // Отключаем редирект
        ...credentials,
      })
      if (result?.error) throw new Error(result.error)
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["session"],
        exact: true,
        refetchType: "all",
      })
    },
  })

  const signOut = useMutation({
    mutationFn: async () => {
      await nextAuthSignOut({redirect: false})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["session"],
        exact: true,
        refetchType: "all",
      })
    },
  })

  return { session, isLoading, error, signIn, signOut }
}
