const login = document.getElementById("login-f");
const usernameElement = document.getElementById("username");
const passwordElement = document.getElementById("password");
const Error = document.getElementById("PaError");
login.addEventListener("submit", function (event) {
  event.preventDefault();

  const userLocal = JSON.parse(localStorage.getItem("user")) || [];

  const findUser = userLocal.find(
    (user) =>
      user.username === usernameElement.value &&
      user.password === passwordElement.value
  );
  if (!findUser) {
    Error.style.display = "block";
  } else {
    window.location.href = "index.html";
  }
  localStorage.setItem("userLogin", JSON.stringify(findUser));
});
