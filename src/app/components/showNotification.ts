import { notifications } from "@mantine/notifications"

function showNotification({ title, message, color }: Props) {
  notifications.show({
    title,
    message,
    autoClose: 5000,
    color,
    position: "top-center",
  })
}

export default showNotification

//type
type Props = {
  title: string
  message: string
  color: string
}
