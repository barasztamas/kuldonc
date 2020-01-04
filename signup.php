<?php
require_once("_init.php");

authorize(NOT_LOGGED_IN);

$users_store = new FileStorage("storage/users.json");

$errors = [];
if (verify_post("email", "password", "fullname")) {
    $email = trim($_POST["email"]);
    $password = $_POST["password"];
    $fullname = $_POST["fullname"];

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format";
    }
    if (array_find($users_store->getContents(), function($user)use($email){return $user["email"] === $email;})) {
        $errors[] = "User already exists";
    }
    if (strlen($password)<4) {
        $errors[] = "Password too short";
    }
    if (strlen($fullname)===0) {
        $errors[] = "Full name mustn't be empty";
    }

    if (count($errors)===0) {
        $user =[
            "email" => $email,
            "password" => password_hash($password, PASSWORD_DEFAULT),
            "fullname" => $fullname
        ];

        $users_store->addItem($email, $user);
    }
}

?>

<?php require("partials/header.php"); ?>

<form action="signup.php" method="post">
    E-mail:
    <input type="text" name="email">
    <br/>
    Password:
    <input type="password" name="password">
    <br/>
    Full name:
    <input type="text" name="fullname">
    <br/>
    <button type="submit">Sign up</button>
</form>


<?php require("partials/footer.php"); ?>
