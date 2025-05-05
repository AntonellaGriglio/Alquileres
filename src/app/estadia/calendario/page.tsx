

import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options"
import { withAuth } from "@/components/auth/WithAuth"
import ReporteReservas from "@/components/calendario/ReporteDisponibilidad"
import FormRegistrarEstadia from "@/components/estadia/FormRegistrarEstadia"
import { Page, PageTitle } from "@/components/layout/page"
import { complejo } from "@/db"
import { TIPOS_USUARIOS } from "@/lib/Auth/types/tipos-usuarios"
import { getServerSession } from "next-auth"

const PaginaCalendario = async () => {
  const session = await getServerSession(authOptions)
  const complejoSeleccionado =  session?.user.selectedComplejo
  const idUsuario = session?.user.id
  console.log('sesion',session)
  console.log('complejos',complejoSeleccionado)
  return (
    <Page>
      <PageTitle>Cargar Reserva</PageTitle>
      <ReporteReservas estadias={[]} fechaInicio={""} fechaFin={""} complejo={complejoSeleccionado}/>
    </Page>
  )
}
export default withAuth(PaginaCalendario, {
  idTipo: TIPOS_USUARIOS.ENCARGADO,
})
