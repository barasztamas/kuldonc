<?php
require_once("_init.php");

$levels_store=new Filestorage("storage/levels.json");
$success_store=new FileStorage("storage/success.json");
$user=$_SESSION["user"];
?>
<?php require("partials/header.php"); ?>

    <div>
        <table id="levels">
            <?php if(is_logged_in()) : ?>
                <tr>
                    <th>Name</th>
                    <th>Difficulty</th>
                    <th>You solved</th>
                    <th>Solved by</th>
                    <?php if(is_admin()) : ?>
                        <th>Delete level</th>
                    <?php endif; ?>
                </tr>
            <?php endif; ?>
            <?php foreach ($levels_store->getContents() as $level) : ?>
                <?php $success=$success_store->getItem($level["level_name"]); ?>
                <tr>
                    <td><a href="game.php?level_name=<?= $level["level_name"] ?>"><?= $level["level_name"] ?></a></td>
                    <?php if(is_logged_in()) : ?>
                        <td><?= $level["difficulty"] ?></td>
                        <td><?= isset($success[$user]) ? ":)" : ":(" ?></td>
                        <td><?= isset($success) ? count($success) : "0" ?></td>
                        <?php if(is_admin()) : ?>
                            <td class="delete_level" data-level-name="<?= $level["level_name"] ?>">Delete</td>
                        <?php endif; ?>
                    <?php endif; ?>
                </tr>
            <?php endforeach; ?>
        </table>
    </div>

    <script src="index.js" type="module"></script>
<?php require("partials/footer.php"); ?>
