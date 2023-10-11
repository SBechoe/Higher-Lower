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

let playerState = "Start";
let computerState = "Start"
let computerCard1;
let computerCard2;
let computerTotal;
let playerCard1;
let playerCard2;
let playerTotal;
let bankCoins = 50;
let myCoins = 10;


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
drawBtn.addEventListener('click', function () {
    if (computerState == "Done") {
        playerState = 'Draw';
    } else {
        checkChoice();
    }
});

function throwComputer() {
    if (computerState == "Start") {
        playerCard1 = 0;
        playerCard2 = 0;
        computerCard1 = Math.floor(Math.random() * 6);
        computerCard2 = Math.floor(Math.random() * 6);
        computerNumber1.innerHTML = Cards[computerCard1];
        computerNumber2.innerHTML = Cards[computerCard2];
        computerTotal = computerCard1 + 1 + computerCard2 + 1;
        message.innerHTML = "Computer heeft " + computerTotal + " gegooid.";
        playerState = "Empty";
        computerState = "Done";
    }
}

function throwPlayer() {
    if (playerState !== "Start" && playerState !== "Empty") {
        playerCard1 = Math.floor(Math.random() * 6);
        playerCard2 = Math.floor(Math.random() * 6);
        playerTotal = playerCard1 + 1 + playerCard2 + 1;
        checkChoice();
        playerNumber1.innerHTML = Cards[playerCard1];
        playerNumber2.innerHTML = Cards[playerCard2];
        playerState = "Start";
        computerState = "Start";
    } else {
        checkChoice();
    }
}

function checkChoice() {
    switch (playerState) {
        case "Empty":
            message.innerHTML = "Choose Higher or Lower";
            break;
        case "Start":
            message.innerHTML = "Not your turn! It is the Computer turn!";
            break;
        case "Higher":
            higher();
            break;
        case "Lower":
            lower();
            break;
        case "Draw":
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