import { useEffect } from "react"
import {showNotification} from "@mantine/notifications";


const useShowNotification = ({
  isLoading,
  isSuccess,
  isError,
  error,
  isPending,
  messageIsSuccess = "Wait...",
}: Props) => {
  useEffect(() => {
    if (isSuccess) {
      showNotification({
        title: "successfully",
        message: messageIsSuccess,
        color: "green",
      })
    }
    if (isError) {
      showNotification({
        title: "error",
        message: `Что то нет так: ${error?.message}`,
        color: "red",
      })
    }
    if (isPending) {
      showNotification({
        title: "Pending",
        message: "Добавление...",
        color: "green",
      })
    }
    if (isLoading) {
      showNotification({
        title: "Loading",
        message: "Обновление...",
        color: "green",
      })
    }
  }, [isSuccess, isError, error, isPending, isLoading])
}
export { useShowNotification }

type Props = {
  isSuccess?: boolean
  isLoading?: boolean
  isError?: boolean
  error?: Error | null
  isPending?: boolean
  messageIsSuccess?: string
}
