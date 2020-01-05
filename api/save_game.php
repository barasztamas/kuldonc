<?php
require_once("../_init.php");

header("Content-Type: application/json");

if(!is_logged_in()) {
    http_response_code(403);
    print("null");
    exit();
}

$json_data = file_get_contents("php://input");

if (!isValidJSON($json_data)) {
    http_response_code(400);
    print("null");
    exit();
}

$time = time();
$game_data = json_decode($json_data);
$level_name = $game_data["level_name"];
$squares = $game_data["squares"];
$user = $_SESSION["user"];

$saved_store=new Filestorage("../storage/saved.json");
$saved_store->addItem(
            $time,
            [
                time => $time,
                user => $user,
                level_name => $level_name,
                squares => $squares,
            ]
        );

print($time);
