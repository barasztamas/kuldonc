<?php
require_once("_init.php");

unset($_SESSION["user"]);
unset($_SESSION["fullname"]);
redirect("index.php");
