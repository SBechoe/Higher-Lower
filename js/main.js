const computerBtn = document.querySelector('.throwComputer');
const playerBtn = document.querySelector('.throwPlayer');
const computerNumber = document.querySelector('.computerNumber');
const playerNumber = document.querySelector('.playerNumber');
const higherBtn = document.querySelector('.higher');
const lowerBtn = document.querySelector('.lower');
const message = document.querySelector('.message');
const computerCoins = document.querySelector('.computerCoins');
const playerCoins = document.querySelector('.playerCoins');

let playerChoice = "Done";
let computerDice;
let playerDice;
let bank = 5;
let myCoins = 95;
computerCoins.textContent = "Coins: " + bank;
playerCoins.textContent = "Coins: " + myCoins;

computerBtn.addEventListener('click', throwComputer);
playerBtn.addEventListener('click', throwPlayer);
higherBtn.addEventListener('click', function () {
    playerChoice = 'Higher';
    checkChoice();
});
lowerBtn.addEventListener('click', function () {
    playerChoice = 'Lower';
    checkChoice();
});

function throwComputer() {
    playerDice = undefined;
    computerDice = Math.floor(Math.random() * 6) + 1;
    computerNumber.textContent = computerDice;
    message.textContent = "Computer heeft gegooid.";
    playerChoice = "Empty"
}

function throwPlayer() {
    checkChoice();
    if (playerChoice !== "Done" && playerChoice !== "Empty") {
        playerDice = Math.floor(Math.random() * 6) + 1;
        checkChoice();
        playerNumber.textContent = playerDice;
        playerChoice = "Done";
    }
}

function checkChoice() {
    if (playerChoice === "Higher") {
        higher();
    }
    if (playerChoice === "Lower") {
        lower();
    }
    if (playerChoice === "Empty") {
        message.textContent = "Kies eerst Hoger of Lager";
    }
    if (playerChoice === "Done"){
        message.textContent = "Computer moet gooien";
    }
}

function higher() {
    if (playerDice > computerDice) {
        message.textContent = "Speler wint!!";
        bank -= 5;
        myCoins += 5;
    } else if (playerDice < computerDice) {
        message.textContent = "Computer wint";
        bank += 5;
        myCoins -= 5;
    } else if (playerDice === computerDice) {
        message.textContent = "Het is gelijkspel";
    }
    computerCoins.textContent = "Coins: " + bank;
    playerCoins.textContent = "Coins: " + myCoins;
    checkCoins();

}

function lower() {
    if (playerDice < computerDice) {
        message.textContent = "Speler wint!!";
        bank -= 5;
        myCoins += 5;
    } else if (playerDice > computerDice) {
        message.textContent = "Computer wint";
        bank += 5;
        myCoins -= 5;
    } else if (playerDice == computerDice) {
        message.textContent = "Het is gelijkspel";
    }
    computerCoins.textContent = "Coins: " + bank;
    playerCoins.textContent = "Coins: " + myCoins;
    checkCoins();
}

function checkCoins(){
    if(myCoins === 0){
        message.textContent = "The game is over, you lost!";
        return;
    }else if(myCoins === 100){
        message.textContent = "You win!!";        
        return;
    }
}