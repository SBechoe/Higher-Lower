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

let playerState = "Start";
let computerState = "Start"
let computerDice1;
let computerDice2;
let computerTotal;
let playerDice1;
let playerDice2;
let playerTotal;
let bankCoins = 50;
let myCoins = 10;
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
drawBtn.addEventListener('click', function () {
    if (computerState == "Done") {
        playerState = 'Draw';
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
        message.innerHTML = "Computer heeft " + computerTotal + " gegooid.";
        playerState = "Empty";
        computerState = "Done";
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