<?php
require_once("_init.php");

authorize(LOGGED_IN);
$levels_store=new Filestorage("storage/levels.json");
?>
<?php require("partials/header.php"); ?>
    <div>
        <table>
            <tr>
            <th>Name</th>
            <th>Difficulty</th>
            </tr>
            <?php foreach ($levels_store->getContents() as $level) : ?>
                <tr>
                    <td><?= $level["name"] ?></td>
                    <td><?= $level["difficulty"] ?></td>
                </tr>
            <?php endforeach; ?>
        </table>
    </div>
<?php require("partials/footer.php"); ?>