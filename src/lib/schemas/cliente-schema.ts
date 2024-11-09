import { z } from "zod";

export const clienteSchema = z.object ({
    nombreCompleto: z.string(),
    telefono: z.string(),
    email: z.string(),
    provincia: z.string(),
    localidad: z.string(),
})