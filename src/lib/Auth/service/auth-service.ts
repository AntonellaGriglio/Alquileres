"use server"

import { db, eq, usuario } from "@/db"
import { compare } from "bcrypt"

import { LoginData } from "../schemas/login-schema"

export const loginUsuario = async (data: LoginData) => {
  const usuarioEncontrado = await db.query.usuario.findFirst({
    where: eq(usuario.nombreCompleto, data.nombreUsuario),
    with: { roles: true },
  })

  if (!usuarioEncontrado) return null

  const sonContraseniasIguales = compare(
      data.contrasenia,
      usuarioEncontrado.contrasenia
  )

  if (sonContraseniasIguales) {
    return {
      id: usuarioEncontrado.id,
      nombreUsuario: usuarioEncontrado.nombreCompleto,
      roles: usuarioEncontrado.roles.map((rol) => rol.rol),
    }
  }

  return null
}
