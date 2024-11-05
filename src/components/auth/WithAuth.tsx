import { getServerSession } from "next-auth"

import UnauthorizedPage from "./Unauthorized"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options"

import { ROLES_USUARIO } from "@/lib/Auth/types/roles-usuario"

type ASYNC_COMPONENT = (props: any) => Promise<JSX.Element>

type AUTH_WRAPPER_CONFIG = {
  roles: ROLES_USUARIO[]
}

export const withAuth = (
  Component: ASYNC_COMPONENT | (() => JSX.Element),
  { roles }: AUTH_WRAPPER_CONFIG
): ((props: any) => Promise<JSX.Element>) => {
  return async (props: any): Promise<JSX.Element> => {
    const session = await getServerSession(authOptions)
    const userRoles = session?.user?.roles || []
    const hasRole = roles.some((role) => userRoles.includes(role))
    if (hasRole) {
      // If the user has the required role, execute the original component with props
      return Component(props)
    } else {
      // If the user doesn't have the required role, return the UnauthorizedPage
      return UnauthorizedPage()
    }
  }
}
