<?php
include "connection.php";
$user_name = $_POST["username"];
$budget = $_POST["budget"];

$query = $connection->prepare("INSERT INTO users(name, budget) VALUES (?, ?)");

$query->bind_param("si", $user_name, $budget); 

if ($query->execute() === TRUE) {
    $user_id = $connection->insert_id;
    $response = [
        "status" => "success",
        "message" => "User with ID $user_id has been added"
    ];
    echo json_encode($response);
} else {
    echo "Failed: " . $query->error; 
}

$query->close();
$connection->close(); 
exit;
