/*
 * topscore.js
 */
$(function(){
fillTopScoreTable(); 
$("#btnRefreshTopScore").click(fillTopScoreTable);
function fillTopScoreTable () {
    animateTable($("#topScoreTable-body"));
   var dataString = "page=topScore&function=refreshTable"; 
   $.post("ajax.php",dataString,fillTopScoreTableCallback);
}

function fillTopScoreTableCallback (data) {
   animateTableCallback($("#topScoreTable-body"),data);
}


});
var animateTable = function(table){
    var mainTable=table.parent().parent().parent();
    mainTable.removeClass("animated fadeInUp");
    mainTable.addClass("animated fadeOutUp");
}
var animateTableCallback = function(table,html){
    var mainTable=table.parent().parent().parent();
    mainTable.removeClass("animated fadeOutUp");
    mainTable.addClass("animated fadeInUp");
    table.html(html);
}
