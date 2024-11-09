<?php

include "connection.php";

$id = $_GET["id"] ;

if($id != null){
  $query = $connection->prepare("SELECT * FROM transaction WHERE transaction_id = $id");

  $query->execute();

  $result = $query->get_result();

  if($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    echo json_encode($user);
  } else {
    echo json_encode([
      "message" => "Not Found"
    ]);
  }
} 