<?php
require_once("_init.php");

authorize(LOGGED_IN);
$levels_store=new Filestorage("storage/levels.json");
?>
<?php require("partials/header.php"); ?>

    <div>
        <table id="levels">
            <tr>
            <th>Name</th>
            <th>Difficulty</th>
            <?php if(is_admin()) : ?>
                <th>Delete level</th>
            <?php endif; ?>
            </tr>
            <?php foreach ($levels_store->getContents() as $level) : ?>
                <tr>
                    <td><a href="game.php?level_name=<?= $level["level_name"] ?>"><?= $level["level_name"] ?></a></td>
                    <td><?= $level["difficulty"] ?></td>
                    <?php if(is_admin()) : ?>
                        <td class="delete_level" data-level-name="<?= $level["level_name"] ?>">Delete</td>
                    <?php endif; ?>
                </tr>
            <?php endforeach; ?>
        </table>
    </div>

    <script src="levels.js" type="module"></script>
<?php require("partials/footer.php"); ?>
