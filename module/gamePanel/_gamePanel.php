<?php
function gamePanel()
{
    ?>
    <div id="MainPanel" class="thin-shadowed animated fadeInUp">
        <div id="startPanel" class="thin-shadowed panelHeader animated ">
           <a href = "javascript://" id="btnStartGame">Start Game</a> 
           <?php
           if (isset($_SESSION['user'])) {
           ?>
           <a href="javascript://" id="btnLogout" title="Logout (Logged in as <?php echo $_SESSION['user'] ?>)"></a>
           <?php
           }
           ?>
        </div>
        <div id="inputNamePanel" >
        <form action="" method="POST" accept-charset="utf-8" id="frmUsername" name="frmUsername">
            <input type="text" name="txtUsername" id="txtUsername" value="" placeholder="Enter your name...">
        </form>
        </div>
        <div id="usernameBanner" class="pointCollector" style="display:none"><?php
     if (isset($_SESSION['user'])) {
        echo "Welcome ".$_SESSION['user']."!";
     }
     ?></div>
        <div id="banner" class="bannerClass">------------------------------------&nbsp;&nbsp;&nbsp;&nbsp;-</div>


    </div>
     <input type="hidden" name="userName" value="<?php
     if (isset($_SESSION['user'])) {
        echo $_SESSION['user'];
     }
     ?>" id="userName">
    <?php
}
