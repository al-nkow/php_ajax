<div style="font: normal 20px Arial; color: #4d6c9e; margin: 20px;">
    <?php echo "=== dbusers connect ==="; ?>
</div>

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

// Создание таблицы
$sql = "CREATE TABLE `users` ( 
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `firstName` varchar(150) NOT NULL,
    `lastName` varchar(150) NOT NULL,
    `address` varchar(255) NOT NULL,
    `phone` varchar(20) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;";
$connection->query($sql);

// Вставка данных
$sql = "INSERT INTO `users` (`id`, `firstName`, `lastName`, `address`, `phone`) VALUES 
(NULL, 'John', 'Doe', 'New York', '700-00-00'),
(NULL, 'Petr', 'Petrov', 'Minsk', '342-44-55'),
(NULL, 'Stas', 'Ivanov', 'Kyiv', '868-77-29'),
(NULL, 'Alex', 'Smith', 'Chicago', '334-44-55');";
$connection->query($sql);

// Обнуление таблицы
// $connection->query('truncate table `users`');

// Удаление таблиц
// $connection->query('drop table `users`');

?>