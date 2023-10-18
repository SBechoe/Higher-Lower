const chooseGame = document.querySelector('.choose-game');
const gameScreen = document.querySelector('.game-screen');
const gameModeChoice = document.querySelector('.choose-game-mode');
const diceRadio = document.querySelector('.dice-choice');
const cardRadio = document.querySelector('.card-choice');
const dicesEl = document.querySelectorAll('.dices');
const cardsEl = document.querySelectorAll('.cards');
const confirmGame = document.querySelector('.confirm-game-mode');
const computerBtn = document.querySelector('.throw-Computer');
const playerBtn = document.querySelector('.throw-Player');
const computerDice1El = document.querySelector('.computer-Dice1');
const computerDice2El = document.querySelector('.computer-Dice2');
const playerDice1El = document.querySelector('.player-Dice1');
const playerDice2El = document.querySelector('.player-Dice2');
const computerCard1El = document.querySelector('.computer-card1');
const computerCard2El = document.querySelector('.computer-card2');
const playerCard1El = document.querySelector('.player-card1');
const playerCard2El = document.querySelector('.player-card2');
const higherBtn = document.querySelector('.higher');
const drawBtn = document.querySelector('.draw');
const lowerBtn = document.querySelector('.lower');
const message = document.querySelector('.outcome');
const computerCoins = document.querySelector('.computer-Coins');
const playerCoins = document.querySelector('.player-Coins');

const dices = ["&#9856;", "&#9857;", "&#9858;", "&#9859;", "&#9860;", "&#9861;"];

const spades = [
    "/img/ace_of_spades.png",
    "/img/2_of_spades.png",
    "/img/3_of_spades.png",
    "/img/4_of_spades.png",
    "/img/5_of_spades.png",
    "/img/6_of_spades.png",
    "/img/7_of_spades.png",
    "/img/8_of_spades.png",
    "/img/9_of_spades.png",
    "/img/10_of_spades.png",
    "/img/jack_of_spades2.png",
    "/img/queen_of_spades2.png",
    "/img/king_of_spades2.png"
];
const clubs = [
    "/img/ace_of_clubs.png",
    "/img/2_of_clubs.png",
    "/img/3_of_clubs.png",
    "/img/4_of_clubs.png",
    "/img/5_of_clubs.png",
    "/img/6_of_clubs.png",
    "/img/7_of_clubs.png",
    "/img/8_of_clubs.png",
    "/img/9_of_clubs.png",
    "/img/10_of_clubs.png",
    "/img/jack_of_clubs2.png",
    "/img/queen_of_clubs2.png",
    "/img/king_of_clubs2.png"
];
const hearts = [
    "/img/ace_of_hearts.png",
    "/img/2_of_hearts.png",
    "/img/3_of_hearts.png",
    "/img/4_of_hearts.png",
    "/img/5_of_hearts.png",
    "/img/6_of_hearts.png",
    "/img/7_of_hearts.png",
    "/img/8_of_hearts.png",
    "/img/9_of_hearts.png",
    "/img/10_of_hearts.png",
    "/img/jack_of_hearts2.png",
    "/img/queen_of_hearts2.png",
    "/img/king_of_hearts2.png"
];
const diamonds = [
    "/img/ace_of_diamonds.png",
    "/img/2_of_diamonds.png",
    "/img/3_of_diamonds.png",
    "/img/4_of_diamonds.png",
    "/img/5_of_diamonds.png",
    "/img/6_of_diamonds.png",
    "/img/7_of_diamonds.png",
    "/img/8_of_diamonds.png",
    "/img/9_of_diamonds.png",
    "/img/10_of_diamonds.png",
    "/img/jack_of_diamonds2.png",
    "/img/queen_of_diamonds2.png",
    "/img/king_of_diamonds2.png"
];

let gameMode = "empty";
let playerState = "start";
let computerState = "start";
let randomFigure;
let figure;
let computerNumber1 = 0;
let computerNumber2 = 0;
let computerTotal;
let playerNumber1 = 0;
let playerNumber2 = 0;
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
        computerBtn.innerHTML = "Draw card";
        playerBtn.innerHTML = "Draw card";
    }
}

function pickRandomFigure() {
    randomFigure = Math.floor(Math.random() * 4) + 1;
    switch (randomFigure) {
        case 1:
            figure = spades;
            break;
        case 2:
            figure = hearts;
            break;
        case 3:
            figure = diamonds;
            break;
        case 4:
            figure = clubs;
            break;
    }
}

