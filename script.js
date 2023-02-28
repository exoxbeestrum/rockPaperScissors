//SET VARIABLES
const optionsArray = ["rock", "paper", "scissors"]; //SET VARIABLES
const buttonCount = document.getElementsByClassName("button"); //GET # OF BUTTONS

let playerSelection = null;
let computerSelection = null;
let playerScore = 0;
let computerScore = 0;

//HIDE RESET BUTTON
document.getElementById("reset").style.visibility = "hidden";

//POPULATE BUTTONS W/ CLASS NAME
for (let i = 0; i < optionsArray.length; i++) {
  //COUNT .button INSTANCES
  document.getElementsByClassName("button")[i].classList.add(optionsArray[i]);
  //ASSIGN NAME
  document.getElementsByClassName("button")[i].name = optionsArray[i];
  //ASSIGN VALUE
  document.getElementsByClassName("button")[i].value = optionsArray[i];
  //ASSIGN BUTTON TEXT
  document.getElementsByClassName("button")[i].innerHTML = optionsArray[i];
}

//SET THE SCORE
document.getElementById("player-score").innerHTML = playerScore;
document.getElementById("comp-score").innerHTML = computerScore;

//PLAYER/BUTTON LISTENER
document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("click", () => {
    playerSelection = button.value;
    getComputerChoice(playerSelection);
    document.getElementById("player-choice").innerHTML = playerSelection;
    choiceIntro(playerSelection);
  });
});

//GET COMPUTER CHOICE
function getComputerChoice(playerSelection) {
  let i = Math.floor(Math.random() * optionsArray.length);
  computerSelection = optionsArray[i];
  document.getElementById("comp-choice").innerHTML = computerSelection;
  playRound(playerSelection, computerSelection);
}

/* INTRO ANIMATIONS   */
//SET PLAYER/COMPUTER CHOICE INITIAL POSITIONS
document.getElementById("player-choice").style.left = "-100%";
document.getElementById("comp-choice").style.left = "100%";

function choiceIntro() {
  const winWidth = window.innerWidth;
  const playerDiv = document.getElementById("player-choice");
  const playerWidth = document.getElementById("player-choice").offsetWidth;
  const compDiv = document.getElementById("comp-choice");
  const compWidth = document.getElementById("comp-choice").offsetWidth;

  let midPlayer = winWidth / 2 - playerWidth / 2; //SCREEN CENTER: PLAYER CHOICE
  let midComp = winWidth / 2 - compWidth / 2; //SCREEN CENTER: PLAYER CHOICE

  let posPlayerChoice = 0 - playerWidth; //SET STARTING POSITION (PLAYER CHOICE)
  let posCompChoice = winWidth; //SET STARTING POSITION (COMPUTER CHOICE)

  playerTimer = setInterval(enterFramePlayer, 1); //SETS FUNCTION TIME
  compTimer = setInterval(enterFrameComp, 1); //SETS FUNCTION TIME

  function enterFramePlayer() {
    if (posPlayerChoice >= midPlayer) {
      clearInterval(playerTimer);
    } else {
      posPlayerChoice = posPlayerChoice + 10;
      playerDiv.style.left = posPlayerChoice + "px";
    }
  }
  function enterFrameComp() {
    if (posCompChoice <= midComp) {
      clearInterval(compTimer);
    } else {
      posCompChoice = posCompChoice - 10;
      compDiv.style.left = posCompChoice + "px";
    }
  }
  console.log(window.innerWidth);
}

//PLAY THE ROUND
function playRound(playerSelection, computerSelection) {
  let playerIndex = optionsArray.indexOf(playerSelection);
  let computerIndex = optionsArray.indexOf(computerSelection);

  //CHECKS optionsArray[2] DOES NOT BEAT optionsArray[0]; PLAYER SCORES
  if (playerIndex > computerIndex && computerIndex - playerIndex != 2) {
    playerScore++;
  }
  //CHECK optionsArray[2] DOES NOT BEAT optionsArray[0]; COMPUTER SCORES
  if (playerIndex < computerIndex && playerIndex - computerIndex != 2) {
    computerScore++;
  }
  //optionsArray[0] BEATS optionsArray[2]; PLAYER SCORES
  if (computerIndex - playerIndex == 2) {
    playerScore++;
  }
  //optionsArray[0] BEATS optionsArray[2]; COMPUTER SCORES
  if (playerIndex - computerIndex == 2) {
    computerScore++;
  }
  //CHECKS FOR TIES
  if (playerIndex == computerIndex) {
    console.log("tie");
  }
  //UPDATE SCORE CARD
  evalScore(playerScore, computerScore);

  //KEEP SCORE
  function evalScore(playerScore, computerScore) {
    document.getElementById("player-score").innerHTML = playerScore;
    document.getElementById("comp-score").innerHTML = computerScore;
    //PLAYER WINS
    if (playerScore == 5) {
      document.getElementById("win").innerHTML = "YOU WIN!!!";
      endGame();
    }
    //PLAYER LOSES
    if (computerScore == 5) {
      document.getElementById("win").innerHTML = "YOU LOSE!!!";
      endGame();
    }
    //DISABLE BUTTONS
    function endGame() {
      for (let i = 0; i < optionsArray.length; i++) {
        document.getElementsByClassName("button")[i].disabled = true;
        document.getElementById("reset").innerHTML = "Play Again?";
        document.getElementById("reset").style.visibility = "visible";
      }
    }
  }
}

//RESET GAME
document.getElementById("reset").addEventListener("click", () => {
  console.log("reset");
  location.reload();
});

console.log(window.innerWidth);
