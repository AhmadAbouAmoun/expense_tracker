<?php
include "connection.php";
$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];

$expenseQuery = $connection->prepare("DELETE FROM expenses WHERE user_id = ?");
$expenseQuery->bind_param("i", $id);
$expenseResult = $expenseQuery->execute();

if (!$expenseResult) {
    $response = [
        "status" => "error",
        "message" => "Failed to delete expenses for user with id $id"
    ];
    echo json_encode($response);
    exit;
}

$incomeQuery = $connection->prepare("DELETE FROM incomes WHERE user_id = ?");
$incomeQuery->bind_param("i", $id);
$incomeResult = $incomeQuery->execute();

if (!$incomeResult) {
    $response = [
        "status" => "error",
        "message" => "Failed to delete incomes for user with id $id"
    ];
    echo json_encode($response);
    exit;
}

$userQuery = $connection->prepare("DELETE FROM users WHERE id = ?");
$userQuery->bind_param("i", $id);
$userResult = $userQuery->execute();

if ($userResult) {
    $response = [
        "status" => "success",
        "message" => "Successfully deleted user with id $id and all related data"
    ];
} else {
    $response = [
        "status" => "error",
        "message" => "the deletion of the user of $id failed"
    ];
}

echo json_encode($response);

$expenseQuery->close();
$incomeQuery->close();
$userQuery->close();

