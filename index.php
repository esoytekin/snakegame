<?php
session_start();
header('Cache-control:private');
date_default_timezone_set('Europe/Istanbul');
require_once('config.php');
require_once('functions.php');
global $jspages, $csspages;
if ($handle = opendir("module")) {
    while (false !== ($file = readdir($handle))) {
        $pattern ="/^\..*/";
//(pregMatch($file,$pattern)==0)
        if($file != "." && $file != ".."){
            if(file_exists("module/$file/_$file.php")){
                include("module/$file/_$file.php");
            }
            if(file_exists("module/$file/resources/$file.js")){
                 $jspages.="<script src='module/$file/resources/$file.js' type='text/javascript' charset='utf-8'></script>\n";
            }
            if(file_exists("module/$file/resources/$file.css")){
                 $csspages.="<link rel='stylesheet' href='module/$file/resources/$file.css' type='text/css' media='screen' title='no title' charset='utf-8'/>\n";
            }
        }
    }
    closedir($handle);
} 	
include("$Template/index.php");  	

