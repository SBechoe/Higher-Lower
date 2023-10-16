const chooseGame = document.querySelector('.choose-game');
const gameScreen = document.querySelector('.game-screen');
const gameModeChoice = document.querySelector('.choose-game-mode');
const diceRadio = document.querySelector('.dice-choice');
const cardRadio = document.querySelector('.card-choice');
const dicesEl = document.querySelectorAll('.dices');
const cardsEl = document.querySelectorAll('.cards');
const confirmGame = document.querySelector('.confirm-game-mode');
const computerBtn = document.querySelector('.throwComputer');
const playerBtn = document.querySelector('.throwPlayer');
const computerNumber1 = document.querySelector('.computerDice1');
const computerNumber2 = document.querySelector('.computerDice2');
const playerNumber1 = document.querySelector('.playerDice1');
const playerNumber2 = document.querySelector('.playerDice2');
const higherBtn = document.querySelector('.higher');
const drawBtn = document.querySelector('.draw');
const lowerBtn = document.querySelector('.lower');
const message = document.querySelector('.message');
const computerCoins = document.querySelector('.computerCoins');
const playerCoins = document.querySelector('.playerCoins');

const spadesDeck = ["/img/ace_of_spades.png",
    "/img/2_of_spades.png",
    "/img/3_of_spades.png",
    "/img/4_of_spades.png",
    "/img/5_of_spades.png",
    "/img/6_of_spades.png",
    "/img/7_of_spades.png",
    "/img/8_of_spades.png",
    "/img/9_of_spades.png",
    "/img/10_of_spades.png",
    "/img/jack_of_spades.png",
    "/img/queen_of_spades.png",
    "/img/king_of_spades.png"]

let gameMode = "empty";
let playerState = "start";
let computerState = "start";
let computerDice1;
let computerDice2;
let computerTotal;
let playerDice1;
let playerDice2;
let playerTotal;
let bankCoins = 50;
let myCoins = 10;


computerCoins.textContent = "Coins: " + bankCoins;
playerCoins.textContent = "Coins: " + myCoins;

computerBtn.addEventListener('click', throwComputer);
playerBtn.addEventListener('click', throwPlayer);

confirmGame.addEventListener('click', function () {
    if (diceRadio.checked == true) {
        gameMode = "dices";
        chooseGame.classList.toggle('hidden');
        gameScreen.classList.toggle('hidden');
        startGame();

    } else if (cardRadio.checked == true) {
        gameMode = "cards";
        chooseGame.classList.toggle('hidden');
        gameScreen.classList.toggle('hidden');
        startGame();
    } else {
        gameModeChoice.textContent += "!";
    }
});

higherBtn.addEventListener('click', function () {
    if (computerState == "done") {
        playerState = 'higher';
    } else {
        checkChoice();
    }
});

lowerBtn.addEventListener('click', function () {
    if (computerState == "done") {
        playerState = 'lower';
    } else {
        checkChoice();
    }
});

drawBtn.addEventListener('click', function () {
    if (computerState == "done") {
        playerState = 'draw';
    } else {
        checkChoice();
    }
});


function startGame() {
    if (gameMode == "dices") {
        for (let i = 0; i < cardsEl.length; i++) {
            cardsEl[i].classList.toggle('hidden');
        }
    } else if (gameMode == "cards") {
        for (let i = 0; i < dicesEl.length; i++) {
            dicesEl[i].classList.toggle('hidden');
        }
    }
}

function throwComputer() {
    if (computerState == "start") {
        playerDice1 = 0;
        playerDice2 = 0;
        computerDice1 = Math.floor(Math.random() * 6);
        computerDice2 = Math.floor(Math.random() * 6);
        computerNumber1.innerHTML = dices[computerDice1];
        computerNumber2.innerHTML = dices[computerDice2];
        computerTotal = computerDice1 + 1 + computerDice2 + 1;
        message.innerHTML = "Computer heeft " + computerTotal + " gegooid.";
        playerState = "empty";
        computerState = "done";
    }
}

function throwPlayer() {
    if (playerState !== "Start" && playerState !== "Empty") {
        playerDice1 = Math.floor(Math.random() * 6);
        playerDice2 = Math.floor(Math.random() * 6);
        playerTotal = playerDice1 + 1 + playerDice2 + 1;
        checkChoice();
        playerNumber1.innerHTML = dices[playerDice1];
        playerNumber2.innerHTML = dices[playerDice2];
        playerState = "start";
        computerState = "start";
    } else {
        checkChoice();
    }
}

function checkChoice() {
    switch (playerState) {
        case "empty":
            message.innerHTML = "Choose Higher or Lower";
            break;
        case "start":
            message.innerHTML = "Not your turn! It is the Computer turn!";
            break;
        case "higher":
            higher();
            break;
        case "lower":
            lower();
            break;
        case "draw":
            draw();
            break;
    }
}

function higher() {
    if (playerTotal > computerTotal) {
        message.innerHTML = "Player wins!!" + " You threw " + playerTotal;
        bankCoins -= 5;
        myCoins += 5;
    } else if (playerTotal < computerTotal) {
        message.innerHTML = "Computer wins." + " You threw " + playerTotal;
        bankCoins += 5;
        myCoins -= 5;
    } else if (playerTotal === computerTotal) {
        message.innerHTML = "It's a draw!" + " You also threw " + playerTotal;
    }
    computerCoins.textContent = "Coins: " + bankCoins;
    playerCoins.textContent = "Coins: " + myCoins;
    setTimeout(checkCoins, 5000);

}

function draw() {
    if (playerTotal == computerTotal) {
        message.innerHTML = "Jackpot!" + "<br>" + "It's a draw!" + " You also threw " + playerTotal;
        myCoins += 50;
    } else if (playerTotal < computerTotal) {
        message.innerHTML = "Niemand wins." + " You threw " + playerTotal;
        myCoins -= 5;
    } else if (playerTotal > computerTotal) {
        message.innerHTML = "Niemand wins." + " You threw " + playerTotal;
        myCoins -= 5;
    }
    computerCoins.textContent = "Coins: " + bankCoins;
    playerCoins.textContent = "Coins: " + myCoins;
    setTimeout(checkCoins, 5000);
}

function lower() {
    if (playerTotal < computerTotal) {
        message.innerHTML = "Player wins!!" + " You threw " + playerTotal;
        bankCoins -= 5;
        myCoins += 5;
    } else if (playerTotal > computerTotal) {
        message.innerHTML = "Computer wins." + " You threw " + playerTotal;
        bankCoins += 5;
        myCoins -= 5;
    } else if (playerTotal == computerTotal) {
        message.innerHTML = "It's a draw!" + " You also threw " + playerTotal;
    }
    computerCoins.textContent = "Coins: " + bankCoins;
    playerCoins.textContent = "Coins: " + myCoins;
    setTimeout(checkCoins, 5000);
}

function checkCoins() {
    if (myCoins === 0) {
        message.innerHTML = "The game is over, you lose!";
        return;
    } else if (myCoins >= 100) {
        message.innerHTML = myCoins + " POINTS!!" + "<br>" + " You win!!";
        return;
    }
}