import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema"
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL_CONFIG || 'default_database_url');
export const db = drizzle(sql,{schema});