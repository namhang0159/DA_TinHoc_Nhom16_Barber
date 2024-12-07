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

const PORT = 3000;
app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
