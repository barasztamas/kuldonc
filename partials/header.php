<!doctype html>

<head>
    <meta charset="utf-8">
    <title>Expanse Manager</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <nav>
        <ul>
            <li><a href="index.php">Demo</a></li> <!-- TODO csak ha nincs belogolva -->
            <?php if (is_logged_in()) : ?>
                <li><a href="levels.php">Levels</a></li>
                <li><a href="logout.php">Log out <?= $_SESSION["fullname"] ?></a></li>
            <?php else : ?>
                <li><a href="login.php">Log in</a></li>
                <li><a href="signup.php">Sign up</a></li>
            <?php endif; ?>

        </ul>
    </nav>
