// Updated: 3/1/2023

/* ---------------------------------------------------*/
/* TABLE OF CONTENTS                                  */
/* ---------------------------------------------------*/
/* SET VARIABLES                                      */
/* HIDE RESET BUTTON                                  */
/* POPULATE BUTTONS W/ CLASS NAME                     */
/* SET THE SCORE                                      */
/* PLAYER/BUTTON LISTENER                             */
/* GET COMPUTER CHOICE                                */
/* INTRO ANIMATIONS                                   */
/* --- SET PLAYER/COMPUTER CHOICE INITIAL POSITIONS   */
/* PLAY THE ROUND                                     */
/* UPDATE SCORECARD                                   */
/* KEEP SCORE                                         */
/* ROUND CONCLUSION/ANIMATION DELAY                   */
/* --- ENABLE BUTTONS                                 */
/* --- DISABLE BUTTONS                                */
/* --- ORDER OF ANIMATIONs (SET TIMEOUT)              */
/* CSS RESET                                          */
/* RESET GAME                                         */
/* SCORECARD SCROLL OUTS/INS                          */
/* SCORECARD SCROLL-UP                                */
/* SCORECARD SCROLL-DOWN                              */
/* OPTIONS SCROLL-DOWN                                */
/* OPTIONS SCROLL-UP                                  */
/* PLAY AGAIN BUTTON REVEAL                           */
/* DRAGGABLE SCORECARD FUNCTION                       */
/* DRAG THE SCORECARD                                 */
/* SCROLLING TITLE BAR                                */
/* ---------------------------------------------------*/

//SET VARIABLES
const optionsArray = ["rock", "paper", "scissors"]; //SET VARIABLES
const buttonCount = document.getElementsByClassName("button"); //GET # OF BUTTONS

let playerSelection = null;
let computerSelection = null;
let playerScore = 0;
let computerScore = 0;
let tieScore = 0;

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
  /*
  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = "#51b266";
    button.style.color = "#fff";
  });
  button.addEventListener("mouseout", () => {
    button.style.backgroundColor = "#fff";
    button.style.color = "#000";
  });
  */
});

//GET COMPUTER CHOICE
function getComputerChoice(playerSelection) {
  let i = Math.floor(Math.random() * optionsArray.length);
  computerSelection = optionsArray[i];
  document.getElementById("comp-choice").innerHTML = computerSelection;
  playRound(playerSelection, computerSelection);
}

//INTRO ANIMATIONS
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
}

//PLAY THE ROUND
function playRound(playerSelection, computerSelection) {
  let playerIndex = optionsArray.indexOf(playerSelection);
  let computerIndex = optionsArray.indexOf(computerSelection);

  //CHECKS optionsArray[2] DOES NOT BEAT optionsArray[0]; PLAYER SCORES
  if (
    playerIndex > computerIndex === true &&
    computerIndex - playerIndex !== -2
  ) {
    playerScore++;
    endRound();
    //    document.getElementById("win").innerHTML = "WIN!";
    //    console.log("win");
  }
  //CHECK optionsArray[2] DOES NOT BEAT optionsArray[0]; COMPUTER SCORES
  else if (
    playerIndex < computerIndex === true &&
    computerIndex - playerIndex !== 2
  ) {
    computerScore++;
    endRound();
  }
  //optionsArray[0] BEATS optionsArray[2]; PLAYER SCORES
  else if (computerIndex == 2 && playerIndex == 0) {
    playerScore++;
    endRound();
  }
  //optionsArray[0] BEATS optionsArray[2]; COMPUTER SCORES
  else if (playerIndex == 2 && computerIndex == 0) {
    computerScore++;
    endRound();
  }
  //CHECKS FOR TIES
  else if (playerIndex == computerIndex) {
    tieScore++;
    endRound();
  }

  //UPDATE SCORECARD
  evalScore(playerScore, computerScore);

  //KEEP SCORE
  function evalScore() {
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
      optionScrollUp();
      scoreCardDown();
      playAgain();
    }
  }
}

//ROUND CONCLUSION/ANIMATION DELAY
function endRound() {
  //ENABLE BUTTONS
  function buttonEnable() {
    let buttonCount = document.getElementsByTagName("button");
    for (i = 0; i < buttonCount.length; i++) {
      buttonCount[i].disabled = false;
      buttonCount[i].style.backgroundColor = "#fff";
      buttonCount[i].style.boxShadow = "2px 2px 0 #5b5b5b";
      buttonCount[i].style.color = "#000";
      buttonCount[i].style.textDecoration = "none";
      buttonCount[i].style.cursor = "default";
    }
  }
  //DISABLE BUTTONS
  function buttonDisable() {
    let buttonCount = document.getElementsByTagName("button");
    for (i = 0; i < buttonCount.length; i++) {
      buttonCount[i].disabled = true;
      buttonCount[i].style.boxShadow = "2px 2px #999";
      buttonCount[i].style.backgroundColor = "#d7cece";
      buttonCount[i].style.color = "#fff";
      buttonCount[i].style.cursor = "progress";
    }
  }
  //ORDER OF ANIMATIONs (SET TIMEOUT)
  setTimeout(() => {
    document.body.style.cursor = "progress";
    buttonDisable();
  }, 0);
  setTimeout(() => {
    //ADD ADDITIONAL FUNCTIONS HERE (IF NEEDED)
  }, 750);
  setTimeout(() => {
    document.body.style.cursor = "default";
    buttonEnable();
    cssReset();
  }, 1500);
}

