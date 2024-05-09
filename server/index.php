<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include "DB.php";

$objDb = new DB;
$conn = $objDb->connect();


$method = $_SERVER['REQUEST_METHOD'];
$url = $_SERVER["REQUEST_URI"];
$path = parse_url($url, PHP_URL_PATH);
$last_segment = ($path);
$id = basename($path);
switch ($last_segment) {
    case '/crypto/server/register':

        $user = json_decode(file_get_contents('php://input'));

        $stmt = $conn->prepare("INSERT INTO userlist(id, username ,  email, password , createdAt) VALUES (null ,:username, :email, :password, :createdAt)");
        $username = $user->username;
        $email = $user->email;
        $password = $user->password;
        $createdAt = date('Y-m-d');
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':createdAt', $createdAt);
        if ($stmt->execute()) {
            $response = [
                'status' => 200,
                'message' => 'User created successfully',

            ];
        } else {
            $response = [
                'status' => 404,
                'message' => 'User not created'
            ];
        }

        echo json_encode($response);
        break;

    case '/crypto/server/login':
        $user = json_decode(file_get_contents('php://input'));
        $stmt = $conn->prepare("SELECT * FROM userlist WHERE email = :email AND password = :password");
        $email = $user->email;
        $password = $user->password;
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        $stmt->execute();


        $data = $stmt->fetch(PDO::FETCH_ASSOC);


        if ($data) {

            $response = [
                'status' => 200,
                'message' => 'User found',
                'data' => $data
            ];
        } else {
            $response = [
                'status' => 404,
                'message' => 'User not found'
            ];
        }
        echo json_encode($response);
        break;

    case "/crypto/server/getusers":

        $stmt = $conn->prepare("SELECT * FROM userlist");
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($data) {
            $response = [
                'status' => 200,
                'message' => 'All users',
                'data' => $data
            ];
        } else {
            $response = [
                'status' => 404,
                'message' => ' no user found'
            ];
        }
        echo json_encode($response);
        break;

    case "/crypto/server/getuser/$id":
        $sql = "SELECT * FROM userlist WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($data) {
            $response = [
                'status' => 200,
                'message' => 'User found',
                'data' => $data
            ];
        } else {
            $response = [
                'status' => 404,
                'message' => 'User not found'
            ];
        }

        echo json_encode($response);
        break;

    case "/crypto/server/deleteuser/$id":
        $stmt = $conn->prepare("DELETE FROM userlist WHERE id = :id");
        $stmt->bindParam(':id', $id);
        if ($stmt->execute()) {
            $response = [
                'status' => 200,
                'message' => 'User deleted successfully'
            ];
        } else {
            $response = [
                'status' => 404,
                'message' => 'User not deleted'
            ];
        }
        echo json_encode($response);
        break;

    case "/crypto/server/logout":
        $response = [
            'status' => 200,
            'message' => 'User logged out successfully'
        ];
        echo json_encode($response);
        break;
    
    case "/crypto/server/updateuser/$id":
        $user = json_decode(file_get_contents('php://input'));
        $stmt = $conn->prepare("UPDATE userlist SET username = :username, email = :email , password = :password , updatedAt = :updatedAt WHERE id = :id");
        $updatedAt = date('Y-m-d H:i:s');
        $username = $user->username;
        $email = $user->email;
        $password = $user->password;
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':updatedAt', $updatedAt);
        $stmt->bindParam(':id', $id);
        if ($stmt->execute()) {
            $response = [
                'status' => 200,
                'message' => 'User updated successfully',
                "data" => $user
            ];
        } else {
            $response = [
                'status' => 404,
                'message' => 'User not updated'
            ];
        }

        echo json_encode($response);
        break;
    default:
        # code...
        break;
}
