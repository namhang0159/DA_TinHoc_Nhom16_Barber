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

  // Lấy dữ liệu từ form
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const time = document.getElementById("time").value;
  const date = document.getElementById("date").value;

  // Kiểm tra thông tin
  if (!name || !phone || !time || !date) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  if (userLogin) {
    loginElement.style.display = "none";
    signupElement.style.display = "none";
    // Gửi dữ liệu tới server qua fetch
    const bookingData = { name, phone, time, date };
    fetch("./db/connect/php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert(data.message);
          // Xóa dữ liệu đã nhập trong form
          bookingF.reset();
        } else {
          alert("Lỗi khi đặt lịch: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại sau.");
      });
  } else {
    alert("Bạn cần đăng nhập trước khi đặt lịch!");
  }
});
