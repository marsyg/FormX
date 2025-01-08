import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.ts",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:0MteJWmi2vPT@ep-noisy-king-a5lx7xhs.us-east-2.aws.neon.tech/neondb?sslmode=require',
  }

});
