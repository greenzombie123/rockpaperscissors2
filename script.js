var playerChoice;
var computerChoice;
var playerScore = 0;
var computerScore = 0;
function playGame(choice) {
}
function getComputerChoice() {
    var choices = ["rock", "paper", "scissors"];
    var index = Math.floor(Math.random() * 3);
    return choices[index];
}
function checkWinner(playerChoice, computerChoice) {
    if (playerChoice === "rock" && computerChoice === "scissors" ||
        playerChoice === "scissors" && computerChoice === "paper" ||
        playerChoice === "paper" && computerChoice === "rock") {
        return "player";
    }
    else if (playerChoice === "rock" && computerChoice === "paper" ||
        playerChoice === "scissors" && computerChoice === "rock" ||
        playerChoice === "paper" && computerChoice === "scissors") {
        return "computer";
    }
    else
        return "draw";
}
