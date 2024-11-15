const bookingF = document.getElementById("bookingForm");
const loginElement = document.getElementById("login__text");
const signupElement = document.getElementById("signup__text");
function getUserLogin() {
  return JSON.parse(localStorage.getItem("userLogin")) || null;
}
const userLogin = getUserLogin();
if (userLogin) {
  loginElement.style.display = "none";
  signupElement.style.display = "none";
}
bookingF.addEventListener("submit", function (event) {
  event.preventDefault(); // Ngăn form gửi dữ liệu
  const userLogin = getUserLogin();
  if (userLogin) {
    loginElement.style.display = "none";
    signupElement.style.display = "none";
    // Lấy dữ liệu từ form
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const time = document.getElementById("time").value;
    const date = document.getElementById("date").value;

    // Tạo đối tượng dữ liệu
    const bookingData = {
      name: name,
      phone: phone,
      time: time,
      date: date,
    };

    // Lưu vào Local Storage
    localStorage.setItem("bookingData", JSON.stringify(bookingData));

    alert("Đặt lịch thành công");
  } else {
    alert("Cần đăng nhập!");
  }
});
