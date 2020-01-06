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

$game_data = json_decode($json_data);
if (!property_exists($game_data, "level_name") || !property_exists($game_data, "squares")) {
    http_response_code(400);
    print("null");
    exit();
}
$time = time();
$user = $_SESSION["user"];
$game_array = [
    "level_name"    => $game_data->level_name,
    "squares"       => $game_data->squares,
    "time"          => $time,
    "user"          => $user
];

$saved_store=new Filestorage("../storage/saved.json");
$saved_store->addItem(
            $time . "|" . $user . "|" . $game_array["level_name"],
            $game_array
        );

print(json_encode($game_array));
