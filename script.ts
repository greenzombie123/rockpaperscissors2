let playerChoice: "rock" | "paper" | "scissors";
let computerChoice: "rock" | "paper" | "scissors";
let playerScore = 0;
let computerScore = 0;

function playGame(choice: string): void {
    const isCorrectInput = checkIsCorrectInput(choice)
    if (!isCorrectInput) {
        displayMessage('Please type and enter "rock", "paper" or "scissors"')
        return;
    }

    const computerChoice = getComputerChoice()

    displayMessage(`Computer chose ${computerChoice}`)

    const isPlayerWinner = checkPlayerIsWinner(choice, computerChoice)
    const isComputerWinner = checkComputerIsWinner(choice, computerChoice)

    if (isPlayerWinner) {
        playerScore = incrementScore(playerScore)
        displayMessage(`Player is the winner! The score is Player:${playerScore} and Computer:${computerScore}`)
    }

    if (isComputerWinner) {
        computerScore = incrementScore(computerScore)
        displayMessage(`Computer is the winner! The score is Player:${playerScore} and Computer:${computerScore}`)
    }

    if (computerScore === 3 || playerScore === 3) {
        displayMessage(`${playerScore === 3 ? "Player" : "Computer"} is the champion!`)
        computerScore = 0;
        playerScore = 0;
        return
    }

    else
        displayMessage(`Draw!`)
}

function getComputerChoice(): string {
    const choices = ["rock", "paper", "scissors"];

    let index = Math.floor(Math.random() * 3)

    return choices[index]
}

function checkWinner(playerChoice: string, computerChoice: string): string {
    if (checkPlayerIsWinner(playerChoice, computerChoice)
    ) {
        return "player"
    }
    else if (checkComputerIsWinner(playerChoice, computerChoice)) {
        return "computer"
    }
    else
        return "draw"
}

function checkPlayerIsWinner(playerChoice: string, computerChoice: string): boolean {
    if (playerChoice === "rock" && computerChoice === "scissors" ||
        playerChoice === "scissors" && computerChoice === "paper" ||
        playerChoice === "paper" && computerChoice === "rock"
    )
        return true

    else return false
}

function checkComputerIsWinner(playerChoice: string, computerChoice: string): boolean {
    if (playerChoice === "rock" && computerChoice === "paper" ||
        playerChoice === "scissors" && computerChoice === "rock" ||
        playerChoice === "paper" && computerChoice === "scissors")
        return true

    else return false
}

function incrementScore(score: number): number {
    return ++score
}

function checkIsCorrectInput(choice: string): boolean {
    if (typeof choice === "string" && (choice === "rock" || choice === "scissors" || choice === "paper"))
        return true
    else return false
}

function displayMessage(message: string) {
    console.log(message)
}

// UI Code

const images = document.querySelectorAll('.topContainer img')

images.forEach(image => image.addEventListener('click', playHand))

function playHand(event: Event) {

    const image = getImage(event)
    console.log(image)
    //playGame(hand)
}

function highlightImage(image:HTMLElement | string, currentPlayer:string) {
    if(typeof image === "string"){
        image = getImage(image)
    }
    if(image.classList.contains("player") && currentPlayer === "computer"){
        image.classList.replace("player", "both")
    }
    else if(!(image.classList.contains("player")) && currentPlayer === "computer"){
        image.classList.add("computer")
    }
    else if(!(image.classList.contains("computer")) && currentPlayer === "player"){
        image.classList.add("player")
    }
    // Add or change class of an image
    // Give it computer, player, or both
    // Get ref of image -> getImage
    // Need to know who *person* and what *hand* they chose
    // If image classList has no player && hand is computer
    //      Add computer class to image
    // If image classList has player && hand is computer
    //      Add both class to image
    // If image classList has no computer && hand is player
    //      Add player class to image 
    // If image classList has computer && had is player
    //      Add both class to image
}

function getHand(event: Event): string {
    return (event.target as HTMLElement).id
}

function getImage(image: string | Event): HTMLElement {
    if(typeof image !== "string"){
        return image.target as HTMLElement
    }
    
    return document.querySelector(`#${image}`)!
}
