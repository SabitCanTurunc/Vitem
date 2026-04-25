import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
if (!url) {
  throw new Error("TURSO_DATABASE_URL veya DATABASE_URL gereklidir");
}

const authToken = process.env.TURSO_AUTH_TOKEN;

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "turso",
  dbCredentials: {
    url,
    authToken,
  },
});
