import { z } from "zod";

export const estadiaSchema = z.object({
    idCliente: z.string(),
    idEstado: z.string(),
    fechaIngreso: z.string(),
    fechaEgreso: z.string(),
    cantPersonas: z.number(),
    desayuno: z.boolean(),
    importeTotal: z.number(),
    idAlojamiento: z.string(),
    cantNoches: z.number(),
    idUsuario: z.string(),
})