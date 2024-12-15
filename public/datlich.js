// Kiểm tra trạng thái đăng nhập
function checkLoginStatus() {
  const token = localStorage.getItem("authToken"); // Giả sử token được lưu trong localStorage khi đăng nhập
  return token !== null; // Nếu token tồn tại, nghĩa là đã đăng nhập
}

// Hàm xử lý đặt lịch
async function handleBooking(event) {
  event.preventDefault(); // Ngăn chặn hành vi gửi form mặc định

  // Kiểm tra đăng nhập
  if (!checkLoginStatus()) {
    alert("Bạn cần đăng nhập trước khi đặt lịch!");
    window.location.href = "login.html"; // Chuyển hướng đến trang đăng nhập
    return;
  } else {
    const form = document.getElementById("bookingForm");

    // Lấy dữ liệu từ form
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // Chuyển đổi FormData thành object

    // Thêm user_id vào dữ liệu
    const token = localStorage.getItem("authToken");
    data.user_id = token; // Giả sử token chính là user_id, nếu không thì bạn cần lấy user_id từ token hoặc session

    // Gửi yêu cầu đặt lịch
    try {
      const response = await fetch("http://localhost:3000/submit-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.text();
      alert(result); // Thông báo kết quả
    } catch (err) {
      console.error("Lỗi khi gửi yêu cầu:", err);
      alert("Đặt lịch thất bại, vui lòng thử lại!");
    }
  }
}

// Gắn sự kiện submit cho form
document
  .getElementById("bookingForm")
  .addEventListener("submit", handleBooking);
