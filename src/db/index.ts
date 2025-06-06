import { drizzle } from "drizzle-orm/postgres-js"

import { supabaseClient } from "./connection"
import * as schema from "./schema"

export * from "./schema";
export * from "drizzle-orm";

export const db = drizzle(supabaseClient, { schema });
export type DatabaseConnection =
  | typeof db
  | Parameters<Parameters<(typeof db)["transaction"]>[0]>[0]
