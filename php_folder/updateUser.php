<?php
include "connection.php";

$id = $_GET["id"];
$user_name = $_GET["name"];
$budget = $_GET["budget"];



$query = $connection->prepare("UPDATE users SET name = ?, budget = ? WHERE user_id = ?");

$query->bind_param("sii", $user_name, $budget, $id);

if ($query->execute() === TRUE) {
    $response = [
        "status" => "success",
        "message" => "User with ID $id has been updated"
    ];
    echo json_encode($response);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update user: " . $query->error]);
}

$query->close();
$connection->close();
exit;
