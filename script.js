var playerChoice;
var computerChoice;
var playerScore = 0;
var computerScore = 0;
function playGame(choice) {
    var isCorrectInput = checkIsCorrectInput(choice);
    if (!isCorrectInput) {
        displayMessage('Please type and enter "rock", "paper" or "scissors"');
        return;
    }
    var computerChoice = getComputerChoice();
    // This function belongs to the UI 
    highlightImage(computerChoice, "computer");
    displayMessage("Computer chose ".concat(computerChoice));
    var isPlayerWinner = checkPlayerIsWinner(choice, computerChoice);
    var isComputerWinner = checkComputerIsWinner(choice, computerChoice);
    if (isPlayerWinner) {
        playerScore = incrementScore(playerScore);
        displayMessage("Player is the winner! The score is Player:".concat(playerScore, " and Computer:").concat(computerScore));
    }
    if (isComputerWinner) {
        computerScore = incrementScore(computerScore);
        displayMessage("Computer is the winner! The score is Player:".concat(playerScore, " and Computer:").concat(computerScore));
    }
    if (computerScore === 3 || playerScore === 3) {
        displayMessage("".concat(playerScore === 3 ? "Player" : "Computer", " is the champion!"));
        computerScore = 0;
        playerScore = 0;
        return;
    }
    else
        displayMessage("Draw!");
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
function displayMessage(message) {
    console.log(message);
}
// UI Code
var images = getAllImages();
images.forEach(function (image) { return image.addEventListener('click', playHand); });
function playHand(event) {
    var image = getImage(event);
    var hand = getChoice(event);
    highlightImage(image, "player");
    playGame(hand);
}
function highlightImage(image, currentPlayer) {
    if (typeof image === "string") {
        image = getImage(image);
    }
    if (image.classList.contains("player") && currentPlayer === "computer") {
        image.classList.replace("player", "both");
    }
    else if (!(image.classList.contains("player")) && currentPlayer === "computer") {
        image.classList.add("computer");
    }
    else if (!(image.classList.contains("computer")) && currentPlayer === "player") {
        image.classList.add("player");
    }
}
function getChoice(event) {
    return event.target.id;
}
function getImage(image) {
    if (typeof image !== "string") {
        return image.target;
    }
    return document.querySelector("#".concat(image));
}
function removeHighlight() {
    var images = getAllImages();
    images.forEach(function (image) { return image.classList.remove("computer", "player", "both"); });
}
function getAllImages() {
    return document.querySelectorAll('.topContainer img');
}
