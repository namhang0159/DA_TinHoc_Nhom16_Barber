const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();

// Middleware
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// Kết nối MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "da-database",
});

db.connect((err) => {
  if (err) return console.error("Kết nối MySQL thất bại:", err);
  console.log("Kết nối MySQL thành công!");
});
app.get("/", (req, res) => {
  res.send("Trang chính hoạt động!");
});
app.post("/submit-booking", (req, res) => {
  const { name, phone, time, date } = req.body;

  if (!name || !phone || !time || !date) {
    return res.status(400).send("Thiếu thông tin đặt lịch!");
  }

  const sql =
    "INSERT INTO datlich (name, phone, time, date) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, phone, time, date], (err, result) => {
    if (err) {
      console.error("Lỗi khi thực hiện query:", err);
      return res.status(500).send("Đã xảy ra lỗi!");
    }
    res.send("Đặt lịch thành công!");
  });
});

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Thiếu thông tin!" });
  }

  // Kiểm tra xem username hoặc email đã tồn tại hay chưa
  const checkUserQuery = "SELECT * FROM users WHERE username = ? OR email = ?";
  db.query(checkUserQuery, [username, email], (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Lỗi kiểm tra tài khoản." });
    }

    if (results.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Tài khoản hoặc email đã tồn tại!" });
    }

    // Nếu không tồn tại, tiến hành lưu vào database
    const query =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(query, [username, email, password], (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: "Lỗi khi lưu dữ liệu." });
      }
      res.status(200).json({ success: true, message: "Đăng ký thành công!" });
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
