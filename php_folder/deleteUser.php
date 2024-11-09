<?php
include "connection.php";
if (!isset($_GET["id"])) {
    die("Error: 'id' parameter not provided.");
}

$id = $_GET["id"];
$transactions_query=$connection->prepare("DELETE FROM transaction WHERE  user_id=$id "  );
if($transactions_query->execute()==TRUE){
    $response=[
        "status"=>"success",
        "message"=>"all transactions of user id=$id have been deleted"
    ];
    echo json_encode($response);
}
else{
    echo"failed";
    exit;
}
$user_query=$connection->prepare("DELETE FROM users WHERE  user_id=$id ");
$user_result=$user_query->execute();
if($user_result==TRUE){
    $response = [
        "status" => "success",
        "message" => "Successfully deleted user with id $id and all related data"
    ];}else {
        $response = [
            "status" => "error",
            "message" => "the deletion of the user of $id failed"
        ];
    }
    echo json_encode($response);
