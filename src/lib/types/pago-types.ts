import { z } from "zod";
import { pagoSchema } from "../schemas/pago-schema";

export type Pago = z.infer<typeof pagoSchema>