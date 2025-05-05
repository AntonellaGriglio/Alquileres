'use client'

import React, { PropsWithChildren } from "react"
import { useSession } from "next-auth/react"
import { TIPOS_USUARIOS } from "@/lib/Auth/types/tipos-usuarios"

type RequiredTipoProps = {
  tipos: TIPOS_USUARIOS[]
}

const RequiredTipo: React.FC<PropsWithChildren<RequiredTipoProps>> = ({
  children,
  tipos,
}) => {
  const { data } = useSession()

  // Verifica si el usuario tiene el idTipo esperado
  if (!data?.user?.idTipo){
    return null
  }
  return <>{children}</>  // Muestra los hijos si el idTipo es el esperado
}

export default RequiredTipo
