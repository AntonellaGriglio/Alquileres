import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginUsuario } from "@/lib/Auth/service/auth-service"

export const authOptions: AuthOptions = {
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.selectedComplejo) {
        // Si es una actualización de token, actualizamos el complejo seleccionado
        token.selectedComplejo = session.selectedComplejo;
      }

      if (user) {
        token.id = user.id;
        token.nombreUsuario = user.nombreUsuario;
        token.idTipo = user.idTipo;
        token.complejos = user.complejos || [];
        // Asegúrate de que selectedComplejo sea un string o un valor predeterminado
        token.selectedComplejo = user.selectedComplejo ? String(user.selectedComplejo) : '';
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        nombreUsuario: token.nombreUsuario,
        idTipo: token.idTipo,
        complejos: token.complejos || [],
        // Asegúrate de que selectedComplejo sea un string
        selectedComplejo: typeof token.selectedComplejo === 'string' ? token.selectedComplejo : '',
      };

      return session;
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
      async authorize(credentials) {
        const nombreUsuario = credentials?.nombreUsuario;
        const contrasenia = credentials?.contrasenia;

        if (!nombreUsuario || !contrasenia) return null;

        const user = await loginUsuario({
          nombreUsuario,
          contrasenia,
        });

        if (!user) return null;

        // Asegúrate de devolver un objeto con las propiedades necesarias
        return {
          id: user.usuario.id,
          nombreUsuario: user.usuario.nombreUsuario ?? "", // Valor por defecto si es `null`
          idTipo: user.usuario.tipo?.id ?? "",
          complejos: user.complejos || [],
          selectedComplejo: user.selectedComplejo ? String(user.selectedComplejo) : '', // Convertir a string
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/login", // Personaliza esta página si lo necesitas
  },
};
