import { compare } from "bcrypt"

import { LoginData } from "../schemas/login-schema"
import { db, eq, usuario, complejoUsuario, complejo } from "@/db"

export const loginUsuario = async (data: LoginData) => {
  const usuarioEncontrado = await db.query.usuario.findFirst({
    where: eq(usuario.nombreUsuario, data.nombreUsuario),
    with: { tipo: true }
  })

  if (!usuarioEncontrado) {
    console.log("Usuario no encontrado");
    return null;
  }

  if (!usuarioEncontrado.contrasenia) {
    console.log("Contraseña no encontrada en la base de datos");
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

  if (!sonContraseniasIguales) {
    console.log("Contraseña incorrecta");
    return null;
  }

  // Obtener los complejos asignados al usuario
  const complejos = await db.query.complejoUsuario.findMany({
    where: eq(complejoUsuario.idUsuario, usuarioEncontrado.id),
    with: {
      complejo: true,  // Esto incluye la relación con los complejos
    }
  });

  // Mapear para obtener solo la información del complejo
  const complejosSolo = complejos.map(item => item.complejo);
  console.log('complejos encontrados:', complejosSolo)

  // Si quieres seleccionar el primer complejo como `selectedComplejo`
  const selectedComplejo = complejosSolo.length > 0 ? complejosSolo[0]?.nombre : '';

  return {
    usuario: {
      id: usuarioEncontrado.id,
      nombreUsuario: usuarioEncontrado.nombreCompleto,
      tipo: usuarioEncontrado.tipo,
    },
    complejos: complejosSolo || [],  // Si no hay complejos, devolver un arreglo vacío
    selectedComplejo, // Asignamos el primer complejo como el complejo seleccionado
  };
}
