 <?php


 include "connection.php";
 $data = json_decode(file_get_contents("php://input"), true);

 $user_name = $data["name"];
 $budget = $data["budget"];

$query = $connection->prepare("INSERT INTO users (name, budget) VALUES (?, ?)");
$query->bind_param("si", $userName, $budget);

if($query->execute() === TRUE) {    
    $user_id = $connection->insert_id;
    $response = [
        "status"=> "success",
        "message"=> "added th user $user_name",
        "userId"=> $user_id,
    ];
    echo json_encode( $response );
}else{
    echo "Failed adding user";
}
exit;
