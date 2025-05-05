import { number, string, z } from "zod"

import { action } from "./safe-action"
import { estadiaSchema } from "../schemas/estadia-schema"
import { getAlojamientos, guardarEstadiaCliente, obtenerEstadiasMes } from "../services/estadia-service";
import { estadiaClienteSchema } from "../schemas/estadia-cliente-schema";
import { obtenerAlojamientos } from "../repositories/estadia-repository";

export const registrarEstadiaCompleta = action
.schema(estadiaClienteSchema)
.action(async (input)=>{
    try{
        const {estadia,cliente} = input.parsedInput;
        console.log('action',estadia,cliente)
        await guardarEstadiaCliente({estadia,cliente})
    }catch(error){
        console.error("",error)
        throw error
    }
})
  

export const obtenerListaAlojamientos = action 
 .schema(z.any())
 .action(async (data) => {
    return getAlojamientos(data.parsedInput)
  })
  export const getEstadias = action
  .schema(z.object({ mes: z.string() })) // Validación de que el mes es un string (formato esperado: "YYYY-MM")
  .action(async (input) => {
    try {
      const estadias = await obtenerEstadiasMes(input.parsedInput.mes);
      return estadias;
    } catch (error) {
      console.error("Error al obtener estadías:", error);
      throw error;
    }
  });