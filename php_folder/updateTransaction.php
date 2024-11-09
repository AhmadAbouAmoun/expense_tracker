<?php
include "connection.php";
$type = $_GET["type"];
$amount = $_GET["amount"];
$note=$_GET["note"];
$date=$_GET["date"];
$user_id=$_GET["user_id"];
$transaction_id=$_GET["id"];

$query=$connection->prepare("UPDATE transaction SET type=? ,amount=? ,note=? ,date=? ,user_id=? WHERE transaction_id=?");
$query->bind_param("sissii",$type,$amount,$note,$date,$user_id,$transaction_id);
if ($query->execute() === TRUE) {
    $response = [
        "status" => "success",
        "message" => "User with ID $transaction_id has been updated"
    ];
    echo json_encode($response);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update user: " . $query->error]);
}

$query->close();
$connection->close();
exit;
