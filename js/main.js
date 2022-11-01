const computerBtn = document.querySelector('.throw-computer');
const playerBtn = document.querySelector('.throw-player');
const computerNumber1 = document.querySelector('.computer-dice1');
const computerNumber2 = document.querySelector('.computer-dice2');
const playerNumber1 = document.querySelector('.player-dice1');
const playerNumber2 = document.querySelector('.player-dice2');
const higherBtn = document.querySelector('.higher');
const lowerBtn = document.querySelector('.lower');
const message = document.querySelector('.message');
const computerCoins = document.querySelector('.computer-coins');
const playerCoins = document.querySelector('.player-coins');
const themeBtn = document.querySelector('.theme');
const body = document.querySelector('.body');

let playerChoice = "Done";
let computerDice1, computerDice2, computerTotal;
let playerDice1, playerDice2, playerTotal;
let bank = 50;
let myCoins = 50;

computerCoins.textContent = "Coins: " + bank;
playerCoins.textContent = "Coins: " + myCoins;

themeBtn.addEventListener('click', switchTheme);
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
    playerDice1 = undefined;
    playerDice2 = undefined;
    computerDice1 = Math.floor(Math.random() * 6) + 1;
    computerDice2 = Math.floor(Math.random() * 6) + 1;
    computerNumber1.textContent = computerDice1;
    computerNumber2.textContent = computerDice2;
    computerTotal = computerDice1 + computerDice2;
    message.textContent = "Computer heeft " + computerTotal + " gegooid.";
    playerChoice = "Empty"
}

function throwPlayer() {
    checkChoice();
    if (playerChoice !== "Done" && playerChoice !== "Empty") {
        playerDice1 = Math.floor(Math.random() * 6) + 1;
        playerDice2 = Math.floor(Math.random() * 6) + 1;
        playerTotal = playerDice1 + playerDice2;
        checkChoice();
        playerNumber1.textContent = playerDice1;
        playerNumber2.textContent = playerDice2;
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
    if (playerChoice === "Done") {
        message.textContent = "Computer moet gooien";
    }
}

function higher() {
    if (playerTotal > computerTotal) {
        message.textContent = "Speler wint!!" + " Jij gooide " + playerTotal;
        bank -= 5;
        myCoins += 5;
    } else if (playerTotal < computerTotal) {
        message.textContent = "Computer wint." + " Jij gooide " + playerTotal;
        bank += 5;
        myCoins -= 5;
    } else if (playerTotal === computerTotal) {
        message.textContent = "Het is gelijkspel." + " Jij gooide ook " + playerTotal;
    }
    computerCoins.textContent = "Coins: " + bank;
    playerCoins.textContent = "Coins: " + myCoins;
    checkCoins();

}

function lower() {
    if (playerTotal < computerTotal) {
        message.textContent = "Speler wint!!" + " Jij gooide " + playerTotal;
        bank -= 5;
        myCoins += 5;
    } else if (playerTotal > computerTotal) {
        message.textContent = "Computer wint." + " Jij gooide " + playerTotal;
        bank += 5;
        myCoins -= 5;
    } else if (playerTotal == computerTotal) {
        message.textContent = "Het is gelijkspel." + " Jij gooide ook " + playerTotal;
    }
    computerCoins.textContent = "Coins: " + bank;
    playerCoins.textContent = "Coins: " + myCoins;
    checkCoins();
}

function checkCoins() {
    if (myCoins === 0) {
        message.textContent = "The game is over, you lost!";
        return;
    } else if (myCoins === 100) {
        message.textContent = "You win!!";
        return;
    }
}

//switch theme
function switchTheme(){
    body.classList.add('dark-theme');
}