//SET VARIABLES
const optionsArray = ["rock", "paper", "scissors"]; //SET VARIABLES
const buttonCount = document.getElementsByClassName("button"); //GET # OF BUTTONS

//GLOBAL VARIABLES
var playerSelection = null;
var computerSelection = null;

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
//PLAYER/BUTTON LISTENER
document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("click", () => {
    playerSelection = button.value;
    getComputerChoice();
  });
});

//COMPUTER RANDOM CHOICE
function getComputerChoice() {
  let i = Math.floor(Math.random() * optionsArray.length);
  computerSelection = optionsArray[i];
  playRound();
}

function playRound(playerSelection, computerSelection) {
  console.log(playerSelection);
  console.log(computerSelection);
}

/* SUPPLIED CODE...
function playRound(playerSelection, computerSelection) {
  // your code here!
}

const playerSelection = "rock";
const computerSelection = getComputerChoice();

console.log(playRound(playerSelection, computerSelection));
*/
