var playerScore = 0;
var computerScore = 0;
var gameState;
function playGame(choice) {
    //UI Function
    resetScoreBoard(gameState);
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
        // UI Function
        incrementScoreBoard("player", playerScore);
        showPopUp("Player Wins!");
    }
    if (isComputerWinner) {
        computerScore = incrementScore(computerScore);
        displayMessage("Computer is the winner! The score is Player:".concat(playerScore, " and Computer:").concat(computerScore));
        // UI Function
        incrementScoreBoard("computer", computerScore);
        showPopUp("Computer Wins!");
    }
    if (computerScore === 3 || playerScore === 3) {
        displayMessage("".concat(playerScore === 3 ? "Player" : "Computer", " is the champion!"));
        // UI Function
        showPopUp("".concat(playerScore === 3 ? "Player" : "Computer", " is the champion!"));
        computerScore = 0;
        playerScore = 0;
        // UI Function
        removeHighlight(true);
        changeGameState("gameOver");
        resetScoreBoard(gameState);
        return;
    }
    else
        displayMessage("Draw!");
    // UI Function
    removeHighlight(true);
    if (choice === computerChoice)
        showPopUp("Draw!");
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
// Used for canceling previous setTimeOuts 
var timeoutID;
var popUpTimeOutId;
var resetScoreTimeOutId;
// let scoreBoardData:
var images = getAllImages();
images.forEach(function (image) { return image.addEventListener('click', playHand); });
function playHand(event) {
    removeHighlight(false);
    var image = getImage(event);
    highlightImage(image, "player");
    var hand = getChoice(event);
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
function removeHighlight(isTimed) {
    if (isTimed) {
        timeoutID = setTimeout(function () {
            clearTimeout(timeoutID);
            var images = getAllImages();
            images.forEach(function (image) { return image.classList.remove("computer", "player", "both"); });
        }, 3000);
    }
    else {
        clearTimeout(timeoutID);
        var images_1 = getAllImages();
        images_1.forEach(function (image) { return image.classList.remove("computer", "player", "both"); });
    }
}
function getAllImages() {
    return document.querySelectorAll('.topContainer img');
}
function incrementScoreBoard(winner, points) {
    var stars = getStars(winner);
    for (var index = 0; index < points; index++) {
        // Type cast the object inside stars[index] to a HTMLElement so you can access the style property
        var star = stars[index];
        star.classList.add("black");
    }
}
function getStars(id) {
    var stars = document.querySelectorAll("#".concat(id, "ScoreBoard .score .star"));
    return Array.from(stars);
}
function resetScoreBoard(gameState) {
    if (gameState === "gameOver") {
        changeGameState("newGame");
        resetScoreTimeOutId = setTimeout(function () {
            var allStars = document.querySelectorAll(".star");
            allStars.forEach(function (star) { return star.classList.remove("black"); });
        }, 1000);
    }
    if (gameState === "newGame") {
        clearTimeout(resetScoreTimeOutId);
        var allStars = document.querySelectorAll(".star");
        allStars.forEach(function (star) { return star.classList.remove("black"); });
        changeGameState("inPlay");
    }
}
function showPopUp(message) {
    clearTimeout(popUpTimeOutId);
    var popUp = document.querySelector(".popUp");
    popUp.textContent = "";
    popUp.textContent = message;
    popUpTimeOutId = setTimeout(function () {
        popUp.textContent = "";
    }, 3000);
}
function changeGameState(newGameState) {
    gameState = newGameState;
}
