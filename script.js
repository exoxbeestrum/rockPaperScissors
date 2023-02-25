document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    const fired_button = button.value;
    console.log(fired_button);
  });
});

/*
function playerChoice() {
  let valueChoice = document.getElementById("choice").value;
  console.log(valueChoice);
  document.getElementById("result").innerHTML = valueChoice;
}
*/
/* PLAYGROUND CODE
function myFunction() {
  var x = document.getElementById("myText").value;
  document.getElementById("demo").innerHTML = x;
}
*/

/* SUPPLIED CODE...
function playRound(playerSelection, computerSelection) {
  // your code here!
}

const playerSelection = "rock";
const computerSelection = getComputerChoice();

console.log(playRound(playerSelection, computerSelection));
*/
