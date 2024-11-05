import {  pgTable, varchar } from "drizzle-orm/pg-core";
import { alojamiento } from "./alojamiento";
import { relations } from "drizzle-orm";
import { complejoUsuario } from "./complejo_usuario";

export const complejo = pgTable("complejo", {
  id: varchar("id").primaryKey(),
  nombre: varchar("nombre"),
  color: varchar("color"),
});

export const relacionesComplejo = relations(complejo, ({ many }) => ({
  usuarios: many(complejoUsuario),
  alojamientos: many(alojamiento),
}));
