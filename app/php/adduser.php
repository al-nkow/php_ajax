<?php

$host = 'localhost';
$base = 'dbusers';
$user = 'root';
$pass = 'root';

$connection = @new mysqli($host, $user, $pass, $base);

if (mysqli_connect_errno()) {
    die(mysqli_connect_error());
}

$connection->query('SET NAMES "UTF-8"');

$firstname = trim($_POST[first_name]);
$lastname  = trim($_POST[last_name]);
$address   = trim($_POST[address]);
$phone     = trim($_POST[phone]);
$firstname = $connection->real_escape_string($firstname);
$lastname  = $connection->real_escape_string($lastname);
$address   = $connection->real_escape_string($address);
$phone     = $connection->real_escape_string($phone);

$sql = "INSERT INTO `users` (`id`, `firstName`, `lastName`, `address`, `phone`) VALUES 
(NULL, '".$firstname."', '".$lastname."', '".$address."', '".$phone."')";

$result = $connection->query($sql); // результат 1 или ничего в случае ошибки

if ($result) {
	echo $result;
} else {
	echo 'ERROR';
}

?>