"use server"

import { db, eq, usuario } from "@/db"
import { compare } from "bcrypt"

import { LoginData } from "../schemas/login-schema"

export const loginUsuario = async (data: LoginData) => {
  const usuarioEncontrado = await db.query.usuario.findFirst({
    where: eq(usuario.nombreUsuario, data.nombreUsuario),
  })
console.log('user',usuarioEncontrado)

if (!usuarioEncontrado || !usuarioEncontrado.contrasenia) {
  console.log("Usuario no encontrado o sin contraseña");
  return null;
}
if (!usuarioEncontrado.idTipo) {
  console.log("Tipo de usuario no encontrado");
  return null;
}

  const sonContraseniasIguales = await compare(
      data.contrasenia,
      usuarioEncontrado.contrasenia
  );
  

  if (sonContraseniasIguales) {
    return {
      id: usuarioEncontrado.id,
      nombreUsuario: usuarioEncontrado.nombreCompleto,
      idTipo : usuarioEncontrado.idTipo
     
    }
  }

  return usuarioEncontrado 

}
