import { getProviders } from "next-auth/react"

import { NextAuthErrors } from "@/types/auth"
import FormLogin from "@/components/auth/FormLogin"

const PaginaLogin = async ({
  searchParams,
}: {
  searchParams?: {
    error?: NextAuthErrors
    callbackUrl?: string
  }
}) => {
  const providers = await getProviders()
  if (!providers) return null

  return (
    <div>
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className="px-4">
          <FormLogin
            providers={providers}
            providerSelected="custom-session"
            error={searchParams?.error}
          />
        </div>
      ))}
    </div>
  )
}

export default PaginaLogin
