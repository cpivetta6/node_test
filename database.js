const { query } = require("express");
const { Pool } = require("pg");

const connectionString =
  "postgres://postgresql_test2_5avf_user:jp6koVgNcnRyiERCMwuCGT4KOwAsZOK3@dpg-cjc9fubbq8nc739b5stg-a.frankfurt-postgres.render.com/postgresql_test2_5avf";
const databaseUrl = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false },
});

async function saveUserToDatabase(data) {
  const userData = JSON.parse(data);

  // Check if the email is already registered
  const userList = await getUserList(); // Assume this function retrieves all users
  const foundUser = userList.find((user) => user.email === userData.email);

  if (foundUser) {
    return false; // Email already registered, return false
  }

  const query_addUser =
    "INSERT INTO public.users (name, surname, email, password) VALUES ($1, $2, $3, $4)";

  const parameters = [
    userData.name,
    userData.lastname,
    userData.email,
    userData.password,
  ];

  try {
    const connection = await pool.connect();
    try {
      await connection.query(query_addUser, parameters);
      console.log("User successfully inserted.");
      return true; // User inserted successfully, return true
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error executing query:", error);
    throw error; // Rethrow the error for error handling in the calling code
  }
}

async function getUserList(data) {
  const query = "SELECT id, email, password FROM public.users";

  try {
    const connection = await pool.connect();
    try {
      const userList = await connection.query(query);
      return userList.rows;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error executing query:", error);
  }
}

async function getUserList(data) {
  const query = "SELECT id, email, password FROM public.users";

  try {
    const connection = await pool.connect();
    try {
      const userList = await connection.query(query);
      return userList.rows;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error executing query:", error);
  }
}

module.exports = { saveUserToDatabase, getUserList };
