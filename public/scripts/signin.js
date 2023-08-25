const loginForm = document.getElementById("loginForm");
//submitButton.addEventListener("click", handleSignIn);

loginForm.addEventListener("submit", async function (event) {
  // Prevent the default form submission
  event.preventDefault();
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(
      "https://login-page-u9vv.onrender.com/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (response.ok) {
      console.log("ok");
      //const responseData = await response.json();
      //console.log(responseData);

      //const token = responseData.token;
      //console.log(token);
      window.location.href = "/user";
    } else {
      /*console.log("fail");
      console.log(response);*/
      alert("Email or password invalid");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});
