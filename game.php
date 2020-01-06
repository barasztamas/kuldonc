<?php
require_once("_init.php");

if (verify_get("level_name")) {
    $level_name = $_GET["level_name"];
    $levels_store = new FileStorage("storage/levels.json");
    $level = $levels_store->getItem($level_name);
    $saved = null;
    if (is_logged_in()) {
        $user = $_SESSION["user"];
        $saved_store = new FileStorage("storage/saved.json");
        $saved = $saved_store->getFilteredContents(function($val) use ($user, $level_name) {return $val["user"]===$user && $val["level_name"]===$level_name;});
    }
    
}
if (!isset($level)){
    $errors[] = "level missing";
}

?>
<?php require("partials/header.php"); ?>

    <div id="level_name"><h1><?= $level_name ?></h1></div>
    <div id="success" hidden><h3>Adj' Isten egészségére!</h3></div>

    <div>
        <table id="board" data-level="<?= $level_name ?? "" ?>"></table>
        <br/>
        <?php if(is_logged_in()) : ?>
            <table id="saved">
                <thead>
                    <tr>
                        <th colspan="2">Save your game</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if(!empty($saved)) : ?>
                        <?php foreach(array_reverse($saved) as $val) : ?>
                            <tr data-id="<?= $val["time"] ?>">
                                <td><?= date("Y-m-d H:i:s", $val["time"]) ?></td>
                                <td><table class="preview"></table></td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>

    <script type="text/javascript">
        const levelData ="<?= addslashes(json_encode($level)) ?>";
        const savedData ="<?= addslashes(json_encode($saved)) ?>";
    </script>
    <script src="game.js" type="module"></script>
<?php require("partials/footer.php"); ?>
