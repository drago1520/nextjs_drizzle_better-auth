import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

const enviroment = process.env.NODE_ENV
const envPath = 
  enviroment === "development" ? '.env.development' :
  enviroment === "production" ? '.env.production' :
  'missing enviroment vars'

config({path: envPath})

export default defineConfig({
  out: "./models/.__drizzle/",
  schema: "./models/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
