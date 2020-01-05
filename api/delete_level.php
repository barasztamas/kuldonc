<?php
require_once("../_init.php");

header("Content-Type: application/json");

if(!is_admin()) {
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
$levels_store=new Filestorage("../storage/levels.json");
$levels_store->deleteItem($level_name);


print("\"OK\"");
