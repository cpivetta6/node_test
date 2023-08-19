const loginForm = document.getElementById("loginForm");
//submitButton.addEventListener("click", handleSignIn);

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const personData = {
    name: name,
    lastname: lastname,
    email: email,
    password: password,
  };

  const url = window.location.pathname;

  //"https://test-node-server-test.onrender.com/signup

  fetch("https://test-node-server-test.onrender.com/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(personData),
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(
          `Network response was not ok: ${resp.status} ${resp.statusText}`
        );
      }
      return resp.json();
    })
    .then((data) => {
      console.log(data);
      window.location.href = "/signin";
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      alert("Email already registered");
    });
});
//const submitButton = document.querySelector('input[type="submit"]');
//submitButton.addEventListener("click", handleSignUp);
