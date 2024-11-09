<?php
include "connection.php";
$user_id=$_GET["id"];
$query=$connection->prepare("SELECT budget FROM users WHERE user_id=$user_id");
if($query->execute()){
    $budget = $query->get_result();
}
$transaction_query = $connection->prepare("SELECT SUM(amount) AS all_transactions FROM transaction WHERE user_id = ?");
$transaction_query->bind_param("i", $id);
$all_transactions=$transaction_query->execute();
$total=$all_transactions+$budget;
echo"$total";