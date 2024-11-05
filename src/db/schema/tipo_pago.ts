import { relations } from "drizzle-orm"
import { integer, pgTable, varchar } from "drizzle-orm/pg-core"
import { pago } from "./pago"

export const tipoPago = pgTable("tipo_pago", {
    id: varchar("id").primaryKey(),
    nombre: varchar("nombre"),
  })
  export const relacionesTipoPago = relations(tipoPago, ({ many }) => ({
    pagos: many(pago),
  }))