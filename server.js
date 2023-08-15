const express = require("express");
const path = require("path");
const { saveUserToDatabase, getUserList } = require("./database");

const hostname = "0.0.0.0"; // Allow connections from any IP
const port = process.env.PORT || 3000; // Use the provided port or fallback to 3000
const app = express();

//TO DO LIST
/*
  ESTAMOS FAZENDO A PARTE DE TESTE DE REQUISICAO DE DADOS DO DB, NOS VAMOS CONTROLAR SE OS DADOS ENVIADOS PELO USUARIO EXISTEM, E DEPOIS DISSO VAMOS
  ENVIAR PARA O CLIENT SIDE, ENTRAR NA PAGINA PERSONAL DO USER COM O SEU PROPRIO ID CASO VA TUDO BEM.
  SE CASO NAO ENCONTRAR O USUARIO, RETORNARA QUE O USUARIO NAO EXISTE, 
  SE CASO RETORNAR SENHA NAO COMPATIVEL, USUARIO NAO VALIDO.
*/

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

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

  req.session = { userData };
  return res.status(200).json({ message: "Data received successfully" });
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

app.get("/user", (req, res) => {
  const filePath = path.join(__dirname, "public", "personalpage.html");

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending personalpage.html:", err);
      res.status(500).send("Error reading personalpage.html");
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
