import { pgTable, varchar } from "drizzle-orm/pg-core";
import { complejo } from "./complejo";
import { usuario } from "./usuario";
import { relations } from "drizzle-orm";

export const complejoUsuario = pgTable("complejo_usuario", {
  id: varchar("id").primaryKey(),
  idComplejo: varchar("id_complejo").references(() => complejo.id),
  idUsuario: varchar("id_usuario").references(() => usuario.id),
});

export const relacionesComplejoUsuario = relations(complejoUsuario, ({ one }) => ({
  complejo: one(complejo, { fields: [complejoUsuario.idComplejo], references: [complejo.id] }),
  usuario: one(usuario, { fields: [complejoUsuario.idUsuario], references: [usuario.id] }),
}));
