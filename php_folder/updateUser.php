<?php
include "connection.php";

$id = $_GET["id"];
$user_name = $_GET["name"];
$budget = $_GET["budget"];

// Check if all parameters are provided
if (!isset($id) || !isset($user_name) || !isset($budget)) {
    die("Error: 'id', 'username', or 'budget' parameter not provided in URL.");
}

// Prepare the SQL statement with placeholders
$query = $connection->prepare("UPDATE users SET name = ?, budget = ? WHERE user_id = ?");

// Bind the parameters to the placeholders
$query->bind_param("sii", $user_name, $budget, $id); // "s" for string, "i" for integer

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
$connection->close(); // Close the connection
exit;
