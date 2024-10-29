const userLogin = JSON.parse(localStorage.getItem("userLogin")) || {};
const loginElement = document.getElementById("login__text");
const signupElement = document.getElementById("signup__text");
const userLoginElement = document.getElementById("userLogin");
const usernameElement = document.getElementById("username");
const emailElement = document.getElementById("email");
if (userLogin) {
  userLoginElement.style.display = "block";
  userLoginElement.innerHTML = userLogin.username;
  loginElement.style.display = "none";
  signupElement.style.display = "none";
  //   phần trang cá nhân
  usernameElement.innerHTML = userLogin.username;
  emailElement.innerHTML = userLogin.email;
} else {
  userLoginElement.innerHTML = "";
  usernameElement.innerHTML = "";
  emailElement.innerHTML = "";
  userLoginElement.style.display = "none";
  loginElement.style.display = "block";
  signupElement.style.display = "block";
}
function logout() {
  localStorage.removeItem("userLogin");
  window.location.href = "index.html";
}
