const computerBtn = document.querySelector('.throwComputer');
const playerBtn = document.querySelector('.throwPlayer');
const computerNumber1 = document.querySelector('.computerDice1');
const computerNumber2 = document.querySelector('.computerDice2');
const playerNumber1 = document.querySelector('.playerDice1');
const playerNumber2 = document.querySelector('.playerDice2');
const higherBtn = document.querySelector('.higher');
const lowerBtn = document.querySelector('.lower');
const message = document.querySelector('.message');
const computerCoins = document.querySelector('.computerCoins');
const playerCoins = document.querySelector('.playerCoins');

let playerChoice = "Done";
let computerDice1;
let computerDice2;
let computerTotal;
let playerDice1;
let playerDice2;
let playerTotal;
let bank = 50;
let myCoins = 50;
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