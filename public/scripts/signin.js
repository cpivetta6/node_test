const loginForm = document.getElementById("loginForm");
//submitButton.addEventListener("click", handleSignIn);

loginForm.addEventListener("submit", function (event) {
  // Prevent the default form submission
  event.preventDefault();
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const UserData = {
    email: email,
    password: password,
  };

  const url = window.location.pathname;

  //"https://test-node-server-test.onrender.com/signup

  fetch("http://localhost:3000/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(UserData),
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

      window.location.href = "/user";
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      alert("invalid Username or Password");
    });
});
