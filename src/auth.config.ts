import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/",
    signIn: "/",
    signOut: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Сохраняем токен и данные пользователя в JWT
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.accessToken = user.token // Bearer токен
        token.emailVerified = user.emailVerified
      }
      return token
    },

    async session({ session, token }) {
      // Передаем токен в сессию
      if (token) {
        // @ts-ignore
        session.user = {
          emailVerified: token.emailVerified,
          id: token.id as string,
          name: token.name,
          email: token.email as string,
        }
        session.accessToken = token.accessToken as string // Bearer токен
      }
      return session
    },
  },
  providers: [],
} satisfies NextAuthConfig

declare module "next-auth" {
  interface User {
    token: string // Добавляем поле token в тип User
    emailVerified?: any
  }

  interface Session {
    user: User
    accessToken: string // Если ты используешь это поле в сессии
  }

  interface JWT {
    token: string // Если ты хочешь хранить токен в JWT
    emailVerified?: any
  }
}
