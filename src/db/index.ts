import { drizzle } from 'drizzle-orm/libsql';
import { tursoClient } from './connection';
import * as schema from './schema';

export const db = drizzle(tursoClient, { schema });
export * from './schema';
export * from 'drizzle-orm';
