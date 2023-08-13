const { query } = require("express");
const { Pool } = require("pg");

const connectionString =
  "postgres://postgresql_test2_user:PlpTKH4Jg4Ehd9KXcyLkNzD8U2eakarD@dpg-cjblcorbq8nc73dleq6g-a:5432/postgresql_test2";

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false },
});

async function saveUserToDatabase(data) {
  const user = JSON.parse(data);
  const connection = await pool.connect();

  const query_addUser =
    "INSERT INTO public.users (name, surname, email,  password) VALUES ( $1, $2, $3, $4)";

  const parameters = [user.name, user.lastname, user.email, user.password];

  try {
    await connection.query(query_addUser, parameters);
    console.log("User successfully inserted.");
  } catch (error) {
    console.error("Error executing query:", error);
  } finally {
    connection.release();
  }
}

module.exports = { saveUserToDatabase };
