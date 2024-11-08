<?php
include "connection.php";
$data = json_decode(file_get_contents("php://input"), true);

$id =$data["id"];

$query = $connection->prepare("SELECT name,budget FROM users WHERE id=?");
$query->bind_param("i", $id);
$query->execute();
$result = $query->get_result();
if($result->num_rows > 0){
    $row = $result->fetch_assoc();
    echo json_encode($row);
}else{
    $response=[
        "status"=> "error",
        "message"=> "empty result",
    ];
    echo json_encode($response);
}