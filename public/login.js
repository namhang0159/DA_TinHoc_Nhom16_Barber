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
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

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
    });
  }
  // // Lấy dữ liệu từ form
  // const form = document.getElementById("bookingForm");
  // const formData = new FormData(form);
  // const data = Object.fromEntries(formData.entries()); // Chuyển đổi FormData thành object

  // // Kiểm tra dữ liệu đầu vào
  // if (!data.name || !data.phone || !data.date || !data.time) {
  //   alert("Vui lòng nhập đầy đủ thông tin!");
  //   return;
  // }

  // // Gửi dữ liệu đến server
  // try {
  //   const response = await fetch("http://localhost:3000/submit-booking", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   if (response.ok) {
  //     const result = await response.json(); // Giả sử server trả JSON
  //     alert(result.message || "Đặt lịch thành công!");
  //     form.reset(); // Xóa dữ liệu trong form sau khi đặt lịch
  //   } else {
  //     const error = await response.json();
  //     alert(error.message || "Đặt lịch thất bại, vui lòng thử lại!");
  //   }
  // } catch (error) {
  //   console.error("Lỗi khi gửi yêu cầu:", error);
  //   alert("Có lỗi xảy ra. Vui lòng thử lại sau!");
  // }
}

// Gắn sự kiện submit cho form
document
  .getElementById("bookingForm")
  .addEventListener("submit", handleBooking);
