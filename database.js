const { query } = require("express");
const { Pool } = require("pg");
const pool = new Pool({
  host: "dpg-cjblcorbq8nc73dleq6g-a.ohio-postgres.render.com",
  user: "postgresql_test2_user",
  password: "PlpTKH4Jg4Ehd9KXcyLkNzD8U2eakarD",
  database: "postgresql_test2",
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

/*
async function testDatabaseConnection() {
  const client = await pool.connect();

  try {
    const client = await pool.connect();
    console.log("Connected to the database.");
    // Perform a simple query to test the connection
    const result = await client.query("SELECT NOW()");
    console.log("Query result:", result.rows[0]);
    client.release();
  } catch (error) {
    console.error("Error testing database connection:", error);
  }
}*/

async function saveUserToDatabase(data) {
  const user = JSON.parse(data);
  const connection = await pool.connect();

  const query_addUser =
    "INSERT INTO public.users (name, surname, email,  password) VALUES ( $1, $2, $3, $4)";

  const parameters = [user.name, user.lastname, user.email, user.password];
  console.log("INSERT DATA");
  console.log(user);
  console.log(parameters);

  try {
    const result = await connection.query(query_addUser, parameters);
    //console.log("Query result:", result.rows[0]);
    connection.release();
  } catch (error) {
    console.error("Error testing database connection:", error);
  }

  // console.log(data[0]);

  /*
  const table = data[0];
  const button = data[1];
  const del = data[2];

  const query_selectTableID =
    "SELECT COUNT(*) AS count FROM order_item WHERE table_id = ?";
  const select_parameter = [table.id === undefined ? null : table.id];

  const result = await connection.query(query_selectTableID, select_parameter);
  const counter = result[0][0];

  if (del === "updateBtn") {
    query_updateBtnData(button);
    console.log("update btn");
  } else if (del === "delete") {
    query_deleteRow(table, button);
    console.log("delete row");
  } else if (JSON.stringify(counter["count"]) > 0) {
    query_updateOrderItem(table, button);
    console.log("UPDATE");
    //UPDATE
  } else {
    //query_insertTable(table);
    //query_insertButton(table);
    query_insertOrderItem(table, button);
    console.log("INSERT");
    //INSERT
  }*/
}

module.exports = { saveUserToDatabase };
