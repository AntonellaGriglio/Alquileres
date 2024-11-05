import { relations } from "drizzle-orm"
import { integer, pgTable, varchar } from "drizzle-orm/pg-core"

export const usuario = pgTable("usuario", {
    id: varchar("id").primaryKey(),
    idTipo: varchar("id_tipo"),
    nombreCompleto: varchar("nombre_completo"),
    usuario: integer("usuario"),
    contrasenia: varchar("contrasenia")
  })