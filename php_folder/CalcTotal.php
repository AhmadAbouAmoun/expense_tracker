<?php
include "connection.php";

$user_id = $_GET["id"];

$query = $connection->prepare("SELECT budget FROM users WHERE user_id = ?");
$query->bind_param("i", $user_id);
$query->execute();
$query->store_result();
$query->bind_result($budget);
$query->fetch(); 
$query->close();

$transaction_query = $connection->prepare("SELECT SUM(amount) AS all_transactions FROM transaction WHERE user_id = ?");
$transaction_query->bind_param("i", $user_id);
$transaction_query->execute();
$transaction_query->store_result();
$transaction_query->bind_result($all_transactions);
$transaction_query->fetch(); 
$transaction_query->close();

$total = $budget + $all_transactions;

echo $total;
?>