function cssReset() {
  document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("mouseover", () => {
      button.style.backgroundColor = "#51b266";
      button.style.color = "#fff";
    });
    button.addEventListener("mouseout", () => {
      button.style.backgroundColor = "#fff";
      button.style.color = "#000";
    });
  });
}

//RESET GAME
document.getElementById("reset").addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  playRound();
  optionScrollDown();
  scoreCardUp();
});

/* SCORECARD SCROLL OUTS/INS */
document.getElementById("play").addEventListener("click", () => {
  scoreCardUp();
  optionScrollDown();
});

//SCORECARD SCROLL-UP
function scoreCardUp() {
  //GENERIC SCROLL MOVEMENTS
  let id = null;
  //1) UPDATE W/ ID
  let div = document.getElementById("scorecard-options-container");
  //2) SET STARTING POSITION
  let position = -36;
  clearInterval(id);
  //3) ADJUST TIME (IF NEEDED)
  id = setInterval(scroll);
  function scroll() {
    //4) SET ENDING POSITION
    if (position <= -79) {
      clearInterval(id);
    } else {
      position--;
      div.style.top = position + "px";
    }
  }
}

//SCORECARD SCROLL-DOWN
function scoreCardDown() {
  //GENERIC SCROLL MOVEMENTS
  let id = null;
  //1) UPDATE W/ ID
  let div = document.getElementById("scorecard-options-container");
  //2) SET STARTING POSITION
  let position = -79;
  clearInterval(id);
  //3) ADJUST TIME (IF NEEDED)
  id = setInterval(scroll);
  function scroll() {
    //4) SET ENDING POSITION
    if (position >= -36) {
      clearInterval(id);
    } else {
      position++;
      div.style.top = position + "px";
    }
  }
}

//OPTIONS SCROLL-DOWN
function optionScrollDown() {
  let div = document.getElementById("options");
  //GENERIC SCROLL MOVEMENTS
  let id = null;
  //2) SET STARTING POSITION
  let position = -110;
  clearInterval(id);
  //3) ADJUST TIME (IF NEEDED)
  id = setInterval(scroll);
  function scroll() {
    //4) SET ENDING POSITION
    if (position >= -2) {
      clearInterval(id);
    } else {
      position = position + 4;
      div.style.top = position + "px";
    }
  }
}

//OPTIONS SCROLL-UP
function optionScrollUp() {
  let div = document.getElementById("options");
  //GENERIC SCROLL MOVEMENTS
  let id = null;
  //2) SET STARTING POSITION
  let position = -2;
  clearInterval(id);
  //3) ADJUST TIME (IF NEEDED)
  id = setInterval(scroll);
  function scroll() {
    //4) SET ENDING POSITION
    if (position <= -110) {
      clearInterval(id);
    } else {
      position = position - 4;
      div.style.top = position + "px";
    }
  }
}

//PLAY AGAIN BUTTON REVEAL
function playAgain() {
  document.getElementById("play-reset-container").style.top = "-33px";
  document.getElementById("play").style.visibility = "hidden";
  for (let i = 0; i < optionsArray.length; i++) {
    document.getElementsByClassName("button")[i].disabled = false;
  }
}

//DRAGGABLE SCORECARD FUNCTION
//VIA https://www.w3schools.com/howto/howto_js_draggable.asp
let elem = document.getElementById("container");

function dragElement(elem) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById("draggable")) {
    //DECLARE THE DRAGGABLE HANDLE
    document.getElementById("draggable").onmousedown = dragMouseDown;
  } else {
    //OTHERWISE, THE WHOLE THING IS GRABBABLE
    elem.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    //GET MOUSE POSITION AT STARTUP
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    //CALL FUNCTION WHEN MOUSE MOVES
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    //CALCULATE NEW CURSOR POSITION
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    //SET ELEM NEW POSITION
    elem.style.top = elem.offsetTop - pos2 + "px";
    elem.style.left = elem.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    //STOP MOVING ON MOUSE RELEASE
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
//DRAG THE SCORECARD
dragElement(elem);

//SCROLLING TITLE BAR
//via: MarqueeTitle v4.0 | MIT License | git.io/vQZbs
(function (c, a, m) {
  var title = (c || document.title) + " " + (a || " ") + " ";
  setInterval(function () {
    title = title.substring(1) + title.charAt(0);
    document.title = title;
  }, m || 300);
})(
  "🪨  🧻 ✂️ 🪨 🧻 ✂️ 🪨  🧻 ✂️ 🪨 🧻 ✂️ ", //TAB TEXT
  "", //TITLE REPEAT SEPARATOR
  300 //SCROLL SPEED (MS)
);
