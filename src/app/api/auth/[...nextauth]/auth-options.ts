import { loginUsuario } from "@/lib/Auth/service/auth-service"
import { ROLES_USUARIO } from "@/lib/Auth/types/roles-usuario"
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
  callbacks: {
    async session({ session, user, token }) {
      // Assign the userid and role from the jwt callback below
      if (session?.user) {
        session.user.id = token.id as unknown as string
        session.user.nombreUsuario = token.nombreUsuario as unknown as string
        session.user.roles = token.roles as unknown as ROLES_USUARIO[]
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.nombreUsuario = user.nombreUsuario
        token.roles = user.roles
      }
      return token
    },
  },
  providers: [
    CredentialsProvider({
      id: "custom-session",
      name: "Credentials",
      type: "credentials",
      credentials: {
        nombreUsuario: {
          label: "Nombre de usuario",
          type: "text",
          placeholder: "Usuario",
        },
        contrasenia: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const nombreUsuario = credentials?.nombreUsuario
        const contrasenia = credentials?.contrasenia

        if (!nombreUsuario || !contrasenia) return null

        const user = await loginUsuario({
          nombreUsuario,
          contrasenia,
        })
        return user
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
}
