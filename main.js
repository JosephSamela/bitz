
// Decare contstants
var state = 1

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYYZ123456789'

const start = document.getElementById("start")
const game = document.getElementById("game")
const gameboard = document.getElementById("gameboard")

var rows = 2
var columns = 3

// Declare functions
function makeRows(rows, cols) {
    removeAllChildNodes(gameboard)
    gameboard.style.setProperty('--grid-rows', rows);
    gameboard.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");

        var randchar = characters[Math.floor(Math.random() * characters.length)]

        cell.innerText = (randchar);
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
}

function showGame() {
    start.style.display = 'none';
    game.style.display = 'unset';
}

function setThemeBlackonWhite() {  
    window.document.body.style.backgroundColor = 'white';
    window.document.body.style.color = 'black';
}

function setThemeWhiteonBlack() {
    window.document.body.style.backgroundColor = 'black';
    window.document.body.style.color = 'white';
}

function setgriddimensions(r, c) {
    rows = r
    columns = c
}

// Handle player inputs
window.onkeydown = function(e) {    
    if (e.keyCode == 32) { // The only input is spacebar, #32
        
        // Switch to control gamestate
        state += 1
        if (state > 2) {
            state = 1
        }

        // Handle different game states
        if (state == 1){
            showStart()
        } else if (state == 2) {
            showGame()
            makeRows(rows, columns);
        }

        return !(e.keyCode == 32 && e.target == document.body);
    }

}; 






makeRows(rows, columns);
