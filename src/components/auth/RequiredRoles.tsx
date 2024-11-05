"use client"

import React, { PropsWithChildren } from "react"
import { useSession } from "next-auth/react"

import { ROLES_USUARIO } from "@/lib/Auth/types/roles-usuario"

type RequiredRolesProps = {
  roles: ROLES_USUARIO[]
}

const RequiredRoles: React.FC<PropsWithChildren<RequiredRolesProps>> = ({
  children,
  roles,
}) => {
  const { data } = useSession()

  if (!data?.user.roles.some((role) => roles.includes(role))) {
    return null
  }
  return children
}

export default RequiredRoles
