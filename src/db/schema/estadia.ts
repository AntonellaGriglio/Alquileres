import { relations } from "drizzle-orm"
import { boolean, integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core"
import { cliente } from "./cliente";
import { estadoEstadia } from "./estado_estadia";
import { alojamiento } from "./alojamiento";
import { usuario } from "./usuario";

export const estadia = pgTable("estadia", {
    id: varchar("id").primaryKey(),
    idCliente: varchar("id_cliente"),
    fechaCreacion: timestamp("fecha_creacion").defaultNow(),
    idEstado: integer("id_estado"),
    fechaIngreso: timestamp("fecha_ingreso"),
    fechaEgreso: timestamp("fecha_egreso"),
    cantPersonas: integer("cant_personas"),
    desayuno: boolean("desayuno"),
    importeTotal: integer("importe_total"),
    idAlojamiento: varchar("id_alojamiento"),
    cantNoches: integer("cant_noches"),
    idUsuario: varchar("id_usuario"),
  })

  export const relacionesEstadia = relations(estadia, ({ one }) => ({
    cliente: one(cliente, { fields: [estadia.idCliente], references: [cliente.id] }),
    estado: one(estadoEstadia, { fields: [estadia.idEstado], references: [estadoEstadia.id] }),
    alojamiento: one(alojamiento, { fields: [estadia.idAlojamiento], references: [alojamiento.id] }),
    usuario: one(usuario, { fields: [estadia.idUsuario], references: [usuario.id] }),
  }));