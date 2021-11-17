let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"]
let userClickedPattern = [];
let level = 0;
let started = false;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Stage-" + level);
  let randNumber = Math.floor(Math.random() * 3) + 1;
  let randomChosenColor = buttonColors[randNumber];
  gamePattern.push(randomChosenColor);
  console.log("game pattern: " + gamePattern);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

$(".btn").click(function() {
  let userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  console.log("user clicked: " + userClickedPattern);
  playSound(this.id);
  animatePress("#" + this.id);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  let sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $(currentColor).addClass("pressed");
  setTimeout(function() {
    $(currentColor).removeClass("pressed")
  }, 100);
}

$("body").keydown(function() {
  if (started == false) {
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length - 1 == gamePattern.length - 1) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    startOver();
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart")
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
