var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var lvl=0;
var started=false;

$(document).keydown(function (){
    if(!started){
        $("#level-title").text("Level " + lvl);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", handler);

function handler() {
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
}

function checkAnswer(currentLevel){
    console.log(gamePattern);
    console.log(userClickedPattern);
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){

          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);

        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver() {
    lvl=0;
    gamePattern=[];
    started=false;
}


function nextSequence(){
    userClickedPattern=[];
    lvl++;
    $("#level-title").text("Level "+lvl);
    var randomNumber =Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){

    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);

}
