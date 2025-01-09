import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schema from "./schema"
config({ path: ".env.local" }); 


if (!process.env.NEXT_PUBLIC_DATABASE_URL_CONFIG) {
  throw new Error("NEXT_PUBLIC_DATABASE_URL_CONFIG is not defined");
}
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL_CONFIG);

 const db = drizzle(sql, { schema });
 export default db
