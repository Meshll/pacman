var player;
const db = firebase.firestore();
const rooms = firebase.firestore().collection('rooms');
const users = firebase.firestore().collection('users');


async function createRoom() {
    var slots = Array(0, 1, 2, 3);
    let role = slots[Math.floor(Math.random() * slots.length)]
    let position = {
        x : 0, y : 0, current: 'R', future: 'N', dirX: 1, dirY: 0, role: 0
    }

    var emptyRoom = {
        "players": {},
        "state": 1,
        "gameOver" : 0
    }

    if(role == 0) {
        position.x = 15;
        position.y = 15;
        position.role = role;
    } else if(role == 1) {
        position.x = 15;
        position.y = 285;
        position.role = role;
    } else if(role == 2) {
        position.x = 285;
        position.y = 15;
        position.role = role;
    } else {
        position.x = 285;
        position.y = 285;
        position.role = role;
    }
    emptyRoom["players"][role] = {
        displayName: player.displayName,
        uid: player.uid,
        role: role
    }
    await users.doc(player.uid).update({
        role: role,
        position: position
    });

    console.log(emptyRoom);
    
    rooms.add(emptyRoom).then(ref => {
        console.log("Succesfully created room ");
        waitingRoom(ref.id);
    });
}

async function joinRoom(roomId) {
    let room = rooms.doc(roomId);

    db.runTransaction(async function(transaction) {
        return transaction.get(room).then(async function(doc) {
            let r = doc.data();
            console.log(r);
            var slots = Array(0, 1, 2, 3);

            Object.keys(r.players).forEach(p => {
                var index = p;
                slots = slots.filter((v) => {return v != p});
            })

            let role = slots[Math.floor(Math.random() * slots.length)]

            console.log(slots);
            console.log(role);
            let position = {
                x : 0, y : 0, current: 'R', future: 'N', dirX: 1, dirY: 0, role: 0
            }

            if(role == 0) {
                position.x = 15;
                position.y = 15;
                position.role = role;
            } else if(role == 1) {
                position.x = 15;
                position.y = 285;
                position.role = role;
            } else if(role == 2) {
                position.x = 285;
                position.y = 15;
                position.role = role;
            } else {
                position.x = 285;
                position.y = 285;
                position.role = role;
            }
            
            if (r.state <= 3) {
                console.log(role);
                r["players"][role] = {
                    displayName: player.displayName,
                    uid: player.uid,
                    role: role
                }
                await users.doc(player.uid).update({
                    role: role,
                    position: position
                });
                await transaction.update(room, { state: r.state + 1, players: r.players });
            }
        });
    }).then(function() {
        console.log("Succesfully joined to ", roomId);
        waitingRoom(roomId);
    }).catch(function(err) {
        console.log(err);
    });
}

function matchMaking() {
    if (player) {
        rooms.where("gameOver", "==", 0)
            .get()
            .then(function(querySnapshot) {
                let k = 0;
                querySnapshot.forEach(function(doc) {
                    console.log(doc.id, " => ", doc.data());
                    if(k == 0 && doc.data().state <= 3) {
                        joinRoom(doc.id);
                        k = 1;
                    }
                });
                if(k == 0) createRoom();
            })
            .catch(function(error) {
                console.log("error", error);
            })
    } else {      
        gmail();
    }
    document.getElementById("match1").onclick = null;
    clickajiluulaj();
}
function clickajiluulaj() {
    setTimeout(() => {
        document.getElementById("match1").onclick = matchMaking;
    }, 25000);
}

function waitingRoom(roomId) {
    console.log('waiting room to load ', roomId);
    rooms.doc(roomId).onSnapshot(doc => {
        v = doc.data();
        if(v.gameOver == 0)
        Object.keys(v.players).forEach( p => {
            if (v.players[p]["uid"] == player.uid) {
                window.location.href = "./waiting_room.html"
            }
        })
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
}