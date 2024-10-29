const signup = document.getElementById("signup-form");
const usernameElement = document.getElementById("username");
const emailElement = document.getElementById("email");
const passwordElement = document.getElementById("password");
const confirmpasswordElement = document.getElementById("confirm-password");
const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmpasswordError = document.getElementById("confirmpasswordError");

const userLocal = JSON.parse(localStorage.getItem("user")) || [];
signup.addEventListener("submit", function (event) {
  event.preventDefault();
  if (passwordElement.value !== confirmpasswordElement.value) {
    confirmpasswordError.style.display = "block";
    confirmpasswordError.innerHTML = "Mật khẩu không khớp!";
  }
  const user = {
    userId: Math.ceil(Math.random() * 100000),
    username: usernameElement.value,
    email: emailElement.value,
    password: passwordElement.value,
  };
  userLocal.push(user);

  localStorage.setItem("user", JSON.stringify(userLocal));

  // chuyen huong
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
});
