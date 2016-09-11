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

$sql = "INSERT INTO `users` (`id`, `firstName`, `lastName`, `address`, `phone`) VALUES 
(NULL, '".$_POST[first_name]."', '".$_POST[last_name]."', '".$_POST[address]."', '".$_POST[phone]."')";

$result = $connection->query($sql); // результат 1 или ничего в случае ошибки

if (!$result) {
	echo 'ERROR';
} else {
	echo $result;
}

// echo $_POST[first_name].', '.$_POST[last_name].', '.$_POST[address].', '.$_POST[phone]

?>