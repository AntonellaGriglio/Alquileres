import { relations } from "drizzle-orm"
import { integer, pgTable, varchar } from "drizzle-orm/pg-core"
import { usuario } from "./usuario"

export const tipoUsuario = pgTable("tipo_usuario", {
    id: varchar("id").primaryKey(),
    nombre: varchar("nombre"),
  })
  
export const relacionesTipoUsuario = relations(tipoUsuario, ({ many }) => ({
  usuarios: many(usuario),
}))