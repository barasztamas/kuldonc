<?php
require_once("_init.php");

authorize(NOT_LOGGED_IN);
$users_store = new FileStorage("storage/users.json");


if (verify_post("email", "password")) {
    $email = trim($_POST["email"]);
    $password = $_POST["password"];

    $user = $users_store->getItem($email);

    if (!isset($user) || !password_verify($password, $user["password"])) {
        $errors[] = "Invalid username or password";
    }

    if (count($errors)===0) {
        $_SESSION["user"] = $email;
        $_SESSION["fullname"] = $user["fullname"];
        redirect("index.php");
    }
}


?>

<?php require("partials/header.php"); ?>

<form action="login.php" method="post">
    E-mail:
    <input type="email" name="email">
    <br/>
    Password:
    <input type="password" name="password">
    <br/>
    <button type="submit">Log in</button>
</form>

<?php require("partials/footer.php"); ?>
