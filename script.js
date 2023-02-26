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
    document.getElementById("player-choice-heading").innerHTML =
      "Your Choice: " + playerSelection;
  });
});

//GET COMPUTER CHOICE
function getComputerChoice(playerSelection) {
  let i = Math.floor(Math.random() * optionsArray.length);
  computerSelection = optionsArray[i];
  document.getElementById("comp-choice-heading").innerHTML =
    "Computer's Choice: " + computerSelection;
  playRound(playerSelection, computerSelection);
}

//PLAY THE ROUND
function playRound(playerSelection, computerSelection) {
  let playerIndex = optionsArray.indexOf(playerSelection);
  let computerIndex = optionsArray.indexOf(computerSelection);
  console.log("playr " + playerSelection);
  console.log("comp " + computerSelection);
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
