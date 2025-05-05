import "next-auth"
import "next-auth/jwt"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Extiende el tipo `User` que se utiliza en las sesiones
   * y en el `useSession` de NextAuth.
   */
  interface User {
    id: string; // Asegúrate de que `id` esté presente
    nombreUsuario: string;
    idTipo: string;
    complejos: any[];
    selectedComplejo?: string | null;
     // Cambia `any[]` por el tipo específico de los complejos si lo tienes definido
  }
}

declare module "next-auth/jwt" {
  /**
   * Extiende el tipo `JWT` que se utiliza en los JWT generados
   * por el callback `jwt` en NextAuth.
   */
  interface JWT extends DefaultJWT {
    id: string;
    nombreUsuario: string;
    idTipo: string;
    complejos: any[]; // Cambia `any[]` por el tipo específico de los complejos si lo tienes definido
  }
}
