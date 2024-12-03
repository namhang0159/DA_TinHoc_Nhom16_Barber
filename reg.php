<!-- <?php
require 'db/connect.php';

if ($conn->connect_error) {
    die("Kết nối không thành công: " . $conn->connect_error);
}
if(isset($_POST['btn-booking'])){
    echo "<pre>";
    print_r($_POST);
    $name=$_POST['name'];
    $phone=$_POST['phone'];
    $time=$_POST['time'];
    $date=$_POST['date'];
}
echo"<pre>";
print_r($_POST);
$sql = "INSERT INTO `datlich` (`name`, `phone`, `time`, `date`) VALUES ('$name', '$phone', '$time', '$date')";
if($conn->query($sql)===true){
    echo "Luu thanh cong";
}
else{
    echo "Loi {$sql}".$conn->error;
}



?> -->