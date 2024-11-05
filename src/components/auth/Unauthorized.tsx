import Link from "next/link"
import { Home, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"

const UnauthorizedPage = () => {
  return (
    <div className="container py-24 md:py-32 grid place-items-center gap-6">
      <Lock className="size-24 text-gray-500" />
      <div className="flex flex-col items-center gap-1">
        <h4 className="font-semibold text-3xl">Acceso no autorizado</h4>
        <span className="text-lg">
          Lo sentimos, no tienes permitido acceder a este contenido.
        </span>
      </div>
      <Link href={"/"}>
        <Button>
          <Home className="size-4 mr-2" /> Inicio
        </Button>
      </Link>
    </div>
  )
}

export default UnauthorizedPage
