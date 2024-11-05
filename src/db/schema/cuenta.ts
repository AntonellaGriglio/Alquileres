import { pgTable, varchar } from "drizzle-orm/pg-core";
import { complejo } from "./complejo";
import { relations } from "drizzle-orm";

export const cuenta = pgTable("cuenta", {
  id: varchar("id").primaryKey(),
  idComplejo: varchar("id_complejo").references(() => complejo.id),
  cbu: varchar("cbu"),
  banco: varchar("banco"),
  alias: varchar("alias"),
});

export const relacionesCuenta = relations(cuenta, ({ one }) => ({
  complejo: one(complejo, { fields: [cuenta.idComplejo], references: [complejo.id] }),
}));
