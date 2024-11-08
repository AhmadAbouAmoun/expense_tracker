<?php
include "connection.php";
$data = json_decode(file_get_contents("php://input"), true);

$userId =$data["userId"];

$query = $connection->prepare("SELECT id,amount,note FROM expenses WHERE user_id=?");
$query->bind_param("i", $userId);
$query->execute();
$result = $query->get_result();
if($result->num_rows > 0){
    $array =[];
    while($row = $result->fetch_assoc()){
        $array[] = $row;
    }
    echo json_encode($array);
}else{
    $response=[
        "status"=> "error",
        "message"=> "empty result",
    ];
    echo json_encode($response);
}