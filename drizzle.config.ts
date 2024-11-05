import type { Config } from "drizzle-kit"

const config = {
  dialect: "postgresql",
  schema: "./src/db/schema/*",
  out: "./src/db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
} satisfies Config

export default config
