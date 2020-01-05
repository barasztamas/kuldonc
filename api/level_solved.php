<?php
require_once("../_init.php");

header("Content-Type: application/json");

if(!is_logged_in()) {
    http_response_code(403);
    print("null");
    exit();
}
  
if (!verify_get("level_name")) {
    http_response_code(400);
    print("null");
    exit();
}

$level_name = $_GET["level_name"];
$user = $_SESSION["user"];
$success_store=new Filestorage("../storage/success.json");
$level_success=$success_store->getItem($level_name);
$level_success[$user]=1;
$success_store->addItem($level_name, $level_success);

print("\"OK\"");
