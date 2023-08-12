function registerUser(project) {
  fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  })
    .then((resp) => resp.json())
    .then((data) => {
      navigate("/home", {
        state: { message: "Registered" },
      });
    });
}
