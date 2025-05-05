"use client";
import React, { useEffect, useState } from "react";
import {
  format,
  eachDayOfInterval,
  isWithinInterval,
  parseISO,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { toast } from "../ui/use-toast";
import { useAction } from "next-safe-action/hooks";
import { getEstadias, obtenerListaAlojamientos } from "@/lib/actions/crear-estadia-action";

interface Estadia {
  idAlojamiento: string;
  fechaIngreso: string;
  fechaEgreso: string;
}

interface ReporteProps {
  estadias: Estadia[]; // Asegúrate de que este tipo se pase correctamente al componente
  complejo: string | null | undefined;
}

const ReporteReservas: React.FC<ReporteProps> = ({ complejo }) => {
  const [dias, setDias] = useState<Date[]>([]);
  const [mesSeleccionado, setMesSeleccionado] = useState<string>(format(new Date(), "yyyy-MM"));
  const [estadiasFiltradas, setEstadiasFiltradas] = useState<Estadia[]>([]);

  const { execute: obtenerAlojamientos, result: alojamientos } = useAction(obtenerListaAlojamientos, {
    onError: () =>
      toast({
        title: "Error al obtener los alojamientos",
        description: "Ha ocurrido un error al obtener los alojamientos.",
        duration: 5000,
        variant: "destructive",
      }),
  });

  const { execute: obtenerEstadias, result: estadiasMes } = useAction(getEstadias, {
    onError: () =>
      toast({
        title: "Error al obtener las estadías",
        description: "Ha ocurrido un error al obtener las estadías.",
        duration: 5000,
        variant: "destructive",
      }),
  });

  useEffect(() => {
    // Solo obtener las estadías cuando cambia el mes seleccionado
    const fetchEstadias = async () => {
      try {
        // Llamar al servicio para obtener las estadías del mes seleccionado
        const resultado = await obtenerEstadias({ mes: mesSeleccionado });

        // Filtrar las estadías dentro del rango de fechas
        const inicioMes = startOfMonth(parseISO(`${mesSeleccionado}-01`));
        const finMes = endOfMonth(inicioMes);

        setDias(eachDayOfInterval({ start: inicioMes, end: finMes }));

        if (Array.isArray(resultado)) {
          const estadiasFiltradas = resultado.filter((estadia: Estadia) => {
            const fechaIngreso = parseISO(estadia.fechaIngreso);
            const fechaEgreso = parseISO(estadia.fechaEgreso);
            return (
              isWithinInterval(fechaIngreso, { start: inicioMes, end: finMes }) ||
              isWithinInterval(fechaEgreso, { start: inicioMes, end: finMes }) ||
              (fechaIngreso <= inicioMes && fechaEgreso >= finMes)
            );
          });

          // Establecer las estadías filtradas en el estado
          setEstadiasFiltradas(estadiasFiltradas);
        }
      } catch (error) {
        console.error("Error al obtener estadías:", error);
      }
    };

    fetchEstadias();
  }, [mesSeleccionado, obtenerEstadias]); // Solo se dispara cuando cambia el mes seleccionado

  useEffect(() => {
    // Solo obtener los alojamientos cuando cambia el complejo
    if (complejo) {
      obtenerAlojamientos(complejo);
    }
  }, [complejo, obtenerAlojamientos]);

  return (
    <div className="overflow-auto">
      <div className="mb-4">
        <label className="mr-2">Mes:</label>
        <input
          type="month"
          value={mesSeleccionado}
          onChange={(e) => setMesSeleccionado(e.target.value)}
          className="border px-2 py-1"
        />
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Fecha</th>
            {alojamientos?.data?.map((alojamiento) => (
              <th key={alojamiento.id} className="border border-gray-300 px-4 py-2">
                {alojamiento.nombre}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dias.map((dia) => (
            <tr key={dia.toISOString()}>
              <td className="border border-gray-300 px-4 py-2">{format(dia, "dd/MM/yyyy")}</td>
              {alojamientos?.data?.map((alojamiento) => {
                const ocupado = estadiasFiltradas.some(
                  (estadia) =>
                    estadia.idAlojamiento === alojamiento.id &&
                    isWithinInterval(dia, {
                      start: parseISO(estadia.fechaIngreso),
                      end: parseISO(estadia.fechaEgreso),
                    })
                );

                return (
                  <td
                    key={`${alojamiento.id}-${dia.toISOString()}`}
                    className={`border border-gray-300 px-4 py-2 ${
                      ocupado ? "bg-red-500 text-white" : "bg-green-500 text-white"
                    }`}
                  >
                    {ocupado ? "Ocupado" : "Libre"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReporteReservas;