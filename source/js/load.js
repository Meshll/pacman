let gameboard = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 0, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 2, 2, 2, 1, 0, 0, 0, 1, 2, 2, 2, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 0, 0, 0, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
    [1, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 1],
    [1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1],
    [1, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1],
    [1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];


let spritePacmanRight = [];
let spritePacmanLeft = [];
let spritePacmanDown = [];
let spritePacmanUp = [];

let spriteEnemyPacmanRight = [];
let spriteEnemyPacmanLeft = [];
let spriteEnemyPacmanDown = [];
let spriteEnemyPacmanUp = [];

let spriteGhost = [];

let spriteEnemyGhost = [];

var spritePacmanIndx = 0;
var spritePacmanStep = 0;

var spriteGhostIndx = 0;
var spriteGhostStep = 0;


['-right', '2-right', '3', '2-right', '-right'].forEach(function(indx) {
    let png = new Image();
    png.src = "images/pacman" + indx + ".png";
    spritePacmanRight.push(png);
});

['-left', '2-left', '3', '2-left', '-left'].forEach(function(indx) {
    let png = new Image();
    png.src = "images/pacman" + indx + ".png";
    spritePacmanLeft.push(png);
});

['-up', '2-up', '3', '2-up', '-up'].forEach(function(indx) {
    let png = new Image();
    png.src = "images/pacman" + indx + ".png";
    spritePacmanUp.push(png);
});

['-down', '2-down', '3', '2-down', '-down'].forEach(function(indx) {
    let png = new Image();
    png.src = "images/pacman" + indx + ".png";
    spritePacmanDown.push(png);
});



['-right', '2-right', '3', '2-right', '-right'].forEach(function(indx) {
    let png = new Image();
    png.src = "images/enemy-pacman" + indx + ".png";
    spriteEnemyPacmanRight.push(png);
});

['-left', '2-left', '3', '2-left', '-left'].forEach(function(indx) {
    let png = new Image();
    png.src = "images/enemy-pacman" + indx + ".png";
    spriteEnemyPacmanLeft.push(png);
});

['-up', '2-up', '3', '2-up', '-up'].forEach(function(indx) {
    let png = new Image();
    png.src = "images/enemy-pacman" + indx + ".png";
    spriteEnemyPacmanUp.push(png);
});

['-down', '2-down', '3', '2-down', '-down'].forEach(function(indx) {
    let png = new Image();
    png.src = "images/enemy-pacman" + indx + ".png";
    spriteEnemyPacmanDown.push(png);
});


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
['1', '2'].forEach(function(indx) {
    let png = new Image();
    png.src = "images/blinky" + indx + ".png";
    spriteGhost.push(png);
});

['1', '2'].forEach(function(indx) {
    let png = new Image();
    png.src = "images/blinky1" + indx + ".png";
    spriteEnemyGhost.push(png);
});


let brick = new Image();
brick.src = "images/brick.png";

let dot = new Image();
dot.src = "images/dot.png";

let chili = new Image();
chili.src = "images/chili.png";