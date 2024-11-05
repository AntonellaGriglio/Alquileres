import { relations } from "drizzle-orm"
import { integer, pgTable, varchar } from "drizzle-orm/pg-core"

export const formaPago = pgTable("forma_pago", {
    id: varchar("id").primaryKey(),
    nombre: varchar("nombre"),
  })