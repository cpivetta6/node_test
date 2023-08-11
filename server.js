const http = require("http");
const fs = require("fs");
const path = require("path");
const { Pool, Client } = require("pg");

const hostname = "0.0.0.0"; // Allow connections from any IP
const port = process.env.PORT || 3000; // Use the provided port or fallback to 3000

const pool = new Pool({
  user: "test_gerz_user",
  host: "dpg-cj9p3f2vvtos738jisn0-a.frankfurt-postgres.render.com",
  database: "test_gerz",
  password: "p7h8YjEmQPuYr5eHkueQoA3k9hs7ESzz",
  port: 5432,
});

const server = http.createServer(async (req, res) => {
  if (req.url === "/home" || req.url === "/") {
    // Serve the "index.html" file
    const filePath = path.join(__dirname, "index.html");
    fs.readFile(filePath, "utf8", (err, content) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error reading index.html");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      }
    });
  } else if (req.url === "/style.css") {
    // Serve the "style.css" file
    const filePath = path.join(__dirname, "style.css");
    fs.readFile(filePath, "utf8", (err, content) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error reading style.css");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(content);
      }
    });
  } else if (req.url === "/signup") {
    // Serve the "signup.html" file for the "/signup" route
    const filePath = path.join(__dirname, "signup.html");
    fs.readFile(filePath, "utf8", (err, content) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error reading signup.html");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      }
    });
  } else {
    // For all other routes, respond with "index" text
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("index");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
