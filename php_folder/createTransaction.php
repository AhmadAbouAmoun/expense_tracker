<?php
include "connection.php";
$type = $_GET["type"];
$amount = $_GET["amount"];
$note=$_GET["note"];
$date=$_GET["date"];
$user_id=$_GET["user_id"];


$query = $connection->prepare("INSERT INTO transaction(type,amount,note,date,user_id) VALUES (?,?,?,?, ?)");

$query->bind_param("sissi", $type, $amount,$note,$date,$user_id); 

if ($query->execute() === TRUE) {
    $transaction_id = $connection->insert_id;
    $response = [
        "status" => "success",
        "message" => "transaction with ID $transaction_id has been added"
    ];
    echo json_encode($response);
} else {
    echo "Failed: " . $query->error; 
}

$query->close();
$connection->close(); 
exit;
