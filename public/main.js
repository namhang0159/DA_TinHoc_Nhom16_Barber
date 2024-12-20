// // Kiểm tra trạng thái đăng nhập
// const loginButton = document.getElementById("login__text");
// const signupButton = document.getElementById("signup__text");
// const usernameBox = document.getElementById("usernamebox");
// const userLogin = document.getElementById("userLogin");

// function checkLoginStatus() {
//   const token = localStorage.getItem("authToken"); // Lấy token từ localStorage
//   return token !== null; // Nếu token tồn tại, nghĩa là đã đăng nhập
// }
// // Giả lập trạng thái đăng nhập
// if (checkLoginStatus()) {
//   // Ẩn các nút Đăng nhập và Đăng ký
//   loginButton.style.display = "none";
//   signupButton.style.display = "none";

//   // Hiển thị thông tin username
//   usernameBox.style.display = "block";
//   userLogin.innerHTML = "Trang cá nhân";

//   // // Xử lý đăng nhập (giả lập)
//   // function login(username) {
//   //   const user = { username };
//   //   localStorage.setItem("user", JSON.stringify(user)); // Lưu trạng thái đăng nhập
//   //   window.location.reload(); // Tải lại trang để cập nhật giao diện
//   // }

//   // Xử lý đăng xuất
//   function logout() {
//     // Xóa toàn bộ dữ liệu liên quan đến trạng thái đăng nhập
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("username");
//     localStorage.removeItem("user");

//     // Tùy chọn: Chuyển hướng đến trang đăng nhập
//     alert("Bạn đã đăng xuất thành công!");
//     window.location.href = "./login.html";
//   }

//   // Thêm sự kiện vào các nút (giả lập đăng nhập/đăng xuất)
//   document.getElementById("login__text").addEventListener("click", () => {
//     login("Người dùng"); // Thay bằng username thực tế khi triển khai
//   });

//   document.getElementById("userLogin").addEventListener("click", logout);
// } else {
//   // Hiển thị nút Đăng nhập và Đăng ký
//   loginButton.style.display = "inline-block";
//   signupButton.style.display = "inline-block";

//   // Ẩn hộp username
//   usernameBox.style.display = "none";
// }

// Kiểm tra trạng thái đăng nhập
const loginButton = document.getElementById("login__text");
const signupButton = document.getElementById("signup__text");
const usernameBox = document.getElementById("usernamebox");
const userLogin = document.getElementById("userLogin");

function checkLoginStatus() {
  const token = localStorage.getItem("authToken"); // Lấy token từ localStorage
  return token !== null; // Nếu token tồn tại, nghĩa là đã đăng nhập
}

// Giả lập trạng thái đăng nhập
if (checkLoginStatus()) {
  // Ẩn các nút Đăng nhập và Đăng ký
  loginButton.style.display = "none";
  signupButton.style.display = "none";

  // Hiển thị thông tin username
  usernameBox.style.display = "block";
  userLogin.innerHTML = "Trang cá nhân"; // Hiển thị "Trang cá nhân" khi đăng nhập

  // Xử lý đăng xuất
  function logout() {
    // Xóa toàn bộ dữ liệu liên quan đến trạng thái đăng nhập
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("user");
    window.location.reload();
  }

  // Sự kiện cho nút đăng xuất
  userLogin.addEventListener("click", logout);
} else {
  // Hiển thị nút Đăng nhập và Đăng ký
  loginButton.style.display = "inline-block";
  signupButton.style.display = "inline-block";

  // Ẩn hộp username
  usernameBox.style.display = "none";

  // Sự kiện cho nút đăng nhập (giả lập)
  loginButton.addEventListener("click", () => {
    window.location.href = "./login.html"; // Chuyển hướng tới trang đăng nhập (hoặc hiển thị form đăng nhập nếu cần)
  });

  signupButton.addEventListener("click", () => {
    window.location.href = "./signup.html"; // Chuyển hướng tới trang đăng ký nếu cần
  });
}
