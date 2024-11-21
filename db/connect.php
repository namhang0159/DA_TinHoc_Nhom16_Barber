<?php
$host ="localhost";
$username="root";
$password="";
$dbname="da-database";

$conn =new mysqli($host,$username,$password,$dbname);

if($conn->connect_error){
    die("ket noi khong thanh cong".$conn->connect_error);
}
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data["name"], $data["phone"], $data["time"], $data["date"])) {
    $name = $conn->real_escape_string($data["name"]);
    $phone = $conn->real_escape_string($data["phone"]);
    $time = $conn->real_escape_string($data["time"]);
    $date = $conn->real_escape_string($data["date"]);

    // Thực hiện câu lệnh SQL để lưu dữ liệu
    $sql = "INSERT INTO bookings (name, phone, time, date) VALUES ('$name', '$phone', '$time', '$date')";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Đặt lịch thành công"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Lỗi: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Dữ liệu không hợp lệ"]);
}

// Đóng kết nối
$conn->close();
?>