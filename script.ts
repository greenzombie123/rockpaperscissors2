let playerChoice;
let computerChoice;

function playGame(choice:string){
}

function getComputerChoice(){
    const choices = ["rock", "paper", "scissors"];

    let index = Math.floor(Math.random() * 3)

    return choices[index]
}