// Remove this file

import { sqliteTable, text } from "drizzle-orm/sqlite-core"

export const exampleTable = sqliteTable("db_table_name", {
  column1: text("db_column_name", { length: 255 }).primaryKey(),
})
