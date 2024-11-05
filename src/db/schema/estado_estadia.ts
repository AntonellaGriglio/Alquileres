import { relations } from "drizzle-orm"
import { pgTable, varchar } from "drizzle-orm/pg-core"

export const estadoEstadia = pgTable("estadoEstadia", {
    id: varchar("id").primaryKey(),
    nombre: varchar("nombre")
  })
  export const relacionesEstadoEstadia = relations(estadoEstadia, ({ many }) => ({
    estadias: many(estadoEstadia),
  }))