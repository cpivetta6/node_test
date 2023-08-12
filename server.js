const express = require("express");
const path = require("path");
const { saveUserToDatabase, testDatabaseConnection } = require("./database");

const hostname = "0.0.0.0"; // Allow connections from any IP
const port = process.env.PORT || 3000; // Use the provided port or fallback to 3000
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/signup", async (req, res) => {
  const personData = req.body;

  console.log("Received data:", JSON.stringify(personData));
  saveUserToDatabase(JSON.stringify(personData));
  //testDatabaseConnection();

  res.status(200).json({ message: "Data received successfully" });
});

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
