document.getElementById("login-f").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Gửi yêu cầu đăng nhập đến server
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Đăng nhập thành công!");

        // Lưu token vào localStorage
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("username", username);
        // localStorage.setItem("userId", data.user_id);

        // Chuyển hướng sau khi đăng nhập
        setTimeout(() => {
          window.location.href = "./index.html";
        }, 1000);
      } else {
        const errorEl = document.getElementById("PaError");
        errorEl.style.display = "block";
        errorEl.textContent = data.message || "Đã có lỗi xảy ra.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Không thể kết nối đến server.");
    });
});
