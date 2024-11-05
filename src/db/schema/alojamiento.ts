import {  pgTable, varchar, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { estadia } from "./estadia";

export const alojamiento = pgTable("alojamiento", {
  id: varchar("id").primaryKey(),
  idComplejo: varchar("id_complejo"),
  nombre: varchar("nombre"),
  cantPersonas: integer("cant_personas"),
});

export const relacionesAlojamiento = relations(alojamiento, ({ many }) => ({
  estadias: many(estadia, { relationName: "estadia" }),
}));
