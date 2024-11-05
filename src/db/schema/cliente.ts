import { pgTable, varchar, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { estadia } from "./estadia";

export const cliente = pgTable("cliente", {
  id: varchar("id").primaryKey(),
  nombreCompleto: varchar("nombre_completo"),
  telefono: varchar("telefono"),
  email: varchar("email"),
  provincia: varchar("provincia"),
  localidad: varchar("localidad"),
});

export const relacionesCliente = relations(cliente, ({ many }) => ({
  estadias: many(estadia),
}));
