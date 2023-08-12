function handleSignUp(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const lastname = document.getElementById("lastname").value;
  const password = document.getElementById("password").value;

  const personData = {
    name: name,
    lastname: lastname,
    password: password,
  };

  const url = window.location.pathname;

  fetch("http://localhost:3000/signup", {
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
