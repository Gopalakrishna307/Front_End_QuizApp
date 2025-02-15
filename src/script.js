// script.js

document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Clear any previous error message
    errorMessage.textContent = '';

    // Perform login action
    axios.post("http://localhost:8080/login", {
        username: username,
        password: password
    })
    .then(function(response) {
        const role = response.data;

        if (role === "admin") {
            // Redirect to admin page
            window.location.href = "/admin";
        } else if (role === "user") {
            // Redirect to user page
            window.location.href = "/user";
        } else {
            // Show error message
            errorMessage.textContent = "Invalid credentials";
        }
    })
    .catch(function(error) {
        // If the request fails, show the error message
        errorMessage.textContent = "Failed to log in";
    });
});
