<?php

require 'database.php';

$thumb = $_POST['thumb'];
$id    = (int)$_POST['id'];

if (!$id) {
	echo 'id is required';
	return false;
}

// echo '/'.$thumb.'/'.$id.'/';

$sql = "UPDATE `users` SET thumb='".$thumb."' WHERE id='".$id."'";

$result = $connection->query($sql);

if ($result) {
	echo $result;
} else {
	echo 'ERROR';
}

?>