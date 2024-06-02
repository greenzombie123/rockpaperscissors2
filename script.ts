let playerChoice: "rock" | "paper" | "scissors";
let computerChoice: "rock" | "paper" | "scissors";
let playerScore = 0;
let computerScore = 0;

function playGame(choice: string): void {
    const isCorrectInput = checkIsCorrectInput(choice)
    if (!isCorrectInput){
        displayMessage('Please type and enter "rock", "paper" or "scissors"')
        return;
    }

    const computerChoice = getComputerChoice()

    displayMessage(`Computer chose ${computerChoice}`)

    const isPlayerWinner = checkPlayerIsWinner(choice, computerChoice)
    const isComputerWinner = checkComputerIsWinner(choice, computerChoice)

    if(isPlayerWinner){
        playerScore = incrementScore(playerScore)
        displayMessage(`Player is the winner! The score is Player:${playerScore} and Computer:${computerScore}`)
    }

    if(isComputerWinner){
        computerScore = incrementScore(computerScore)
        displayMessage(`Computer is the winner! The score is Player:${playerScore} and Computer:${computerScore}`)
    }

    if(computerScore === 3 || playerScore === 3){
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

function displayMessage(message:string){
    console.log(message)
}

