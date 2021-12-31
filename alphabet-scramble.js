// Decare contstants
var state = 1

const start = document.getElementById("start")
const game = document.getElementById("game")
const gameboard = document.getElementById("gameboard")
const score = document.getElementById("score")

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ '

var gamemode = 'upper' // options are 'upper', 'lower' and 'upperandlower'
var rows = 3
var columns = 9

var appendTens = document.getElementById("tens")
var appendSeconds = document.getElementById("seconds")
var seconds = 00;
var tens = 00;

// Declare functions
function makeRows(rows, cols) {
    removeAllChildNodes(gameboard)
    gameboard.style.setProperty('--grid-rows', rows);
    gameboard.style.setProperty('--grid-cols', cols);

    var characters = alphabet.shuffle()

    for (c = 0; c < 27; c++) {
        let cell = document.createElement("div");

        if (gamemode == 'upper') {
            char = characters[c].toUpperCase()
        } else if (gamemode == 'lower') {
            char = characters[c].toLowerCase()
        } else if (gamemode == 'upperandlower') {
            var decision = Math.round(Math.random())
            if (decision == 0) {
                char = characters[c].toUpperCase()
            } else if (decision == 1) {
                char = characters[c].toLowerCase()
            }
        }

        cell.innerText = (char);
        gameboard.appendChild(cell).className = "grid-item";
    };
};

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function showStart() {
    start.style.display = 'unset';
    game.style.display = 'none';
    score.style.display = 'none';
}

function showGame() {
    start.style.display = 'none';
    game.style.display = 'unset';
    score.style.display = 'none';

}

function showScore() {
    start.style.display = 'none';
    game.style.display = 'none';
    score.style.display = 'unset';

    document.getElementById("tensResult").innerHTML = tens;
    document.getElementById("secondsResult").innerHTML = seconds;
}

function setThemeBlackonWhite() {
    window.document.body.style.backgroundColor = 'white';
    window.document.body.style.color = 'black';
}

function setThemeWhiteonBlack() {
    window.document.body.style.backgroundColor = 'black';
    window.document.body.style.color = 'white';
}

function setgamemode(mode) {
    gamemode = mode
}

function stopTimer() {
    clearInterval(Interval);
}

function resetTimer() {
    tens = "00";
    seconds = "00";
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = seconds;
}

function startTimer() {
    tens++;

    if (tens <= 9) {
        appendTens.innerHTML = "0" + tens;
    }

    if (tens > 9) {
        appendTens.innerHTML = tens;

    }

    if (tens > 99) {
        console.log("seconds");
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
    }

    if (seconds > 9) {
        appendSeconds.innerHTML = seconds;
    }

}

String.prototype.shuffle = function() {
    var a = this.split(""),
        n = a.length;

    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

// Handle player inputs
window.onkeydown = function(e) {
    if (e.keyCode == 32) { // The only input is spacebar, #32

        // Switch to control gamestate
        state += 1
        if (state > 3) {
            state = 1
            stopTimer()
        }

        // Handle different game states
        if (state == 1) {
            showStart()
        } else if (state == 2) {
            showGame()
            resetTimer()
            Interval = setInterval(startTimer, 10);
            makeRows(rows, columns);
        } else if (state == 3) {
            showScore()
        }

        return !(e.keyCode == 32 && e.target == document.body);
    }

};

makeRows(rows, columns);

Interval = setInterval(startTimer, 100);