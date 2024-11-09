import { and, cliente, DatabaseConnection, eq, estadia, estadoEstadia, generarIdCliente, generarIdEstadia, generarIdPago, pago } from "@/db";
import { Estadia } from "../types/estadia-types";
import { Cliente } from "../types/cliente-types";
import { Pago } from "../types/pago-types";

export const registrarEstadia = async (
    db: DatabaseConnection,
    estadiaData: Estadia) =>{
        const nuevoId = generarIdEstadia();
        return await db
        .insert(estadia)
        .values({
            id:nuevoId,
            cantPersonas : estadiaData.cantPersonas,
            cantNoches : estadiaData.cantNoches,
            fechaEgreso: estadiaData.fechaEgreso,
            fechaIngreso: estadiaData.fechaIngreso,
            importeTotal: estadiaData.importeTotal,
            idAlojamiento: estadiaData.idAlojamiento,
            desayuno: estadiaData.desayuno,
            idCliente: estadiaData.idCliente,
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
    