<?php

function array_all_keys_exist($source, ...$required_keys){
    foreach ($required_keys as $key) {
        if (!isset($source[$key])) {
            return false;
        }
    }
    return true;
}

function verify_post(...$required_keys) //... rest operator
{
    return array_all_keys_exist($_POST, ...$required_keys); //... spread operator
}
function verify_get(...$required_keys)
{
    return array_all_keys_exist($_GET, ...$required_keys);
}

function array_find($array, $function)
{
    return count(array_filter($array, $function))>0;
}

function redirect($url) {
    header("Location: " . $url);
    exit;
}

function is_logged_in() {
    return isset($_SESSION["user"]);
}

function is_admin() {
    return is_logged_in() && $_SESSION["user"]==="admin@admin.hu";
}

const LOGGED_IN = 1;
const NOT_LOGGED_IN = 2;
const ADMIN = 4;
function authorize($auth_type){
    if ($auth_type & LOGGED_IN && !is_logged_in()) {
        redirect("login.php");
    }
    if ($auth_type & NOT_LOGGED_IN && is_logged_in()) {
        redirect("levels.php");
    }
    if ($auth_type & ADMIN && !is_admin()) {
        redirect("levels.php");
    }
}

//no php end tag!