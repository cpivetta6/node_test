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

  fetch("http://localhost:3000/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(UserData),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText}`
        );
      }
      const responseData = await response.json();

      const userId = responseData.userId;
      console.log(userId);
      if (userId) {
        window.location.href = `/user/${userId}`;
      } else {
        throw new Error("Redirect URL not found in response headers.");
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      alert("Invalid Username or Password");
    });

  //"https://test-node-server-test.onrender.com/signup
  /*
  fetch("http://localhost:3000/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(UserData),
  })
    .then((resp) => {
      console.log(resp.status, resp.statusText, resp.headers);
      console.log(resp);
      if (!resp.ok) {
        throw new Error(
          `Network response was not ok: ${resp.status} ${resp.statusText}`
        );
      }
      //return resp.json();
    })
    .then((data) => {
      console.log(data);
      const id = 13;
      window.location.href = `/user/${id}`;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      alert("invalid Username or Password");
    });*/
});
