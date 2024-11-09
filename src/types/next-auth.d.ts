
import "next-auth"
import "next-auth/jwt"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    nombreUsuario: string,
    idTipo: string
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    id: string
    nombreUsuario: string
    idTipo:string
  }
}
