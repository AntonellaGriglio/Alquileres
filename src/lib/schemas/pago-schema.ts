import { z } from "zod";

export const pagoSchema = z.object({
    importe: z.number(),
    idFormaPago: z.string(),
    idTipoPago: z.string(),
    idEstadia: z.string(),
    idCuenta: z.string(),
})