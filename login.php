<?php
require_once("_init.php");

authorize(NOT_LOGGED_IN);
$users_store = new FileStorage("storage/users.json");


$errors = [];

function is_user_ok($email, $password)
{
    return function($user) use ($email, $password){
        return  $user["email"] === $email &&
                password_verify($password, $user["password"]);
    };
}

if (verify_post("email", "password")) {
    $email = trim($_POST["email"]);
    $password = $_POST["password"];

    $users = $users_store->getContents();

    if (!array_find($users, is_user_ok($email, $password))) {
        $errors[] = "Invalid username or password";
    }

    if (count($errors)===0) {
        $_SESSION["user"] = $email;
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

<?php foreach ($errors as $error): ?>
    <div><?= $error ?></div>
<?php endforeach; ?>


<?php require("partials/footer.php"); ?>
