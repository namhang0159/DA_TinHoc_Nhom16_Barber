function getUserLogin() {
  return JSON.parse(localStorage.getItem("userLogin")) || null;
}
const loginElement = document.getElementById("login__text");
const signupElement = document.getElementById("signup__text");
const userLoginElement = document.getElementById("userLogin");
const usernameElement = document.getElementById("usernamett");
const emailElement = document.getElementById("emailtt");
const usernameboxE = document.getElementById("usernamebox");

const userLogin = getUserLogin();
if (userLogin) {
  loginElement.style.display = "none";
  signupElement.style.display = "none";
}
function updateUI() {
  const userLogin = getUserLogin();
  if (userLogin && userLogin.username) {
    userLoginElement.style.display = "block";
    userLoginElement.innerHTML = userLogin.username;
    loginElement.style.display = "none";
    signupElement.style.display = "none";

    // Hiển thị phần trang cá nhân
    usernameElement.innerHTML = userLogin.username;
    emailElement.innerHTML = userLogin.email;
    usernameboxE.style.display = "block";
  } else {
    userLoginElement.style.display = "none";
    loginElement.style.display = "block";
    signupElement.style.display = "block";
    usernameboxE.style.display = "none";

    // Đảm bảo không hiển thị "undefined" hoặc thông tin không mong muốn
    userLoginElement.innerHTML = "";
    usernameElement.innerHTML = "";
    emailElement.innerHTML = "";
  }
}

function logout() {
  window.location.href = "index.html"; // Chuyển hướng đến trang chủ (hoặc trang đăng nhập)
  localStorage.removeItem("userLogin");
  updateUI(); // Cập nhật lại giao diện sau khi xóa thông tin người dùng
}

// Cập nhật giao diện khi trang được tải
updateUI();
