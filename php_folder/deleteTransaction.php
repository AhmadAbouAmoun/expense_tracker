<?php
include "connection.php";
$id = $_GET["id"];
$query=$connection->prepare("DELETE FROM transaction WHERE  transaction_id=$id"  );
if($query->execute()==TRUE){
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