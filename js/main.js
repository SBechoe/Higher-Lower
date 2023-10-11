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

let playerState = "Start";
let computerState = "Start"
let computerDice1;
let computerDice2;
let computerTotal;
let playerDice1;
let playerDice2;
let playerTotal;
let bankCoins = 50;
let myCoins = 50;
const dices = ["&#9856;", "&#9857;", "&#9858;", "&#9859;", "&#9860;", "&#9861;"];

computerCoins.textContent = "Coins: " + bankCoins;
playerCoins.textContent = "Coins: " + myCoins;

computerBtn.addEventListener('click', throwComputer);
playerBtn.addEventListener('click', throwPlayer);

higherBtn.addEventListener('click', function () {
    if (computerState == "Done") {
        playerState = 'Higher';
    } else {
        checkChoice();
    }
});
lowerBtn.addEventListener('click', function () {
    if (computerState == "Done") {
        playerState = 'Lower';
    } else {
        checkChoice();
    }
});

function throwComputer() {
    if (computerState == "Start") {
        playerDice1 = 0;
        playerDice2 = 0;
        computerDice1 = Math.floor(Math.random() * 6);
        computerDice2 = Math.floor(Math.random() * 6);
        computerNumber1.innerHTML = dices[computerDice1];
        computerNumber2.innerHTML = dices[computerDice2];
        computerTotal = computerDice1 + 1 + computerDice2 + 1;
        message.textContent = "Computer heeft " + computerTotal + " gegooid.";
        playerState = "Empty";
        computerState = "Done";
    }
}

function throwPlayer() {
    if (playerState !== "Start" && playerState !== "Empty") {
        playerDice1 = Math.floor(Math.random() * 6);
        playerDice2 = Math.floor(Math.random() * 6);
        playerTotal = playerDice1 + playerDice2;
        checkChoice();
        playerNumber1.innerHTML = dices[playerDice1];
        playerNumber2.innerHTML = dices[playerDice2];
        playerState = "Start";
        computerState = "Start";
    } else {
        checkChoice();
    }
}

function checkChoice() {
    switch (playerState) {
        case "Empty":
            message.textContent = "Kies eerst Hoger of Lager";
            break;
        case "Start":
            message.textContent = "Computer moet gooien";
            break;
        case "Higher":
            higher();
            break;
        case "Lower":
            lower();
            break;
    }
}

function higher() {
    if (playerTotal > computerTotal) {
        message.textContent = "Speler wint!!" + " Jij gooide " + playerTotal;
        bankCoins -= 5;
        myCoins += 5;
    } else if (playerTotal < computerTotal) {
        message.textContent = "Computer wint." + " Jij gooide " + playerTotal;
        bankCoins += 5;
        myCoins -= 5;
    } else if (playerTotal === computerTotal) {
        message.textContent = "Het is gelijkspel." + " Jij gooide ook " + playerTotal;
    }
    computerCoins.textContent = "Coins: " + bankCoins;
    playerCoins.textContent = "Coins: " + myCoins;
    checkCoins();

}

function lower() {
    if (playerTotal < computerTotal) {
        message.textContent = "Speler wint!!" + " Jij gooide " + playerTotal;
        bankCoins -= 5;
        myCoins += 5;
    } else if (playerTotal > computerTotal) {
        message.textContent = "Computer wint." + " Jij gooide " + playerTotal;
        bankCoins += 5;
        myCoins -= 5;
    } else if (playerTotal == computerTotal) {
        message.textContent = "Het is gelijkspel." + " Jij gooide ook " + playerTotal;
    }
    computerCoins.textContent = "Coins: " + bankCoins;
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