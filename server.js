const express = require("express");
const http = require("http");
const fs = require("fs");
const path = require("path");
const { Pool, Client } = require("pg");

const hostname = "0.0.0.0"; // Allow connections from any IP
const port = process.env.PORT || 3000; // Use the provided port or fallback to 3000
const app = express();

const pool = new Pool({
  user: "test_gerz_user",
  host: "dpg-cj9p3f2vvtos738jisn0-a.frankfurt-postgres.render.com",
  database: "test_gerz",
  password: "p7h8YjEmQPuYr5eHkueQoA3k9hs7ESzz",
  port: 5432,
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/home", (req, res) => {
  const filePath = path.join(__dirname, "public", "index.html");
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending index.html:", err);
      res.status(500).send("Error reading index.html");
    }
  });
});

app.get("/signup", (req, res) => {
  const filePath = path.join(__dirname, "public", "signup.html");
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending signup.html:", err);
      res.status(500).send("Error reading signup.html");
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
