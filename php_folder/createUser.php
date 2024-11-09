<?php
include "connection.php";
$user_name = $_GET["username"];
$budget = $_GET["budget"];

$query = $connection->prepare("INSERT INTO users(name, budget) VALUES (?, ?)");

$query->bind_param("si", $user_name, $budget); // "s" for string, "i" for integer

if ($query->execute() === TRUE) {
    $user_id = $connection->insert_id; // Get the last inserted ID
    $response = [
        "status" => "success",
        "message" => "User with ID $user_id has been added"
    ];
    echo json_encode($response);
} else {
    echo "Failed: " . $query->error; // Show detailed error message if failed
}

$query->close();
$connection->close(); // Close the connection
exit;
