import { complejo } from "@/db";
import { z } from "zod";

export const estadiaClienteSchema = z.object({
  estadia: z.object({
    idCliente: z.string(),
    idEstado: z.string(),
    fechaIngreso: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Fecha de ingreso inválida",
    }),
    fechaEgreso: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Fecha de egreso inválida",
    }),
    cantPersonas: z.number(),
    desayuno: z.boolean(),
    importeTotal: z.number(),
    idAlojamiento: z.string(),
    cantNoches: z.number(),
    idUsuario: z.string(),
    complejo: z.string(),
  }),
  cliente: z.object({
    nombreCompleto: z.string(),
    telefono: z.string(),
    email: z.string().email(),
    provincia: z.string(),
    localidad: z.string(),
  }),
});
