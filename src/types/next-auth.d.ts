import { ROLES_USUARIO } from "@/lib/Auth/types/roles-usuario"

import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    nombreUsuario: string
    roles: ROLES_USUARIO[]
    zonaAsignada?: string
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    id: string
    nombreUsuario: string
    roles: ROLES_USUARIO[]
    zonaAsignada?: string
  }
}
