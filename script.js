//PLAYER/BUTTON LISTENER
document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("click", () => {
    const playerButton = button.value;
    console.log(playerButton);
    nextStep();
  });
});

//COMPUTER RANDOM CHOICE
function nextStep() {
  console.log('CompChoice')
}

/* SUPPLIED CODE...
function playRound(playerSelection, computerSelection) {
  // your code here!
}

const playerSelection = "rock";
const computerSelection = getComputerChoice();

console.log(playRound(playerSelection, computerSelection));
*/
