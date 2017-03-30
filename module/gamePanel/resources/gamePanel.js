
// second javascript file
//
//
var MainPanelHeight= "500px";
var MainPanelWidth = "500px";
var DIRECTION;
var KEYLOCK;
var MICE_EAT;
var STATUS = 0; // GAME STATUS if this variable is 0 game continues, if -1 game finishes
var TOTAL_POINTS;
var BANNER_TEXT = "------------------------------------&nbsp;&nbsp;&nbsp;&nbsp;-";
var SNAKE_SIZE = 40;
var runThread;
var runMouse;
var animatedCssList = "wobble fadeInUp";
var animatedCssList2 = "shake bounce bounceIn bounceInUp bounceInLeft swing wobble wiggle flip flipInX flipInY fadeIn fadeInUp fadeInDown";
var snakeSpeed=20;
var mouseSpeed =200;

$(function(){

    var snakeList;
    var mice;

    $(document).keydown(changeDirection);

    $("#btnStartGame").click(checkName);

    $("#btnLogout").click(logout);
function initValues () {
    DIRECTION = "POSX";
    MICE_EAT=false;
    STATUS = 0;  
    TOTAL_POINTS = 0;
    //TODO: set banner to total points, change banner class
    setPointBanner();
    if ($("#inputNamePanel").is(":visible")) {
         $("#inputNamePanel").slideUp();
    };
    clearMainPanelAnimations();
}

function startClicked () {
    initValues();
    $("#startPanel").slideUp();    
    putSnake(SNAKE_SIZE);

    putMice();


    runThread = setInterval(runSnake,snakeSpeed);
    runMouse = setInterval(runMouseFunction,mouseSpeed);
}
//{{{ function putSnake (length) { // body...  }
function putSnake (length) {
    snakeList = new Array();
    for (var i = 0; i < length; i++) {
        var snakePanel = createSnakePanel();
        
        var locationY = getPanelScale(MainPanelHeight)/2-getPanelScale($(snakePanel).css("height"));
        var locationX = i * getPanelScale($(snakePanel).css("width"));
        snakePanel.style.left = locationX;
        snakePanel.style.top = locationY;
        snakeList.push(snakePanel);
        document.getElementById("MainPanel").appendChild(snakePanel);
        $(snakePanel).addClass("thin-shadowed");

    };
}
//}}}

function putSnakeList () {

    for (var i = 0; i < snakeList.length; i++) {
        var snakePanel = snakeList[i];
        document.getElementById("MainPanel").appendChild(snakePanel);
    };
}

function putElement (element) {
    document.getElementById("MainPanel").appendChild(element);
    $(element).addClass("thin-shadowed");
}
function createSnakePanel () {//{{{
    var snakePanel = document.createElement('div');
    snakePanel.style.width = "10px";
    snakePanel.style.height = "10px";
    snakePanel.style.backgroundColor = "#ccc";
    snakePanel.style.position = "absolute";
    return snakePanel;


    
}//}}}

function putMice () {//{{{
    var xAxis = Math.floor(Math.random()*49)*10;
    var yAxis = Math.floor(Math.random()*49)*10;
    if(!mice){
        mice = createSnakePanel();
        mice.id = "mice";

    }
    var possible = true;

    for (var i = 0; i <snakeList.length; i++) {
        var snake = snakeList[i];
        var snakePosX = getPanelScale(snake.style.left);
        var snakePosY = getPanelScale(snake.style.top);
        if ((xAxis == snakePosX) && (yAxis == snakePosY)) {
            possible = false;
        };
 
    };
    if (possible) {
        mice.style.left=xAxis;
        mice.style.top=yAxis;
        mice.style.backgroundColor = "red";
        document.getElementById("MainPanel").appendChild(mice);
        $(mice).addClass("thin-shadowed");
        if(!$(mice).is(":visible"))
        {
            $(mice).fadeIn();
        }
    }else {
        putMice();
    };
}//}}}

function getPanelScale (scale) {
    return parseInt(scale.substring(0,scale.length-2));
}


function runSnake(){
    KEYLOCK = false;
    if(STATUS == -1){
        finishGame();
    }
    var locationX =0;
    var locationY =0;
    for (var i = snakeList.length-1; i >= 0 ; i--) {
        var snake = snakeList[i];
        if (i==snakeList.length-1) {
            var locationX = getPanelScale( snake.style.left );
            var locationY = getPanelScale( snake.style.top );
            var loc       = getLocation(locationX,locationY,10,10);
            if(terminateIfCrashed()){
                break;
            }
            // terminate if crashed
            // mice eat
            if (getPanelScale(mice.style.left) == loc[0] && getPanelScale(mice.style.top)== loc[1]) {
                MICE_EAT = true;
            };
            snake.style.left = loc[0];
            snake.style.top  = loc[1];
        }else{
            var locationTempX = snake.style.left;
            var locationTempY = snake.style.top;
            snake.style.left  = locationX;
            snake.style.top   = locationY;
            locationX         = locationTempX;
            locationY         = locationTempY;
        };

        if (MICE_EAT && ( i==0 )) {
            eatMiceAndGenerateOne(locationX,locationY);
        
        };
    };
}

function runMouseFunction () {
    var newLocationDirection = Math.floor(Math.random()*4);
    var mouseLeft = getPanelScale( mice.style.left );
    var mouseTop  = getPanelScale( mice.style.top );
    var mouseWidth = getPanelScale( mice.style.width );

    switch ( newLocationDirection )
    {
        case 0://left
            mouseLeft-=mouseWidth; 
            break;
        case 1://right
            mouseLeft+=mouseWidth;
            break;
        case 2://top
            mouseTop-=mouseWidth;
            break;
        case 3://down
            mouseTop+=mouseWidth;
            break;
    }
    if(mouseLeft<0)
        mouseLeft = 500-mouseWidth;
    if(mouseLeft>=500)
        mouseLeft = 0;
    if(mouseTop<0)
        mouseTop=500-mouseWidth;
    if(mouseTop>=500)
        mouseTop  = 0;
    if(searchSnakeForMouse(mouseLeft,mouseTop)){
        runMouseFunction();
    }else{
        mice.style.left = mouseLeft;
        mice.style.top = mouseTop;
    }
}

function searchSnakeForMouse (mouseLeft,mouseTop) {
    for (var i = 0; i < snakeList.length; i++) {

        var snake = snakeList[i];
        var snakeLeft = getPanelScale(snake.style.left);
        var snakeTop = getPanelScale(snake.style.top);
        if(snakeLeft==mouseLeft && snakeTop == mouseTop)
            return true;
    };

    return false;
}



function getLocation (x,y,width,height) {
    var result = new Array();
    if (DIRECTION == "POSX") {
        var locationX = x+width;
        if (locationX>=500) {
            locationX = 0;
        };
        result[result.length] = locationX;
        result[result.length] = y;
    
    }else if (DIRECTION == "NEGX") {
        var locationX = x-width;
        if (locationX<0) {
            locationX = 500-width;
        };
        result[result.length] = locationX;
        result[result.length] = y;
    
    }else if (DIRECTION == "POSY") {
        var locationY = y-height;
        if (locationY<0) {
            locationY = 500-height;
        };
        result[result.length] = x;
        result[result.length] = locationY;
    
    }else if (DIRECTION == "NEGY") {
    
        var locationY = y+height;
        if (locationY>=500) {
            locationY = 0;
        };
        result[result.length] = x;
        result[result.length] = locationY;
    };

    return result;
}


function changeDirection (e) {
    if (KEYLOCK) {
        return;
    };

    KEYLOCK = true;

    if (e.keyCode == 38) {
        if (DIRECTION.search("Y")==-1) {
            DIRECTION = "POSY";
        };
    
    }else if (e.keyCode == 37){
        if (DIRECTION.search("X")==-1) {
            DIRECTION = "NEGX";
        };
        
    
    }else if (e.keyCode == 40){
        if (DIRECTION.search("Y")==-1) {
            DIRECTION = "NEGY";
        };
    
    }else if (e.keyCode == 39){
        if (DIRECTION.search("X")==-1) {
            DIRECTION = "POSX";
        };
    
    };


}


function eatMiceAndGenerateOne (locationX, locationY) {
    var tail = createSnakePanel();
    tail.style.left=locationX;
    tail.style.top=locationY;
    putElement(tail);
    var tempSnakeList = new Array();
    tempSnakeList.push(tail);
    for (var i = 0; i < snakeList.length; i++) {
        tempSnakeList.push(snakeList[i]);
    };
    snakeList = new Array();

    for (var i = 0; i < tempSnakeList.length; i++) {
        snakeList.push(tempSnakeList[i]);
    };

    MICE_EAT = false;
    putMice();
    $(banner).slideUp(function(){
    
    $(banner).html(++TOTAL_POINTS).fadeIn();
    });

}
function terminateIfCrashed () {
    var headIndex = snakeList.length-1;
    var snakeHead = snakeList[headIndex];
    for (var i = 0; i < headIndex; i++) {
        var snakePanel = snakeList[i];
        if (isInSamePosition(snakeHead,snakePanel)) {
            STATUS = -1;
            return true
        };

    };
    return false;
}

function isInSamePosition (panel1,panel2) {
    if (( panel1.style.left==panel2.style.left ) && ( panel1.style.top == panel2.style.top )) {
    
        return true;
    };
    return false;
}

function finishGame () {
    clearInterval(runThread);
    clearInterval(runMouse);
    hideSnakeAndMice();
    showStartMenu();
    setInitBanner();
    saveScore();
    fillTopScoreTable();
    animateMainPanel();
    reloadStartPanel();
}

function reloadStartPanel () {
    var startPanel = $("#startPanel");
    var startPanelHtml = "";
    var username = $("#userName").val();
    startPanelHtml+="<a href = 'javascript://' id='btnStartGame'>Start Game</a>";
    startPanelHtml+="<a href='javascript://' id='btnLogout' title='Logout (Logged in as "+username+")'></a>";
    startPanel.html(startPanelHtml);
    $("#btnStartGame").click(checkName);
    $("#btnLogout").click(logout);
    
}

function hideSnakeAndMice () {
    for (var i = 0; i < snakeList.length; i++) {
        snakeList[i].style.display="none";
    };
    $("#mice").fadeOut();
}
function showStartMenu () {
    $("#startPanel").slideDown();
}

function toggleBanner () {
    var banner = $("#banner");
    if(banner.is(":visible")){
        banner.fadeOut();
    }else{
        banner.fadeIn();
    }
}

function setPointBanner () {
   $("#banner").html(TOTAL_POINTS);
   $("#banner").removeClass("bannerClass");
   $("#banner").addClass("pointCollector");
   //$("#usernameBanner").animate({ backgroundColor:"green"});
   var username = $("#userName").val();
   $("#usernameBanner").html("Welcome " + username + "!" );
   $("#usernameBanner").removeClass("endUsernameBanner");
   $("#usernameBanner").addClass("pointCollector");

   $("#usernameBanner").fadeIn();

   setTimeout(function(){
       $("#usernameBanner").slideUp();
   },2000); 

}

function setInitBanner () {
    
   $("#banner").html(BANNER_TEXT);
   $("#banner").removeClass("pointCollector");
   $("#banner").addClass("bannerClass");
   var username = $("#userName").val();
   $("#usernameBanner").addClass("endUsernameBanner");
   $("#usernameBanner").removeClass("pointCollector");
   $("#usernameBanner").html("Congratulations " + username + "! You ate " + TOTAL_POINTS + " mice");
   $("#usernameBanner").slideDown();
   setTimeout(function(){
       $("#usernameBanner").slideUp();
   },2000);
}

function checkName(){
    if($("#userName").val()==""){
        showNameInput();
    }else{
        startClicked();
    }
}

function showNameInput () {
   $("#inputNamePanel").slideDown();

    $("#txtUsername").focus();
}


    $("#frmUsername").validate({
            rules:{
                    txtUsername:{required:true,minlength:3,maxlength: 10}
            },
            messages:{
                    txtUsername:{required:"<a title='this field is required!'>*</a>", minlength:"<a title='min 3 characters are allowed!'>*</a>", maxlength:"<a title='max 10 characters are allowed!'>*</a>"}
            }
    });
    $("#frmUsername").submit(function(){
        if ($(this).valid()) {
            //TODO:
            var name = $("#txtUsername").val();
            var dataString = "page=game&function=submit&name="+name;
            $.post("ajax.php",dataString,nameSaveCallback);
        }
        return false;
    });

function nameSaveCallback (data) {
    $("#userName").val(data);
    $("#usernameBanner").html("Welcome "+data+"!");
    startClicked();
}


function saveScore () {
    var dataString = "page=game&function=saveScore&score="+TOTAL_POINTS;
    $.post("ajax.php",dataString,fillTopScoreTable);
}

function refreshTopscores(data){
}

function logout () {
    if(confirm("Are you sure")){
        var dataString = "page=game&function=logout";
        $.post("ajax.php",dataString,logoutCallback);
    }
}

function logoutCallback (data) {
    
    window.location="index.php";
}
function fillTopScoreTable () {
    animateTable($("#topScoreTable-body"));
   var dataString = "page=topScore&function=refreshTable"; 
   $.post("ajax.php",dataString,fillTopScoreTableCallback);
}

function fillTopScoreTableCallback (data) {
   animateTableCallback($("#topScoreTable-body"),data);
}

function animateMainPanel () {
   var mainPanel = $("#MainPanel"); 
   var animations = animatedCssList.split(" ");
   var rand = Math.floor(Math.random()*animations.length);
   mainPanel.addClass(animations[rand]);


}

function clearMainPanelAnimations(){

   var mainPanel = $("#MainPanel"); 
   mainPanel.removeClass(animatedCssList); 
}

});



var animateTable = function(table){
    var mainTable=table.parent().parent().parent();
    mainTable.removeClass("animated flipInX");
    mainTable.addClass("animated flipOutX");
}
var animateTableCallback = function(table,html){
    var mainTable=table.parent().parent().parent();
    mainTable.removeClass("animated flipOutX");
    mainTable.addClass("animated flipInX");
    table.html(html);
}
