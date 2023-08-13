function handleSignUp(event) {
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
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", handleSignUp);
