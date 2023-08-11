document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form data
  const formData = new FormData(event.target);

  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Send form data to the server using AJAX
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/submit", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("Form submitted successfully.");
    }
  };
  xhr.send(JSON.stringify(data));
});