function throwComputer() {
    if (computerState == "start") {
        playerNumber1 = 0;
        playerNumber2 = 0;

        if (gameMode == "dices") {
            computerNumber1 = Math.floor(Math.random() * 6);
            computerNumber2 = Math.floor(Math.random() * 6);
            computerDice1El.innerHTML = dices[computerNumber1];
            computerDice2El.innerHTML = dices[computerNumber2];
        } else if (gameMode == "cards") {
            while (computerNumber1 == 0 || computerNumber2 == 0) {
                pickRandomFigure();
                computerNumber1 = Math.floor(Math.random() * 13);
                computerCard1El.src = figure[computerNumber1];
                pickRandomFigure();
                computerNumber2 = Math.floor(Math.random() * 13);
                computerCard2El.src = figure[computerNumber2];
            }
        }
        computerTotal = computerNumber1 + 1 + computerNumber2 + 1;
        message.innerHTML = "Computer total is " + computerTotal;
        playerState = "empty";
        computerState = "done";
    } else if (computerState == "done") {
        message.innerHTML = "Computer had its turn.";
    }
}

function throwPlayer() {
    if (playerState !== "start" && playerState !== "empty") {

        if (gameMode == "dices") {
            playerNumber1 = Math.floor(Math.random() * 6);
            playerNumber2 = Math.floor(Math.random() * 6);
            playerDice1El.innerHTML = dices[playerNumber1];
            playerDice2El.innerHTML = dices[playerNumber2];

        } else if (gameMode == "cards") {
            while (playerNumber1 == 0 || playerNumber2 == 0) {
                pickRandomFigure();
                playerNumber1 = Math.floor(Math.random() * 13);
                playerCard1El.src = figure[playerNumber1];
                pickRandomFigure();
                playerNumber2 = Math.floor(Math.random() * 13);
                playerCard2El.src = figure[playerNumber2];
            }
        }
        playerTotal = playerNumber1 + 1 + playerNumber2 + 1;
        checkChoice();

        playerState = "start";
        computerState = "start";

        computerNumber1 = 0;
        computerNumber2 = 0;
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
        message.innerHTML = "Player wins!!" + " Your total is " + playerTotal;
        bankCoins -= 5;
        myCoins += 5;
    } else if (playerTotal < computerTotal) {
        message.innerHTML = "Computer wins." + " Your total is " + playerTotal;
        bankCoins += 5;
        myCoins -= 5;
    } else if (playerTotal === computerTotal) {
        message.innerHTML = "It's a draw!" + " Your total is also " + playerTotal;
    }
    computerCoins.textContent = "Coins: " + bankCoins;
    playerCoins.textContent = "Coins: " + myCoins;
    checkCoins();
}

function draw() {
    if (playerTotal == computerTotal) {
        message.innerHTML = "Jackpot!" + "<br>" + "It's a draw!" + " Your total is also " + playerTotal;
        myCoins += 50;
    } else if (playerTotal < computerTotal) {
        message.innerHTML = "No one won." + " Your total is " + playerTotal;
        myCoins -= 5;
    } else if (playerTotal > computerTotal) {
        message.innerHTML = "No one won." + " Your total is " + playerTotal;
        myCoins -= 5;
    }
    computerCoins.textContent = "Coins: " + bankCoins;
    playerCoins.textContent = "Coins: " + myCoins;
    checkCoins();
}

function lower() {
    if (playerTotal < computerTotal) {
        message.innerHTML = "Player wins!!" + " Your total is " + playerTotal;
        bankCoins -= 5;
        myCoins += 5;
    } else if (playerTotal > computerTotal) {
        message.innerHTML = "Computer wins." + " Your total is " + playerTotal;
        bankCoins += 5;
        myCoins -= 5;
    } else if (playerTotal == computerTotal) {
        message.innerHTML = "It's a draw!" + " Your total is also " + playerTotal;
    }
    computerCoins.textContent = "Coins: " + bankCoins;
    playerCoins.textContent = "Coins: " + myCoins;
    checkCoins();
}

function checkCoins() {
    if (myCoins === 0) {
        message.innerHTML = "The game is over, you lose!";
        computerBtn.disabled = true;
        playerBtn.disabled = true;
        higherBtn.disabled = true;
        drawBtn.disabled = true;
        lowerBtn.disabled = true;
        return;
    } else if (myCoins >= 100) {
        message.innerHTML += "<br>" + myCoins + " COINS!!" + "<br>" + " You win!!";
        computerBtn.disabled = true;
        playerBtn.disabled = true;
        higherBtn.disabled = true;
        drawBtn.disabled = true;
        lowerBtn.disabled = true;
        return;
    }
}