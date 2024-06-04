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

    // This function belongs to the UI 
    highlightImage(computerChoice, "computer")

    displayMessage(`Computer chose ${computerChoice}`)

    const isPlayerWinner = checkPlayerIsWinner(choice, computerChoice)
    const isComputerWinner = checkComputerIsWinner(choice, computerChoice)

    if (isPlayerWinner) {
        playerScore = incrementScore(playerScore)
        displayMessage(`Player is the winner! The score is Player:${playerScore} and Computer:${computerScore}`)

        // UI Function
        incrementScoreBoard("player", playerScore)
    }

    if (isComputerWinner) {
        computerScore = incrementScore(computerScore)
        displayMessage(`Computer is the winner! The score is Player:${playerScore} and Computer:${computerScore}`)

        // UI Function
        incrementScoreBoard("computer", computerScore)
    }

    if (computerScore === 3 || playerScore === 3) {
        displayMessage(`${playerScore === 3 ? "Player" : "Computer"} is the champion!`)
        computerScore = 0;
        playerScore = 0;
        // UI Function
        removeHighlight(true)
        resetScoreBoard()
        return
    }

    else
        displayMessage(`Draw!`)
    // UI Function
    removeHighlight(true)
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

// Used for canceling previous setTimeOuts 
let timeoutID: number | undefined;

const images = getAllImages()

images.forEach(image => image.addEventListener('click', playHand))

function playHand(event: Event) {

    removeHighlight(false)

    const image = getImage(event)
    highlightImage(image, "player")

    const hand = getChoice(event)
    playGame(hand)
}

function highlightImage(image: HTMLElement | string, currentPlayer: string) {
    if (typeof image === "string") {
        image = getImage(image)
    }
    if (image.classList.contains("player") && currentPlayer === "computer") {
        image.classList.replace("player", "both")
    }
    else if (!(image.classList.contains("player")) && currentPlayer === "computer") {
        image.classList.add("computer")
    }
    else if (!(image.classList.contains("computer")) && currentPlayer === "player") {
        image.classList.add("player")
    }
}

function getChoice(event: Event): string {
    return (event.target as HTMLElement).id
}

function getImage(image: string | Event): HTMLElement {
    if (typeof image !== "string") {
        return image.target as HTMLElement
    }

    return document.querySelector(`#${image}`)!
}

function removeHighlight(isTimed: boolean) {
    if (isTimed) {
        timeoutID = setTimeout(() => {
            clearTimeout(timeoutID)
            const images = getAllImages()
            images.forEach(image => image.classList.remove("computer", "player", "both"))
        }, 2000)
    }
    else {
        clearTimeout(timeoutID)
        const images = getAllImages()
        images.forEach(image => image.classList.remove("computer", "player", "both"))
    }
}

function getAllImages() {
    return document.querySelectorAll('.topContainer img')
}

function incrementScoreBoard(winner: string, points: number) {
    let stars = getStars(winner)
    for (let index = 0; index < points; index++) {

        // Type cast the object inside stars[index] to a HTMLElement so you can access the style property
        const star = stars[index] as HTMLElement
        star.classList.add("black")
    }
}

function getStars(id: string): Node[] {
    let stars: NodeList | Node[] = document.querySelectorAll(`#${id}ScoreBoard .score .star`)
    return Array.from(stars)
}

function resetScoreBoard() {
    setTimeout(() => {
        let allStars: NodeList | Node[] = document.querySelectorAll(`.star`)
        allStars.forEach(star => (star as HTMLElement).classList.remove("black"))
    }, 1000)
}

