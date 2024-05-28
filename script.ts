let playerChoice: "rock" | "paper" | "scissors";
let computerChoice: "rock" | "paper" | "scissors";
let playerScore = 0;
let computerScore = 0;

function playGame(choice: string) {
}

function getComputerChoice(): string {
    const choices = ["rock", "paper", "scissors"];

    let index = Math.floor(Math.random() * 3)

    return choices[index]
}

function checkWinner(playerChoice: string, computerChoice: string): string {
    if (playerChoice === "rock" && computerChoice === "scissors" ||
        playerChoice === "scissors" && computerChoice === "paper" ||
        playerChoice === "paper" && computerChoice === "rock"
    ) {
        return "player"
    }
    else if (playerChoice === "rock" && computerChoice === "paper" ||
    playerChoice === "scissors" && computerChoice === "rock" ||
    playerChoice === "paper" && computerChoice === "scissors"){
        return "computer"
    }
    else 
        return "draw"
}