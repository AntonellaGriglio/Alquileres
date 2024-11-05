import { object, string, z } from "zod"

export const loginSchema = object({
  nombreUsuario: string({
    required_error: "El nombre de usuario es requerido",
    invalid_type_error: "El nombre de usuario es inválido",
  }).min(4, "Indica un nombre de usuario válido"),
  contrasenia: string({
    required_error: "La contraseña es requerida",
    invalid_type_error: "La contraseña es inválida",
  }).min(1, "Indica una contraseña válida"),
})

export type LoginData = z.infer<typeof loginSchema>
