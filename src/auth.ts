import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"

async function getUser(email: string, password: string): Promise<any> {
  // return {
  //   id: 1,
  //   name: "test user",
  //   email: email,
  //   password: password,
  // }

  try {
    // Отправляем запрос на сервер Express
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error("Invalid email or password")
    }

    // Получаем данные пользователя и токен
    const data = await response.json()
    console.log(data)

    return {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      token: data.token, // JWT токен, если понадобится для других запросов
      emailVerified: null,
    }
  } catch (error) {
    console.error("Error fetching user:", error)
    return null // Возвращаем null в случае ошибки
  }
}

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const user = await getUser(
          credentials.email as string,
          credentials.password as string,
        )
        return user ?? null
      },
    }),
  ],
})
