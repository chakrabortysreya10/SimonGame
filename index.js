var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var level=0;
var started=false;
var highest=0;
var cscore=0;
function nextSequence()
{
  level++;
  $("h1").text("Level  "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
 // console.log(randomChosenColor); 
$("div."+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut().fadeIn();
  playSound(randomChosenColor);


}

$("div.btn").on("click",function(event)
{
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkUserPattern(userClickedPattern.length-1);
  
});


function playSound(name)
{
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
      $("#"+currentColour).removeClass("pressed"); } ,100
    );
    
}
$(document).keypress(function()
{
  if(!started)
  {
    $("h1").text("Level  "+level);
    nextSequence();
    started=true;
  }
});

// Check User Pattern
function checkUserPattern(currentLevel)
{
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
  {
    
    if(gamePattern.length===userClickedPattern.length)
    {
      console.log("user finished sequnce");
      setTimeout(function(){

          score();
          nextSequence();
         

          userClickedPattern=[];
      },1000);
    }
  }
    else {

          var wrong=new Audio("sounds/wrong.mp3");
          wrong.play();
          $("body").addClass("game-over");
          setTimeout(function()
          {
            $("body").removeClass("game-over");
          },200);
          $("h1").text("Game Over.Press Any Key To Restart");
          startOver();
          resetScore();
      
    }
  }
function startOver()
{
  level=0;
 
  gamePattern=[];
  userClickedPattern=[];
  
  started=false;
}
 function score()
 {
    cscore=cscore+level*(level+1);
   if(cscore>highest)
   {
     highest=cscore;
     $(".b").text("New High Score "+highest).fadeOut().fadeIn().fadeOut(200).fadeIn();
   }
   $(".a").text("Current Score "+cscore);
   
 }
 function resetScore()
 {
   cscore=0;
   $(".a").text("Current Score "+cscore);
   $(".b").text("Highest Score "+highest)
 }