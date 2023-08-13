const { query } = require("express");
const { Pool } = require("pg");

const connectionString =
  "postgres://postgresql_test2_user:PlpTKH4Jg4Ehd9KXcyLkNzD8U2eakarD@dpg-cjblcorbq8nc73dleq6g-a:5432/postgresql_test2";
const databaseUrl = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false },
});

async function saveUserToDatabase(data) {
  const user = JSON.parse(data);

  const query_addUser =
    "INSERT INTO public.users (name, surname, email,  password) VALUES ( $1, $2, $3, $4)";

  const parameters = [user.name, user.lastname, user.email, user.password];

  try {
    const connection = await pool.connect();
    try {
      await connection.query(query_addUser, parameters);
      console.log("User successfully inserted.");
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error executing query:", error);
  }
}

module.exports = { saveUserToDatabase };
