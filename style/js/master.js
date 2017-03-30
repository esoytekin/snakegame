var animation = "shake"
var block = false;
$(function(){

    $(".panelHeader").mouseenter(animateHeader);
});

var animateHeader = function(event){
    if(block)
       return; 
    block = true;
    var element = $(this);
    element.addClass(animation);
    setTimeout(function(){
        clearAnimation(element);
    },1000);
}
var clearAnimation = function(element){
    

        block = false;
        element.removeClass(animation);
}
