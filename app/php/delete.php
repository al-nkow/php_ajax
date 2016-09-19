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


$sql = "delete from `users` where (id = ".$_POST['id'].")";
$connection->query($sql);

echo 'delete an item with id = '.$_POST['id'];

?>