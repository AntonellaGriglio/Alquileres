import Link from "next/link"
import { Car } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Gestión de Estacionamiento
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Una manera eficiente y transparente de gestionar el
                  estacionamiento de turistas en tu municipio/comuna.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/auth/login" className={buttonVariants()}>
                  Iniciar sesión
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
