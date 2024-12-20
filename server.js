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
  const { username, name, phone, time, date } = req.body;

  if (!name || !phone || !time || !date) {
    return res.status(400).send("Thiếu thông tin đặt lịch!");
  }

  const sql =
    "INSERT INTO datlich (username, name, phone, time, date) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [username, name, phone, time, date], (err, result) => {
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

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng nhập đầy đủ thông tin!" });
  }

  // Kiểm tra tài khoản trong cơ sở dữ liệu
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn MySQL:", err);
      return res.status(500).json({ success: false, message: "Lỗi server." });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tên đăng nhập hoặc mật khẩu không chính xác.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Đăng nhập thành công!",
    });
  });
});

app.get("/get-bookings", (req, res) => {
  const username = req.query.username; // Nhận username từ query string

  let query = "SELECT * FROM datlich";
  const params = [];

  if (username) {
    query += " WHERE username = ?";
    params.push(username);
  }

  query += " ORDER BY date ASC, time ASC";

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Lỗi khi truy vấn dữ liệu:", err);
      res.status(500).json({ error: "Không thể lấy dữ liệu" });
    } else {
      res.json(results);
    }
  });
});

// API: Xóa một đặt lịch theo ID
app.delete("/delete-booking/:id", (req, res) => {
  const bookingId = req.params.id;

  const query = "DELETE FROM datlich WHERE id = ?";
  db.query(query, [bookingId], (err, result) => {
    if (err) {
      console.error("Lỗi khi xóa đặt lịch:", err);
      return res.status(500).json({ error: "Lỗi server khi xóa đặt lịch" });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy đặt lịch để xóa" });
    }

    res.status(200).json({ message: "Xóa đặt lịch thành công!" });
  });
});
app.delete("/delete-user/:id", (req, res) => {
  const userId = req.params.id;

  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Lỗi khi xóa người dùng:", err);
      return res.status(500).json({ error: "Lỗi server khi xóa người dùng" });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy người dùng để xóa" });
    }

    res.status(200).json({ message: "Xóa người dùng thành công!" });
  });
});

// API: Sửa thông tin đặt lịch theo ID
app.put("/edit-booking/:id", (req, res) => {
  const bookingId = req.params.id;
  const { name, phone, time, date } = req.body;

  if (!name || !phone || !time || !date) {
    return res.status(400).json({ error: "Thiếu thông tin để cập nhật" });
  }

  const query =
    "UPDATE datlich SET name = ?, phone = ?, time = ?, date = ? WHERE id = ?";
  db.query(query, [name, phone, time, date, bookingId], (err, result) => {
    if (err) {
      console.error("Lỗi khi cập nhật đặt lịch:", err);
      return res
        .status(500)
        .json({ error: "Lỗi server khi cập nhật đặt lịch" });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy đặt lịch để cập nhật" });
    }

    res.status(200).json({ message: "Cập nhật đặt lịch thành công!" });
  });
});
app.put("/edit-user/:id", (req, res) => {
  const userId = req.params.id;
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Thiếu thông tin cần sửa" });
  }

  const query =
    "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?";
  db.query(query, [username, email, password, userId], (err, result) => {
    if (err) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    res.status(200).json({ message: "Cập nhật thông tin thành công!" });
  });
});

app.get("/get-users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy danh sách người dùng:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    res.json(results);
  });
});
app.put("/edit-user/:id", (req, res) => {
  const userId = req.params.id;
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Thiếu thông tin cần sửa" });
  }

  const query =
    "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?";
  db.query(query, [username, email, password, userId], (err, result) => {
    if (err) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    res.status(200).json({ message: "Cập nhật thông tin thành công!" });
  });
});

const PORT = 3000;
app.listen;
app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
