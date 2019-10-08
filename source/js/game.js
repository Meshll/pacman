var player, index, roomId, role;
const db = firebase.firestore();
const rooms = firebase.firestore().collection('rooms');
const users = firebase.firestore().collection('users');

var pp;

var bw = 300;
var bh = 300;
var p = 10;
var cw = bw + (p * 2) + 1;
var ch = bh + (p * 2) + 1;
var temp1, temp2;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var me;
var players;

// var x = 15;
// var y = 15;
// var dirX = 1;
// var dirY = 0;
// var current = 'R';
// var future = 'N';

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        player = user;
        rooms.get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let room = doc.data();
                    Object.keys(room.players).forEach((p) => {
                        console.log(p);
                        if (room["players"][p]["uid"] == player.uid) {
                            roomId = doc.id;
                            index = p;

                            users.doc(player.uid).get().then(doc => {
                                me = doc.data().position;
                            })

                            updateOtherPlayers(roomId);
                            setInterval(draw, 20);
                            // setInterval(update, 1000);
                        }
                    })
                });
            })
            .catch(function (error) {
                console.log("error", error);
            });

    } else {
        // alert('SSSSS')
        // window.location = "/login.html";
    }
});

function updateOtherPlayers(roomId) {
    rooms.doc(roomId).onSnapshot(doc => {
        players = [{ null: true }, { null: true }, { null: true }];
        let ind = 0;
        let ps = doc.data().players;
        Object.keys(ps).forEach(function (p) {
            // console.log(ps[p]);
            // console.log(player.uid);
            if (ps[p].uid != player.uid) {
                users.doc(player.uid).onSnapshot(doc => {
                    players[ind] = doc.data().position;
                }, err => {
                    console.log(`Encountered error: ${err}`);
                });
            }
            ind = ind + 1;
        })
    })
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

function teleport(p) {
    if (p.y == 135 && p.x == 16) {
        p.x = 283;
        p.dirY = 0;
        p.dirX = -1;
    }
    if (p.y == 135 && p.x == 284) {
        p.x = 17;
        p.dirY = 0;
        p.dirX = 1;
    }
}

function updatePos() {
    // console.log(x, y);
    users.doc(player.uid).update({
        position: me
    })
}

function drawPacman(p) {
    teleport(p);
    checkCollision(p);
    if (p.current == 'R') {
        ctx.drawImage(spritePacmanRight[spritePacmanIndx], p.x + 3, p.y + 3, 15, 15);
    }
    if (p.current == 'L') {
        ctx.drawImage(spritePacmanLeft[spritePacmanIndx], p.x + 3, p.y + 3, 15, 15);
    }
    if (p.current == 'D') {
        ctx.drawImage(spritePacmanDown[spritePacmanIndx], p.x + 3, p.y + 3, 15, 15);
    }
    if (p.current == 'U') {
        ctx.drawImage(spritePacmanUp[spritePacmanIndx], p.x + 3, p.y + 3, 15, 15);
    }

    spritePacmanStep += 1;
    if (spritePacmanStep == 3) {
        // if (dirY != 0 && dirX != 0) {
        spritePacmanIndx++;
        // }
        if (spritePacmanIndx == 5) {
            spritePacmanIndx = 0;
        }
        spritePacmanStep = 0;
    }
}

function switchDir(p) {
    let cordx;
    let cordy;
    // console.log(p);

    if (p.dirY == 0 && p.dirX == 0) {
        cordx = Math.round(p.y / 15);
        cordy = Math.round(p.x / 15);
    }
    if (p.dirY == -1 || p.dirX == -1) {
        cordx = Math.ceil(p.y / 15);
        cordy = Math.ceil(p.x / 15);
    }
    if (p.dirX == 1 || p.dirY == 1) {
        cordy = Math.floor(p.x / 15);
        cordx = Math.floor(p.y / 15);
    }
    // console.log(cordx, cordy);
    if ((2 * p.x) % 15 == 0 && (2 * p.y) % 15 == 0) {
        switch (p.future) {
            case 'U':
                if (gameboard[cordx - 1][cordy] == 1) {
                    break;
                }
                p.dirX = 0, p.dirY = -1, p.current = p.future, p.future = 'N';
                something(p);
                break;
            case 'D':
                console.log(cordx, cordy)
                if (gameboard[cordx + 1][cordy] == 1) {
                    break;
                }
                p.dirX = 0, p.dirY = 1, p.current = p.future, p.future = 'N';
                something(p);
                break;
            case 'L':
                if (gameboard[cordx][cordy - 1] == 1) {
                    break;
                }
                p.dirX = -1, p.dirY = 0, p.current = p.future, p.future = 'N';
                something(p);
                break;
            case 'R':
                if (gameboard[cordx][cordy + 1] == 1) {
                    break;
                }
                p.dirX = 1, p.dirY = 0, p.current = p.future, p.future = 'N';
                something(p);
                break;
            case 'S':
                p.dirX = 0, p.dirY = 0, p.future = 'N';
                something(p);
                break;
            default:
                break;
        }
    }
}

// document.getElementById('score').innerHTML[0].score

function something() {
    if (p.dirX == 1) {
        cordy = cordy + 1;
    }
    if (p.dirX == -1) {
        cordy = cordy - 1;
    }

    if (p.dirY == 1) {
        cordx = cordx + 1;
    }

    if (p.dirY == -1) {
        cordx = cordx - 1;
    }
}


function checkCollision(p) {
    if (p.future != 'N') {
        switchDir(p);
    }
    let cordx;
    let cordy;
    if (p.dirY == 0 && p.dirX == 0) {
        Stop(p);
        return;
    }
    if (p.dirY == -1 || p.dirX == -1) {
        cordx = Math.ceil(p.y / 15);
        cordy = Math.ceil(p.x / 15);
    }
    if (p.dirX == 1 || p.dirY == 1) {
        cordy = Math.floor(p.x / 15);
        cordx = Math.floor(p.y / 15);
    }

    // console.log(p.dirX, p.dirY);

    if (p.dirX == 1) {
        cordy = cordy + 1;
    }
    if (p.dirX == -1) {
        cordy = cordy - 1;
    }


    if (p.dirY == 1) {
        cordx = cordx + 1;
    }

    if (p.dirY == -1) {
        cordx = cordx - 1;
    }
    // console.log(cordx, cordy);

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
        Stop(p);
    } else {
        if (p.x + p.dirX >= 15 && p.x + p.dirX <= canvas.width - 35) {
            p.x = p.x + p.dirX;
        }
        if (p.y + p.dirY >= 15 && p.y + p.dirY <= canvas.height - 35) {
            p.y = p.y + p.dirY;
        }
    }
    // return p;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawBoard();
    drawMap();
    drawPacman(me);
    // checkCollision();

    players.forEach((p) => {
        if (!('null' in p)) {
            drawPacman(p);
        }
    })

    // console.log(x, y);
}