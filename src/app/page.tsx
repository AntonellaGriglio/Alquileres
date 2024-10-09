import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Built with Radix UI and Tailwind CSS.{" "}
          <br className="hidden sm:inline" />
          Drizzle ORM + MySQL/Planetscale Database
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Next.js clean starter template with Tailwind CSS, TypeScript, ESLint,
          Prettier, and DrizzleORM.
        </p>
      </div>
    </section>
  )
}
