import { getServerSession } from "next-auth"

import UnauthorizedPage from "./Unauthorized"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options"
import { TIPOS_USUARIOS } from "@/lib/Auth/types/tipos-usuarios"

type ASYNC_COMPONENT = (props: any) => Promise<JSX.Element>

type AUTH_WRAPPER_CONFIG = {
  idTipo: string  // Aquí se usa idTipo en lugar de roles
}

export const withAuth = (
  Component: ASYNC_COMPONENT | (() => JSX.Element),
  { idTipo }: AUTH_WRAPPER_CONFIG
): ((props: any) => Promise<JSX.Element>) => {
  return async (props: any): Promise<JSX.Element> => {
    const session = await getServerSession(authOptions)
    const userTipo = session?.user?.idTipo
    console.log(userTipo)
    if (userTipo === idTipo) {
      console.log('user tipo entro',userTipo)
      // Si el usuario tiene el idTipo requerido, ejecutar el componente original con las props
      return Component(props)
    } else {
      // Si el usuario no tiene el idTipo requerido, devolver UnauthorizedPage
      return UnauthorizedPage()
    }
  }
}
