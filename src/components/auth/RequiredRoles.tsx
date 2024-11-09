'use client'

import React, { PropsWithChildren } from "react"
import { useSession } from "next-auth/react"

type RequiredTipoProps = {
  idTipo: string
}

const RequiredTipo: React.FC<PropsWithChildren<RequiredTipoProps>> = ({
  children,
  idTipo,
}) => {
  const { data } = useSession()

  // Verifica si el usuario tiene el idTipo esperado
  if (data?.user.idTipo !== idTipo) {
    return null
  }

  return <>{children}</>  // Muestra los hijos si el idTipo es el esperado
}

export default RequiredTipo
