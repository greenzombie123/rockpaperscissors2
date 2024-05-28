let playerChoice: "rock"|"paper"|"scissors";
let computerChoice:"rock"|"paper"|"scissors";
let playerScore = 0;
let computerScore = 0;

function playGame(choice:string){
}

function getComputerChoice():string{
    const choices = ["rock", "paper", "scissors"];

    let index = Math.floor(Math.random() * 3)

    return choices[index]
}