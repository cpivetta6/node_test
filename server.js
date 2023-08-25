const express = require("express");
const path = require("path");
const { saveUserToDatabase, getUserList, getUserData } = require("./database");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const hostname = "0.0.0.0"; // Allow connections from any IP
const port = process.env.PORT || 3000; // Use the provided port or fallback to 3000
const app = express();
const SECRET_KEY = "test";

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  let userList = [];

  try {
    userList = await getUserList();
  } catch (err) {
    console.log(err);
  }

  const foundUser = userList.find((user) => user.email === email);

  console.log(foundUser);

  if (foundUser === undefined) {
    return res
      .status(401)
      .json({ success: false, message: "Username not found" });
  } else if (foundUser.password !== password) {
    return res
      .status(401)
      .json({ success: false, message: "Incorrect password" });
  }

  const payload = {
    userId: foundUser.id,
    username: foundUser.email,
    role: "user",
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  res.cookie("token", token);
  //res.json({ token });

  //res.status(200).json({ message: "Login successful", token });
  res.redirect("/user");

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

const verifyTokenMiddleware = (req, res, next) => {
  const token = req.cookies.token; // Assumes the token is stored in a cookie

  if (!token) {
    console.log("token invalid");
    return res.redirect("/signin"); // Redirect to login page if token is missing
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach user data to request object
    next();
  } catch (error) {
    return res.redirect("/signin"); // Redirect to login page if token is invalid
  }
};

app.get("/user", verifyTokenMiddleware, async (req, res) => {
  const userName = req.user.username;

  const user = await getUserData(userName);

  const name = user[0].name;

  res.render("personalpage", { name });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
