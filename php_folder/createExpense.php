<?php

include "connection.php";
$data = json_decode(file_get_contents("php://input"), true);

$amount =$data["amount"];
$note =$data["note"];
$userId =$data["userId"];
$date =$data["date"];

$query = $connection->prepare("INSERT INTO expenses (amount,note,user_id,date) VALUES (?,?,?,?)");
$query->bind_param("isis", $amount, $note, $userId,$date);
if( $query->execute() == TRUE ){
    $response=[
        "status"=> "success",
        "message"=> "added expense to DB"
    ];
    echo json_encode($response);
}else{
    echo "failed adding expense";
}