const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Cấu hình body-parser để xử lý dữ liệu POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Kết nối MySQL
const db = mysql.createConnection({
  host: "localhost", // Thay đổi nếu MySQL của bạn không chạy trên localhost
  user: "root", // Thay đổi với tên người dùng của bạn
  password: "", // Thay đổi với mật khẩu của bạn
  database: "da-database", // Tên cơ sở dữ liệu của bạn
});

db.connect((err) => {
  if (err) throw err;
  console.log("Đã kết nối đến cơ sở dữ liệu MySQL");
});

// Định nghĩa endpoint để nhận và lưu dữ liệu đăng ký
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("Tất cả các trường đều bắt buộc!");
  }

  // SQL query để lưu dữ liệu
  const query =
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(query, [username, email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Lỗi khi lưu dữ liệu");
    }
    res.status(200).send("Đăng ký thành công");
  });
});

// Chạy server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
