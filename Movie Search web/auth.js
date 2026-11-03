const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("movieFinderUser", JSON.stringify(user));

        alert("Signup successful!");

        window.location.href = "login.html";
    });
}
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const savedUser = JSON.parse(
            localStorage.getItem("movieFinderUser")
        );

        if (!savedUser) {
            alert("Please sign up first!");
            return;
        }

        if (
            email === savedUser.email &&
            password === savedUser.password
        ) {
            alert("Login successful! Welcome " + savedUser.name);

            window.location.href = "index.html";
        } else {
            alert("Invalid email or password!");
        }
    });
}
const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        window.location.href = "login.html";
    });
}