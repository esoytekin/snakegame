<?php
function process()
{
    // code...
    $funcName = $_POST['function'];
    if($funcName=="submit"){
        submit();
    }
    if ($funcName=="saveScore") {
        saveScore();
    }
    if($funcName=="logout"){
        logout();
    }
}

function submit()
{
    $name = htmlspecialchars( $_POST['name'],ENT_QUOTES );
    $sessionId = session_id();
    $query = "insert into S_USER (name,date,session_id) values ('$name','".date('Y-m-d H:i:s')."','$sessionId')";
    mysql_query($query);
    $_SESSION['user']=$name;
    $_SESSION['id']=$sessionId;
    echo $name;
}

function saveScore()
{
    $score = $_POST['score'];
    $oldScore = 0;

    $query = "select * from S_USER where session_id = '".$_SESSION['id']."'";
    $result = mysql_query($query);
    if(mysql_num_rows($result)>0){
        $row=mysql_fetch_array($result);
        $oldScore = $row['score'];
    }

    if($score>$oldScore){
    
        $query = "update S_USER set score=$score, date='".date('Y-m-d H:i:s')."' where session_id='".$_SESSION['id']."'";
        mysql_query($query);
    }    


}

function logout(){
        session_start();
	ob_start();
	
        session_regenerate_id();
	session_destroy();
        ob_end_flush();
    
}