import { z } from "zod";
import { estadiaSchema } from "../schemas/estadia-schema";

export type Estadia = z.infer<typeof estadiaSchema>

export enum ESTADOS_ESTADIA{
    PENDIENTE = 'Pendiente',
    RESERVADA = 'Reservada',
    PAGADA = 'Pagada',
    RESERVADA_SIN_PAGO = 'ReservadaSinPago'
}