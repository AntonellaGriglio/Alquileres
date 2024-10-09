import type { Config } from "drizzle-kit"

const config = {
  dialect: 'sqlite',
  schema: "./src/db/schema/*",
  out: "./src/db/migrations",
  dbCredentials: {
    authToken: process.env.TURSO_AUTH_TOKEN ?? "",
    url: process.env.TURSO_DATABASE_URL ?? "",
  },
  driver: "turso",
} satisfies Config

export default config
