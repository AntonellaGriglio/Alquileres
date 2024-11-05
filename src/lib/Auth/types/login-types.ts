import { getProviders } from "next-auth/react"

import { NextAuthErrors } from "@/types/auth"

export type LoginFormProps = {
  providers: Awaited<ReturnType<typeof getProviders>>
  providerSelected: string
  error?: NextAuthErrors
}
