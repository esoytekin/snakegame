<?php
session_start();
header('Cache-control:private');
date_default_timezone_set('Europe/Istanbul');
require_once('config.php');
require_once('functions.php');
if(isset($_POST["page"])){
        if(file_exists("process/actions/".$_POST["page"]."Action.php"))
            include("process/actions/".$_POST["page"]."Action.php");
	include("process/".$_POST["page"]."Process.php");
}

process();
