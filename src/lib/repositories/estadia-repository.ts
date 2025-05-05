import { alojamiento, and, cliente, complejo, DatabaseConnection, eq, estadia, estadoEstadia, generarIdCliente, generarIdEstadia, generarIdPago, gte, lte, pago } from "@/db";
import { Estadia } from "../types/estadia-types";
import { Cliente } from "../types/cliente-types";
import { Pago } from "../types/pago-types";

export const registrarEstadia = async (
    db: DatabaseConnection,
    estadiaData: Estadia,
idCliente:string) =>{
    console.log('estadia',estadiaData)
        const nuevoId = generarIdEstadia();
        return await db
        .insert(estadia)
        .values({
            id:nuevoId,
            cantPersonas : estadiaData.cantPersonas,
            cantNoches : estadiaData.cantNoches,
            fechaEgreso: new Date(estadiaData.fechaEgreso),
            fechaIngreso: new Date(estadiaData.fechaIngreso),
            importeTotal: estadiaData.importeTotal,
            idAlojamiento: estadiaData.idAlojamiento,
            desayuno: estadiaData.desayuno,
            idCliente: idCliente,
            idEstado: estadiaData.idEstado,
            idUsuario: estadiaData.idUsuario,
        })
        .returning()
    } 

    
export const registrarCliente = async (
    db: DatabaseConnection,
    clienteData: Cliente) =>{
        const nuevoId = generarIdCliente();
        return await db
        .insert(cliente)
        .values({
            id:nuevoId,
            nombreCompleto : clienteData.nombreCompleto,
            localidad : clienteData.localidad,
            provincia: clienteData.provincia,
            email: clienteData.email,
            telefono: clienteData.telefono,
        })
        .returning()
    }

    export const buscarIdEstado = async (
        estado: string,
        db: DatabaseConnection
    )=> {
        return await db.query.estadoEstadia.findFirst({
            where: and(eq(estadoEstadia.nombre, estado)),
            columns: {id:true}
        })
    }
    export const buscarAlojamientos = async (
        idComplejo: string,
        db: DatabaseConnection
      ) => {
        return await db.query.alojamiento.findFirst({
          where: and(eq(alojamiento.idComplejo, idComplejo)),
          columns: { id: true },
        })
      } 
export const registrarPago = async (
    db: DatabaseConnection,
    pagoData: Pago) =>{
        const nuevoId = generarIdPago();
        return await db
        .insert(pago)
        .values({
            id:nuevoId,
            importe: pagoData.importe,
            idFormaPago: pagoData.idFormaPago,
            idTipoPago: pagoData.idTipoPago,
            idEstadia: pagoData.idEstadia,
            idCuenta: pagoData.idCuenta
        })
        .returning()
    }

    export const obtenerEstados = async (db: DatabaseConnection) => {
        return await db.query.estadoEstadia.findMany()
      }

         
      export const obtenerComplejoId = async (db: DatabaseConnection, complejoName: string) => {
        return await db.query.complejo.findFirst({
            where: and(eq(complejo.nombre, complejoName)),
            columns:{id:true}
        })
      }
      export const obtenerAlojamientos = async (db: DatabaseConnection, idComplejo: string) => {
        return await db.query.alojamiento.findMany({
            where: and(eq(alojamiento.idComplejo,idComplejo))
        })
      }


      
export const obtenerEstadiasPorMes = async (db: DatabaseConnection, inicioMes: Date, finMes: Date) => {
    return await db.query.estadia.findMany({
      where: and(
        gte(estadia.fechaIngreso, inicioMes),
        lte(estadia.fechaEgreso, finMes)
      ),
      with: {
        cliente: true,
        estado: true,
        alojamiento: true,
        usuario: true,
      },
    });
  };