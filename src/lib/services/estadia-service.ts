"use server";

import { db } from "@/db";
import { obtenerEstadiasPorMes, registrarCliente, registrarEstadia, obtenerComplejoId, obtenerAlojamientos } from "../repositories/estadia-repository";
import { startOfMonth, endOfMonth } from "date-fns";
import { Cliente } from "../types/cliente-types";
import { Estadia } from "../types/estadia-types";

export const guardarEstadiaCliente = async ({
  estadia,
  cliente,
}: {
  estadia: Estadia;
  cliente: Cliente;
}) => {
  return await db.transaction(async (trx) => {
    try {
      const clienteRegistrado = await registrarCliente(trx, cliente);
      if (!clienteRegistrado) throw new Error("Estado no encontrado");

      const estadiaRegistrada = await registrarEstadia(trx, estadia, clienteRegistrado[0].id);
      return { clienteRegistrado, estadiaRegistrada };
    } catch (error) {
      console.error("Error al guardar vehículo y pago:", error);
      throw error;
    }
  });
};

export const obtenerEstadiasMes = async (mesSeleccionado: string) => {
  return await db.transaction(async (trx) => {
    try {
      const inicioMes = startOfMonth(new Date(`${mesSeleccionado}-01`));
      const finMes = endOfMonth(inicioMes);

      const estadias = await obtenerEstadiasPorMes(trx, inicioMes, finMes);
      return estadias;
    } catch (error) {
      console.error("Error al obtener estadías:", error);
      throw error;
    }
  });
};

export const getAlojamientos = async (complejoName: string) => {
  return await db.transaction(async (trx) => {
    try {
      const idComplejo = await obtenerComplejoId(trx, complejoName);
      if (!idComplejo) throw new Error("Complejo no encontrado");

      const alojamientos = await obtenerAlojamientos(trx, idComplejo.id);
      return alojamientos;
    } catch (error) {
      console.error("Error al obtener alojamientos:", error);
      throw error;
    }
  });
};
