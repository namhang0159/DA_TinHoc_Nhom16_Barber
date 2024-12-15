// Kiểm tra trạng thái đăng nhập
const loginButton = document.getElementById("login__text");
const signupButton = document.getElementById("signup__text");
const usernameBox = document.getElementById("usernamebox");
const userLogin = document.getElementById("userLogin");

// Giả lập trạng thái đăng nhập
const user = JSON.parse(localStorage.getItem("user")); // Lấy thông tin người dùng từ LocalStorage

if (user && user.username) {
  // Ẩn các nút Đăng nhập và Đăng ký
  loginButton.style.display = "none";
  signupButton.style.display = "none";

  // Hiển thị thông tin username
  usernameBox.style.display = "block";
  userLogin.innerHTML = user.username;
} else {
  // Hiển thị nút Đăng nhập và Đăng ký
  loginButton.style.display = "inline-block";
  signupButton.style.display = "inline-block";

  // Ẩn hộp username
  usernameBox.style.display = "none";
}

// Xử lý đăng nhập (giả lập)
function login(username) {
  const user = { username };
  localStorage.setItem("user", JSON.stringify(user)); // Lưu trạng thái đăng nhập
  window.location.reload(); // Tải lại trang để cập nhật giao diện
}

// Xử lý đăng xuất
function logout() {
  localStorage.removeItem("user"); // Xóa trạng thái đăng nhập
  window.location.reload(); // Tải lại trang để cập nhật giao diện
}

// Thêm sự kiện vào các nút (giả lập đăng nhập/đăng xuất)
document.getElementById("login__text").addEventListener("click", () => {
  login("Tên người dùng"); // Thay bằng username thực tế khi triển khai
});

document.getElementById("userLogin").addEventListener("click", logout);
