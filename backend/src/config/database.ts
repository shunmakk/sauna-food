import pgPromise from "pg-promise";
import { config } from "dotenv";

config();

const pgp = pgPromise();

const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const db = pgp(dbConfig);

export default db;
