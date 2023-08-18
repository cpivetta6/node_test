const express = require("express");
const path = require("path");
const { saveUserToDatabase, getUserList } = require("./database");
const bodyParser = require("body-parser");

const hostname = "0.0.0.0"; // Allow connections from any IP
const port = process.env.PORT || 3000; // Use the provided port or fallback to 3000
const app = express();

//TO DO LIST
/*
 ESTAMOS COM UM PROBLEMA QUANDO TENTAMOS LOGAR E ENTRAR NA PAGINA DO USUARIO
 QUANDO EU ENTRO NA PAGINA DO USUARIO SEM O ID, APENAS /USER, ELE ENTRA NORMALMENTE
 MAS QUANDO EU TENTO COLCOAR O ID, ELE CHEGA COMO INVALIDO
 ACHO QUE è UM PROBLEMA OU NA CONVERSAO DO DADO EM JSON
 OU è UM PROBLEMA DE TEMPO DE RESPOSTA DO "FETCH"
*/

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.post("/signin", async (req, res) => {
  const userData = req.body;

  let userList = [];

  try {
    userList = await getUserList(userData);
  } catch (err) {
    console.log(err);
  }

  const foundUser = userList.find((user) => user.email === userData.email);
  console.log(foundUser);

  if (foundUser === undefined) {
    return res
      .status(401)
      .json({ success: false, message: "Username not found" });
  } else if (foundUser.password !== userData.password) {
    return res
      .status(401)
      .json({ success: false, message: "Incorrect password" });
  }
  const userId = foundUser.id;
  console.log("redirect to: /user/" + userId);
  //req.session.user = { userId: userId };
  res.cookie("userId", userId);
  res.status(200).json({ message: "Login successful", userId: userId });

  //--------------------------------------
  //res.redirect(`/user/${userId}`);

  /* const userData = req.body;
  let userList = [];

  try {
    userList = await getUserList(userData);
  } catch (err) {
    console.log(err);
  }

  const foundUser = userList.find((user) => user.email === userData.email);
  

  if (foundUser === undefined) {
    return res
      .status(401)
      .json({ success: false, message: "Username not found" });
  } else if (foundUser.password !== userData.password) {
    return res
      .status(401)
      .json({ success: false, message: "Incorrect password" });
  }
  console.log("redirect?");
  //req.session = { userData };
  res.redirect(`/user/${foundUser.id}`);*/
});

app.post("/signup", async (req, res) => {
  const personData = req.body;

  console.log("Received data:", JSON.stringify(personData));
  const userStatus = await saveUserToDatabase(JSON.stringify(personData));
  console.log(userStatus);

  if (userStatus) {
    console.log("user ok");
    return res.status(200).json({ message: "Data received successfully" });
  }
  console.log("user duplicatted");
  return res.status(404).json({ message: "user duplicated" });
});

app.get("/signin", (req, res) => {
  const filePath = path.join(__dirname, "public", "signin.html");
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending signin.html:", err);
      res.status(500).send("Error reading signin.html");
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

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  console.log("user page: " + id);

  // Fetch user data from the database based on the username
  // Render the user's unique page using a template engine like EJS, Pug, etc.

  res.render("personalpage", { id });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
