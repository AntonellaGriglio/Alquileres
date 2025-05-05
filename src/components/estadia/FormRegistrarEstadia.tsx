"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { obtenerListaAlojamientos, registrarEstadiaCompleta } from "@/lib/actions/crear-estadia-action";
import { estadiaClienteSchema } from "@/lib/schemas/estadia-cliente-schema";
import { ESTADOS_ESTADIA } from "@/lib/types/estadia-types";
import { toast } from "../ui/use-toast";

const FormRegistrarEstadia:  React.FC<{
  complejo: string | null | undefined
  idUsuario: string | null | undefined
}> = ({  complejo,idUsuario }) =>{
  const { execute: registrarEstadia } = useAction(registrarEstadiaCompleta);
  
  type FormData = z.infer<typeof estadiaClienteSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(estadiaClienteSchema),
    defaultValues: {
      estadia: {
        idCliente: "",
        idEstado: ESTADOS_ESTADIA.PENDIENTE,
        fechaIngreso: '', // Convertir a string en formato de fecha
        fechaEgreso: '',  // Convertir a string en formato de fecha
        cantPersonas: 0,
        desayuno: false,
        importeTotal: 0,
        idAlojamiento: "",
        cantNoches: 0,
        idUsuario: idUsuario ||"",
        complejo: complejo || ""
      },
      cliente: {
        nombreCompleto: "",
        telefono: "",
        email: "",
        provincia: "",
        localidad: "",
      },
    },
  });
  const { execute: obtenerAlojamientos, result: alojamientos } = useAction(
    obtenerListaAlojamientos,
    {
      onError: () => {
        toast({
          title: "Error al obtener los alojamientos",
          description: "Ha ocurrido un error al obtener los alojamientos.",
          duration: 5000,
          variant: "destructive",
        })
      },
    }
  )
  const onSubmit = form.handleSubmit((data) => registrarEstadia(data));
  useEffect(() => {
    obtenerAlojamientos(complejo)
  }, [obtenerAlojamientos])

  return (
    <div className="flex flex-col w-full bg-primary/15 items-center py-4 rounded-t-3xl gap-16 min-h-[71vh]">
      <Card className="w-full max-w-sm p-4 flex flex-col gap-6">
        <Form {...form}>
          <form className="flex flex-col gap-6" onSubmit={onSubmit}>
            <FormField control={form.control} name="estadia.cantPersonas" render={({ field }) => (
              <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                <FormLabel>cantPersonas*</FormLabel>
                <FormControl>
                  <Input placeholder="Cantidad de Personas" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
              <FormField control={form.control} name="cliente.localidad" render={({ field }) => (
              <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                <FormLabel>Localidad</FormLabel>
                <FormControl>
                  <Input placeholder="Localidad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
              <FormField control={form.control} name="cliente.provincia" render={({ field }) => (
              <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                <FormLabel>Provincia*</FormLabel>
                <FormControl>
                  <Input placeholder="Provincia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="estadia.importeTotal" render={({ field }) => (
              <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                <FormLabel>Importe Total*</FormLabel>
                <FormControl>
                  <Input placeholder="Importe Total Estadia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            {/* Campo de selección de estado */}
            <FormField control={form.control} name="estadia.idAlojamiento" render={({ field }) => (
              <FormItem className="space-y-0.5">
                <FormLabel>Alojamiento</FormLabel>
                <FormControl>
                  <Select onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {alojamientos?.data?.map((alojamiento) => (
                          <SelectItem value={alojamiento.id} key={alojamiento.id}>
                            <span>{alojamiento.nombre}</span>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Campo de fecha ingreso */}
            <FormField control={form.control} name="estadia.fechaIngreso" render={({ field }) => (
              <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                <FormLabel>Fecha de Ingreso*</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Campo de fecha egreso */}
            <FormField control={form.control} name="estadia.fechaEgreso" render={({ field }) => (
              <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                <FormLabel>Fecha de Egreso*</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Otros campos de texto */}
            <FormField control={form.control} name="cliente.nombreCompleto" render={({ field }) => (
              <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                <FormLabel>Nombre Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre Completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="cliente.telefono" render={({ field }) => (
              <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input placeholder="Teléfono" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="cliente.email" render={({ field }) => (
              <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <Button className="bg-primary text-white self-end" type="submit">
              Guardar estadía
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default FormRegistrarEstadia;
