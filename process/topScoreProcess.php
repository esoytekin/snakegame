<?php
function process()
{
    $function = $_POST['function'];
    if($function == "refreshTable"){
        refreshTable();
    }
}

function refreshTable()
{
    $query= "select * from S_USER where score is not null order by score desc limit 10";
    $result = mysql_query($query);
    $entry=1;
    while ($row=mysql_fetch_array($result)) {
        $setcolor = '';
        $playerSession = $row['session_id'];
        $userSession = $_SESSION['id'];
        if($playerSession==$userSession){
            $setcolor = "style='color:red;'";
        }else{
            $setcolor = "";
        }
        echo "<tr $setcolor>";
        echo "<td>".($entry++)."</td><td>".$row['name']."</td><td>".$row['score']."</td>";
        echo "</tr>";
    }
}