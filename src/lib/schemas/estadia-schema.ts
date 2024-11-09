import { z } from "zod";

export const estadiaSchema = z.object({
    idCliente: z.string(),
    idEstado: z.string(),
    fechaIngreso: z.date(),
    fechaEgreso: z.date(),
    cantPersonas: z.number(),
    desayuno: z.boolean(),
    importeTotal: z.number(),
    idAlojamiento: z.string(),
    cantNoches: z.number(),
    idUsuario: z.string(),
})