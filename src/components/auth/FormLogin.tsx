"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { XCircleIcon } from "lucide-react"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"

import { LoginData, loginSchema } from "@/lib/Auth/schemas/login-schema"
import { LoginFormProps } from "@/lib/Auth/types/login-types"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Toaster } from "@/components/ui/toaster"

const FormLogin = ({ providers, providerSelected, error }: LoginFormProps) => {
  const provider = providers ? providers[providerSelected] : null

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      nombreUsuario: "",
      contrasenia: "",
    } satisfies LoginData,
  })

  if (!provider) return null

  const onSubmit = (data: LoginData) => {
    signIn(provider.id, { ...data, callbackUrl: "/" })
  }

  return (
    <div className="max-w-md mx-auto my-8 flex flex-col border rounded-sm bg-muted p-6">
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <h4 className="text-lg text-center font-semibold">Iniciar sesión</h4>
          {error ? (
            <Alert
              variant="destructive"
              className="flex flex-row items-center gap-2 bg-red-300 border-red-400 text-red-950/90 dark:bg-red-400 dark:border-[#b54141] dark:text-red-950 "
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
                  <Input placeholder="Nombre de usuario" {...field} />
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
                  <Input type="password" {...field} />
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
  )
}

export default FormLogin
