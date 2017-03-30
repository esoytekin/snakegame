<?php
function mysql_baglanti()
{
	 global $HostName,$UserName,$Password,$DatabaseName;
	 $baglanti= mysql_connect($HostName,$UserName,$Password);
	 mysql_select_db($DatabaseName,$baglanti) or die ("<h3 style='height: 40px; text-align:center; line-height: 40px; color: red; border: solid 1px red;'>Check Your Database Connection</h3><p>Open a terminal session and enter 'mysqlExp' command..</p>");
	 mysql_query("SET NAMES 'utf8'"); 
	 mysql_query("SET CHARACTER SET utf8"); 
	 mysql_query("SET COLLATION_CONNECTION = 'utf8_turkish_ci'");
	 return $baglanti;
}
$baglati=mysql_baglanti();



function redirect($location){
?>
<script>
    window.location="<?php $location ?>";
</script>
<?php
}

function addResources(){
    global $jspages,$csspages;
    return $csspages.$jspages;

}


/*function write2File($str){
 $myFile1 = "1.txt";
 $fh1 = fopen($myFile1, 'a') or die($str);
 $stringData = $str;
 fwrite($fh1, $stringData);
 fclose($fh1);
}*/
