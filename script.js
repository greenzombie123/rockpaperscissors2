var playerChoice;
var computerChoice;
function playGame(choice) {
    getComputerChoice();
}
function getComputerChoice() {
    var choices = ["rock", "paper", "scissors"];
    var index = Math.floor(Math.random() * 3);
    return choices[index];
}
