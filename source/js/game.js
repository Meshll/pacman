console.log("Its working!")
var bw = 300;
var bh = 300;
var p = 10;
var cw = bw + (p * 2) + 1;
var ch = bh + (p * 2) + 1;
var temp1, temp2;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function drawBoard() {
    for (var x = 0; x <= bw; x += 15) {
        ctx.beginPath();
        ctx.moveTo(0.5 + x + p, p);
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 1;
        ctx.lineTo(0.5 + x + p, bh + p);
        ctx.stroke();
    }

    for (var x = 0; x <= bh; x += 15) {
        ctx.beginPath();
        ctx.moveTo(p, 0.5 + x + p);
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 1;
        ctx.lineTo(bw + p, 0.5 + x + p);
        ctx.stroke();
    }

    for (var x = 15; x <= bw; x += 30) {
        ctx.beginPath();
        ctx.moveTo(0.5 + x + p, p + 15);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.lineTo(0.5 + x + p, bh + p - 14);
        ctx.stroke();
    }

    for (var x = 15; x <= bh; x += 30) {
        ctx.beginPath();
        ctx.moveTo(p + 15, 0.5 + x + p);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.lineTo(bw + p - 14, 0.5 + x + p);
        ctx.stroke();
    }
}

function drawMap() {
    for (let i = 0; i < gameboard.length; i++) {
        for (let j = 0; j < gameboard[i].length; j++) {
            if (gameboard[i][j] == 1) {
                ctx.drawImage(brick, 0.5 + p + j * 15 - 15, 0.5 + p + i * 15 - 15, 30, 30);
            }
            if (gameboard[i][j] == 2) {
                ctx.drawImage(dot, 0.5 + p + j * 15 - 10, 0.5 + p + i * 15 - 10, 21, 21);
            }
            if (gameboard[i][j] == 3) {
                ctx.drawImage(chili, 0.5 + p + j * 15 - 10, 0.5 + p + i * 15 - 10, 21, 21);
            }
        }
    }
    i = 2;
    j = 2;
}

var x = canvas.width - 305;
var y = canvas.height - 305;
var dx = 1;
var dy = 1;
var dirX = 1;
var dirY = 0;
var current = 'R';
var future = 'N';


const refX = firebase.database().ref('x');
const refY = firebase.database().ref('y');


function drawPacman() {
    checkCollision();

    if (current == 'R') {
        ctx.drawImage(spritePacmanRight[spritePacmanIndx], x + 3, y + 3, 15, 15);
    }
    if (current == 'L') {
        ctx.drawImage(spritePacmanLeft[spritePacmanIndx], x + 3, y + 3, 15, 15);
    }
    if (current == 'D') {
        ctx.drawImage(spritePacmanDown[spritePacmanIndx], x + 3, y + 3, 15, 15);
    }
    if (current == 'U') {
        ctx.drawImage(spritePacmanUp[spritePacmanIndx], x + 3, y + 3, 15, 15);
    }
    //console.log(current);


    spritePacmanStep += 1;
    if (spritePacmanStep == 5) {
        spritePacmanIndx++;
        if (spritePacmanIndx == 5) {
            spritePacmanIndx = 0;
        }
        spritePacmanStep = 0;
    }
}

function switchDir() {
    //console.log(x, y);
    if ((2 * x) % 15 == 0 && (2 * y) % 15 == 0) {
        switch (future) {
            case 'U':
                dirX = 0, dirY = -1, current = future, future = 'N';
                break;
            case 'D':
                dirX = 0, dirY = 1, current = future, future = 'N';
                break;
            case 'L':
                dirX = -1, dirY = 0, current = future, future = 'N';
                break;
            case 'R':
                dirX = 1, dirY = 0, current = future, future = 'N';
                break;
            case 'S':
                dirX = 0, dirY = 0, future = 'N';
                break;
            default:
                break;
        }
    }
}


function checkCollision() {
    if (future != 'N') {
        switchDir();
    }
    let cordx;
    let cordy;
    if (dirY == 0 && dirX == 0) {
        stop();
        return;
    }
    if (dirY == -1 || dirX == -1) {
        cordx = Math.ceil(y / 15);
        cordy = Math.ceil(x / 15);
    }
    if (dirX == 1 || dirY == 1) {
        cordy = Math.floor(x / 15);
        cordx = Math.floor(y / 15);
    }

    temp1 = cordx;
    temp2 = cordy;

    if (dirX == 1) {
        cordy = cordy + 1;
    }
    if (dirX == -1) {
        cordy = cordy - 1;
    }

    if (dirY == 1) {
        cordx = cordx + 1;
    }

    if (dirY == -1) {
        cordx = cordx - 1;
    }
    //console.log(cordx, cordy)
    if (x % 15 == 1 || y % 15 == 1) {
        if (temp1 != cordx) {
            if (gameboard[cordx][cordy] == 1) {
                cordx = cordx - dirX;
            }
            console.log(cordx, cordy)
        }
        if (temp2 != cordy) {
            if (gameboard[cordx][cordy] == 1) {
                cordy = cordy - dirY;
            }
            console.log(cordx, cordy)
        }
    }
    if (gameboard[cordx][cordy] == 2) {
        gameboard[cordx][cordy] = 0;
        // addscore();
    }
    // ghost only
    // if (gameboard[cordx][cordy] == 3) {
    //     gameboard[cordx][cordy] = 0;
    // powerup();
    // }
    if (gameboard[cordx][cordy] == 1) {
        Stop();
    } else {
        if (x + dirX * dx >= 15 && x + dirX * dx <= canvas.width - 35) {
            x = x + dirX * dx;
        }
        if (y + dirY * dy >= 15 && y + dirY * dy <= canvas.height - 35) {
            y = y + dirY * dy;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawBoard();
    drawMap();
    drawPacman();
    // checkCollision();

    // console.log(x, y);
}

setInterval(draw, 12);