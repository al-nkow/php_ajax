<?php

$host = 'localhost';
$base = 'dbusers';
$user = 'root';
$pass = 'root';

function db_connect() {
	$connection = @new mysqli($host, $user, $pass, $base);

	if (mysqli_connect_errno()) {
	    die(mysqli_connect_error());
	}

	$connection->query('SET NAMES "UTF-8"');

	return $connection;
}

?>