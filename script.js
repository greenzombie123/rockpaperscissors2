var playerChoice;
var computerChoice;
var playerScore = 0;
var computerScore = 0;
function playGame(choice) {
    if (typeof choice !== "string") {
    }
}
function getComputerChoice() {
    var choices = ["rock", "paper", "scissors"];
    var index = Math.floor(Math.random() * 3);
    return choices[index];
}
function checkWinner(playerChoice, computerChoice) {
    if (checkPlayerIsWinner(playerChoice, computerChoice)) {
        return "player";
    }
    else if (checkComputerIsWinner(playerChoice, computerChoice)) {
        return "computer";
    }
    else
        return "draw";
}
function checkPlayerIsWinner(playerChoice, computerChoice) {
    if (playerChoice === "rock" && computerChoice === "scissors" ||
        playerChoice === "scissors" && computerChoice === "paper" ||
        playerChoice === "paper" && computerChoice === "rock")
        return true;
    else
        return false;
}
function checkComputerIsWinner(playerChoice, computerChoice) {
    if (playerChoice === "rock" && computerChoice === "paper" ||
        playerChoice === "scissors" && computerChoice === "rock" ||
        playerChoice === "paper" && computerChoice === "scissors")
        return true;
    else
        return false;
}
function incrementScore(score) {
    return ++score;
}
function checkIsCorrectInput(choice) {
    if (typeof choice === "string" && (choice === "rock" || choice === "scissors" || choice === "paper"))
        return true;
    else
        return false;
}
