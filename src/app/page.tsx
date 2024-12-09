import React from "react"
import LoginForm from "@/app/components/LoginForm"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1>
        Для входа введите любой email(например email@email.com) и пароль 6 цифр
      </h1>
      <LoginForm />
    </div>
  )
}
