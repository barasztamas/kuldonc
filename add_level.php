<?php
require_once("_init.php");

authorize(ADMIN);

if (verify_post("level_name", "difficulty", "squares", "coordinates")) {
    $level_name = $_POST["level_name"];
    $difficulty = $_POST["difficulty"];
    $squares_data = $_POST["squares"];
    $coordinates_data = $_POST["coordinates"];
    $levels_store=new Filestorage("storage/levels.json");
    
    if ($levels_store->getItem($level_name)!==null) {
        $errors[] = "Level with this name exists already!";
    } 
    if(empty($errors)) {
        $squares = json_decode($squares_data);
        $coordinates = json_decode($coordinates_data);
        $rows = count($squares);
        $cols = count($squares[0]);
        $levels_store->addItem(
            $level_name, 
            [
                "level_name" => $level_name,
                "difficulty" => $difficulty,
                "rows" => $rows,
                "cols" => $cols,
                "coordinates" => $coordinates,
            ]
        );
    }
}
?>
<?php require("partials/header.php"); ?>

<form action="add_level.php" method="post">
    Name:
    <input type="text" name="level_name" required value="<?= empty($errors) ? '' : $level_name ?>" />
    <br/>
    Difficulty:
    <input type="number" name="difficulty" min="1" max="4" step="1" required value="<?= empty($errors) ? '' : $difficulty ?>" />
    <br/>
    Size:
    <input type="number" name="rows" id="rows" min="2" />
    *
    <input type="number" name="cols" id="cols" min="2" />
    <br/>
    <textarea name="squares" id="squares" hidden required></textarea>
    <textarea name="coordinates" id="coordinates" hidden required></textarea>
    <div>
        <table id="board"></table>
        <br/>
        <button type="submit" id="save" disabled>Save</button>
    </div>
</form>

<script type="text/javascript">
    const squaresData ="<?= empty($errors) ? '' : $squares_data ?>";
    const coordinatesData ="<?= empty($errors) ? '' : $coordinates_data ?>";
</script>
<script src="add_level.js" type="module"></script>
<?php require("partials/footer.php"); ?>
