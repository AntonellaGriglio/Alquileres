import { relations } from "drizzle-orm"
import { integer, pgTable, varchar } from "drizzle-orm/pg-core"
import { tipoUsuario } from "./tipo_usuario"

export const usuario = pgTable("usuario", {
    id: varchar("id").primaryKey(),
    idTipo: varchar("id_tipo"),
    nombreCompleto: varchar("nombre_completo"),
    nombreUsuario: varchar("nombreUsuario"),
    contrasenia: varchar("contrasenia")
  })
  export const relacionesUsuario = relations(usuario, ({  one }) => ({
    tipo: one(tipoUsuario, {
      fields: [usuario.idTipo],
      references: [tipoUsuario.id],
    }),
  }))