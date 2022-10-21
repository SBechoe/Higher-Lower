const name = prompt("Wat is je naam?");
let playerPoints = 20;
let win;
let lost;
let draw;

while (playerPoints != 0) {
    let pcDice = Math.floor(Math.random() * 6) + 1;
    let playerDice = Math.floor(Math.random() * 6) + 1;
    alert("De computer gooit " + pcDice);
    let guess = prompt("Hoger of lager?");
    alert(name + " gooit " + playerDice);

    if (guess == "hoger") {
        if (playerDice > pcDice) {
            win = alert(name + " wint!!");
            playerPoints += 5;
        } else if (playerDice < pcDice) {
            lost = alert("Computer wint");
            playerPoints -= 5;
        } else if (playerDice == pcDice) {
            draw = alert("Het is gelijkspel");
        }
    }
    if (guess == "lager") {

        if (playerDice < pcDice) {
            win = alert(name + " wint!!");
            playerPoints += 5;
        } else if (playerDice > pcDice) {
            lost = alert("Computer wint");
            playerPoints -= 5;
        } else if (playerDice == pcDice) {
            draw = alert("Het is gelijkspel");
        }
    }

    alert("Punten: " + playerPoints);
}

alert("U heeft "+ playerPoints+" punten, je hebt verloren!");