const logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", () => {
  // Redirect to the homepage URL
  console.log("logout");
  window.location.href = "/signin"; // Replace with the actual homepage URL
});
