import React from "react"
import LoginForm from "@/app/components/LoginForm"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1>Page home</h1>
      <LoginForm />
    </div>
  )
}
