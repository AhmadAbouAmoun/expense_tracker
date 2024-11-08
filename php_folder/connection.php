<?php

$connection = new mysqli(
    "localhost",
    "root",
    "",
    "expense_tracker",
);

if ($connection->connect_error) {
  echo json_encode(["status" => "error", "message" => "Error connecting with DB: " . $connection->connect_error]);
  exit();}
  else{
    echo json_encode(["status" => "success", "message" => "DB connection established"]);
  }