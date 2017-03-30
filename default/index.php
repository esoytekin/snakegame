<?php

/*
index.php

*/
?>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="description" content="Snake Game">
        <meta name="keywords" content="Projects,Snake Game,Snake">
        <meta name="author" content="Emrah Soytekin">
        <title>S N A K E</title>
        <script src="style/js/jquery-1.6.2.js" type="text/javascript" charset="utf-8"></script>
        <script src="style/js/master.js" type="text/javascript" charset="utf-8"></script>
        <script src="style/js/jquery.validate.js" type="text/javascript" charset="utf-8"></script>
        <link rel="stylesheet" href="style/css/master.css" type="text/css" media="screen" charset="utf-8">
        <link rel="stylesheet" href="style/css/animate-custom.css" type="text/css" media="screen" charset="utf-8">
        <?php
        echo $jspages;
        echo $csspages;
        ?>
    </head>
    <body>
<?php include_once("analyticsTracking.php") ?>
    <br>
    <div id="wrapper">
    <?php
    topScore();
    gamePanel();
    ?>
   </div> 
    </body>
</html>