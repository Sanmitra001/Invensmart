import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config({});

const pool = mysql.createPool({
  host: "localhost",
  user: process.env.db_user || "root",
  password: process.env.db_password || "admin",
  database: process.env.db_name || "invensmart",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool.promise();
