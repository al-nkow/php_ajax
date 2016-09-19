<?php
// require_once('database.php');

$host = 'localhost';
$base = 'dbusers';
$user = 'root';
$pass = 'root';

$connection = @new mysqli($host, $user, $pass, $base);

if (mysqli_connect_errno()) {
    die(mysqli_connect_error());
}

$connection->query('SET NAMES "UTF-8"');

// $sql = 'SELECT * FROM `users` ORDER BY `id` DESC';
$sql = 'SELECT * FROM `users`';
$result = $connection->query($sql);
$records = $result->fetch_all(MYSQLI_ASSOC);

header("Content-Type: application/json");
echo json_encode($records);
exit;

?>