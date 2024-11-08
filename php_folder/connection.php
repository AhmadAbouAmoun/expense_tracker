<?php
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
 header("Access-Control-Allow-Headers: Content-Type, Authorization"); 
$connection = new mysqli(
    "localhost",
    "root",
    "",
    "expense_tracker_db",
);

if ($connection->connect_error) {
    die("Error connecting with DB". $connection->connect_error);
}