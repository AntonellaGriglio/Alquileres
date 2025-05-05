"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { XCircleIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import { LoginData, loginSchema } from "@/lib/Auth/schemas/login-schema";
import { LoginFormProps } from "@/lib/Auth/types/login-types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { Dialog, DialogContent } from "@/components/ui/dialog";
const FormLogin = ({ providers, providerSelected, error }: LoginFormProps) => {
  const provider = providers ? providers[providerSelected] : null;
  const { data: session } = useSession();

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      nombreUsuario: "",
      contrasenia: "",
    } satisfies LoginData,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedComplex, setSelectedComplex] = useState<string | null>(null);

  // Abrir modal siempre después de iniciar sesión exitosamente
  const onSubmit = async (data: LoginData) => {
    try {
      const result = await signIn(provider?.id, { ...data, callbackUrl: "/" });
      setIsModalOpen(true);
      if (result?.error) {
        setModalMessage("Error al iniciar sesión: " + result.error);
      } else {
        setModalMessage("Inicio de sesión exitoso");
        setIsModalOpen(true); // Modal siempre se abre
      }
    } catch (error) {
      setModalMessage("Ocurrió un error inesperado");
    }
  };

  const handleComplexSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedComplex(event.target.value);
    sessionStorage.setItem("selectedComplex", event.target.value); // Guardar selección
  };

  const handleCloseModal = () => {
    if (selectedComplex) {
      setIsModalOpen(false); // Cerrar solo si hay una selección
    } else {
      alert("Por favor, selecciona un complejo antes de continuar.");
    }
  };

  if (!provider) return null;

  return (
    <>
      <div className="max-w-md mx-auto my-8 flex flex-col border rounded-sm bg-muted p-6">
        <Toaster />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <h4 className="text-lg text-center font-semibold">Iniciar sesión</h4>
            {error ? (
              <Alert
                variant="destructive"
                className="flex flex-row items-center gap-2 bg-red-300 border-red-400 text-red-950/90 dark:bg-red-400 dark:border-[#b54141] dark:text-red-950"
              >
                <div>
                  <XCircleIcon size={18} />
                </div>
                <AlertDescription>
                  {error === "CredentialsSignin"
                    ? "Usuario o contraseña inválido, intente de nuevo"
                    : "Ocurrió un error inesperado"}
                </AlertDescription>
              </Alert>
            ) : null}

            <FormField
              control={form.control}
              name="nombreUsuario"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Usuario</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre de usuario"
                      aria-label="Nombre de usuario"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contrasenia"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" aria-label="Contraseña" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2" type="submit">
              Ingresar
            </Button>
          </form>
        </Form>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Selecciona un Complejo</h4>
            <p className="text-sm text-muted-foreground">
              Por favor, selecciona un complejo antes de continuar.
            </p>
            {session?.user?.complejos ? (
              <select
                value={selectedComplex || ""}
                onChange={handleComplexSelect}
                className="mt-2 p-2 border rounded w-full"
              >
                <option value="" disabled>
                  Seleccionar un complejo...
                </option>
                {session.user.complejos.map((complejo) => (
                  <option key={complejo.id} value={complejo.nombre}>
                    {complejo.nombre}
                  </option>
                ))}
              </select>
            ) : (
              <p>No se encontraron complejos disponibles</p>
            )}
          </div>
          <Button onClick={handleCloseModal} variant="outline" className="mt-4 w-full">
            Confirmar y Cerrar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormLogin;
