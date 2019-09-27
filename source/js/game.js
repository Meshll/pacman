console.log("Its working!")
var bw = 300;
var bh = 300;
var p = 10;
var cw = bw + (p * 2) + 1;
var ch = bh + (p * 2) + 1;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function drawBoard() {
    // if (x / 15 % 2 == ) {
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
    // }
}

function drawMap(){
    for(let i = 0; i < gameboard.length; i++)
        for (let j = 0; j < gameboard[i].length; j++){
            if (gameboard[i][j] == 1){
                ctx.drawImage(brick, 0.5 + p + j * 15 - 15, 0.5 + p + i * 15 - 15, 30, 30);
            }
            if (gameboard[i][j] == 2){
                ctx.drawImage(dot, 0.5 + p + j * 15 - 10, 0.5 + p + i * 15 - 10, 21, 21);
            }
        }
}

var x = canvas.width - 305;
var y = canvas.height - 305;
var dx = 2;
var dy = 2;
var dirX = 1;
var dirY = 0;
var future = 'N';


const refX = firebase.database().ref('x');
const refY = firebase.database().ref('y');


function drawPacman() {
    ctx.drawImage(spritePacman[spritePacmanIndx], x + 3, y + 3, 15, 15);
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
    if (x % 15 == 0 && y % 15 == 0) {
        switch (future) {
            case 'U':
                dirX = 0, dirY = -1, future = 'N';
                break;
            case 'D':
                dirX = 0, dirY = 1, future = 'N';
                break;
            case 'L':
                dirX = -1, dirY = 0, future = 'N';
                break;
            case 'R':
                dirX = 1, dirY = 0, future = 'N';
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
    if (x + dirX * dx >= 15 && x + dirX * dx <= canvas.width - 34) {
        x = x + dirX * dx;
    }
    if (y + dirY * dy >= 15 && y + dirY * dy <= canvas.height - 34) {
        y = y + dirY * dy;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawBoard();
    drawMap();
    drawPacman();
    checkCollision();

    // console.log(x, y);
}

setInterval(draw, 20);