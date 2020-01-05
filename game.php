<?php
require_once("_init.php");

authorize(LOGGED_IN);

if (verify_get("level_name")) {
    $level_name = $_GET["level_name"];
    $levels_store = new FileStorage("storage/levels.json");
    $level = $levels_store->getItem($level_name);
}
if (!isset($level)){
    $errors[] = "level missing";
    //redirect("levels.php");
}

?>
<?php require("partials/header.php"); ?>

    <div id="level_name"><h1><?= $level_name ?></h1></div>
    <div id="success" hidden><h3>Adj' Isten egészségére!</h3></div>

    <div>
        <table id="board" data-level="<?= $level_name ?? "" ?>"></table>
    </div>

    <script type="text/javascript">
        const levelData ="<?= addslashes(json_encode($level)) ?>";
    </script>
    <script src="game.js" type="module"></script>
<?php require("partials/footer.php"); ?>
