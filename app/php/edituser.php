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

$firstname = trim($_POST[first_name]); // убрать лишние пробелы в начале и в конце
$lastname  = trim($_POST[last_name]);
$address   = trim($_POST[address]);
$phone     = trim($_POST[phone]);
$id        = (int)$_POST[userid]; // сделаем id числом (приведение к типу integer)

// экранируем символы, которые могут испортить sql запрос
$firstname = $connection->real_escape_string($firstname);
$lastname  = $connection->real_escape_string($lastname);
$address   = $connection->real_escape_string($address);
$phone     = $connection->real_escape_string($phone);
// $firstname = mysqli_real_escape_string($connection, $firstname); // то же самое

if (!$firstname) {
	echo 'first name is required';
	return false;
}

// echo '/'.$firstname.'/'.$lastname.'/'.$address.'/'.$phone.'/'.$id.'/';

$sql = "UPDATE `users` SET firstName='".$firstname."', lastName='".$lastname."', address='".$address."', phone='".$phone."' WHERE id='".$id."'";

if ($id)
	$result = $connection->query($sql); // результат 1 или ничего в случае ошибки

if (!$result) {
	echo 'ERROR';
} else {
	echo $result;
}

?>