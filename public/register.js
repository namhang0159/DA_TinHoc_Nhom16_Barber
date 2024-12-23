document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("signup-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      // Kiểm tra xác nhận mật khẩu
      if (password !== confirmPassword) {
        alert("Mật khẩu không khớp");
        return;
      }

      const data = {
        username,
        email,
        password,
      };

      // Gửi dữ liệu đăng ký đến server
      fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Dăng ký thành công!");
            setTimeout(() => {
              window.location.href = "./login.html";
            }, 2000);
          } else {
            alert(
              "Đã có lỗi xảy ra, vui lòng kiểm tra tên và email và thử lại."
            );
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
});
