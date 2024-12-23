import { pgTable, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { estadia } from "./estadia";
import { cuenta } from "./cuenta";
import { relations } from "drizzle-orm";
import { getIdGenerator } from "../utils/id-generator";
import { number } from "zod";

export const pago = pgTable("pago", {
  id: varchar("id").primaryKey(),
  importe: integer("importe"),
  idFormaPago: varchar("id_forma_pago"),
  idTipoPago: varchar("id_tipo_pago"),
  fecha: timestamp('fecha').defaultNow(),
  idEstadia: varchar("id_estadia").references(() => estadia.id),
  idCuenta: varchar("id_cuenta").references(() => cuenta.id),
});

export const relacionesPago = relations(pago, ({ one }) => ({
  estadia: one(estadia, { fields: [pago.idEstadia], references: [estadia.id] }),
  cuenta: one(cuenta, { fields: [pago.idCuenta], references: [cuenta.id] }),
}));

export const generarIdPago = getIdGenerator("PAG")