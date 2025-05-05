

import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options"
import { withAuth } from "@/components/auth/WithAuth"
import FormRegistrarEstadia from "@/components/estadia/FormRegistrarEstadia"
import { Page, PageTitle } from "@/components/layout/page"
import { TIPOS_USUARIOS } from "@/lib/Auth/types/tipos-usuarios"
import { getServerSession } from "next-auth"

const PaginaCargarVehiculo = async () => {
  const session = await getServerSession(authOptions)
  const complejoSeleccionado =  session?.user.selectedComplejo
  const idUsuario = session?.user.id
  console.log('sesion',session)
  console.log('complejos',complejoSeleccionado)
  return (
    <Page>
      <PageTitle>Cargar Reserva</PageTitle>
      <FormRegistrarEstadia complejo={complejoSeleccionado} idUsuario={idUsuario}/>
    </Page>
  )
}
export default withAuth(PaginaCargarVehiculo, {
  idTipo: TIPOS_USUARIOS.ENCARGADO,
})
