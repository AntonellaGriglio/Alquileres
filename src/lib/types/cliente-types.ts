import { z } from "zod";
import { clienteSchema } from "../schemas/cliente-schema";

export type Cliente = z.infer<typeof clienteSchema>