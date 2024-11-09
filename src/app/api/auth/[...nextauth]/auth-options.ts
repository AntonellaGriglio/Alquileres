import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { loginUsuario } from "@/lib/Auth/service/auth-service"

export const authOptions: AuthOptions = {
  callbacks: {
    async session({ session, user, token }) {
      // Assign the userid and role from the jwt callback below
      if (session?.user) {
        session.user.id = token.id as unknown as string
        session.user.nombreUsuario = token.nombreUsuario as unknown as string
        session.user.idTipo = token.idTipo as unknown as string
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.nombreUsuario = user.nombreUsuario
        token.idTipo = user.idTipo
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
        const nombreUsuario = credentials?.nombreUsuario;
        const contrasenia = credentials?.contrasenia;
      
        if (!nombreUsuario || !contrasenia) return null;
      
        const user = await loginUsuario({
          nombreUsuario,
          contrasenia,
        });
      
        if (!user) return null;
      
        // Asegúrate de que las propiedades sean estrictamente `string` y no `null`
        return {
          id: user.id,
          nombreUsuario: user.nombreUsuario ?? "", // Proporciona un valor por defecto si es `null`
          idTipo: user.idTipo ?? "", // Proporciona un valor por defecto si es `null`
        };
      },
      
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
}
