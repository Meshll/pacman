var player;
const db = firebase.firestore();
const rooms = firebase.firestore().collection('rooms');

function createRoom() {
    var slots = Array(0, 1, 2, 3);
    let role = slots[Math.floor(Math.random() * slots.length)]
    let position = {
        x : 0, y : 0, current: 'R', future: 'N', dirX: 1, dirY: 0, role: 0
    }

    var emptyRoom = {
        "players": {},
        "state": 1
    }

    if(role == 0) {
        position.x = 0;
        position.y = 0;
        position.role = role;
    } else if(role == 1) {
        position.x = 100;
        position.y = 0;
        position.role = role;
    } else if(role == 2) {
        position.x = 0;
        position.y = 100;
        position.role = role;
    } else {
        position.x = 100;
        position.y = 100;
        position.role = role;
    }
    emptyRoom["players"][role] = {
        displayName: player.displayName,
        uid: player.uid,
        role: role,
        position : position
    }
    console.log(emptyRoom);
    
    rooms.add(emptyRoom).then(ref => {
        console.log("Succesfully created room ");
        waitingRoom(ref.id);
    });
}

function joinRoom(roomId) {
    let room = rooms.doc(roomId);

    db.runTransaction(function(transaction) {
        return transaction.get(room).then(function(doc) {
            let r = doc.data();
            console.log(r);
            var slots = Array(0, 1, 2, 3);

            Object.keys(r.players).forEach(p => {
                var index = p;
                slots.splice(index, 1);
            })

            let role = slots[Math.floor(Math.random() * slots.length)]
            let position = {
                x : 0, y : 0, current: 'R', future: 'N', dirX: 1, dirY: 0, role: 0
            }

            if(role == 0) {
                position.x = 0;
                position.y = 0;
                position.role = role;
            } else if(role == 1) {
                position.x = 100;
                position.y = 0;
                position.role = role;
            } else if(role == 2) {
                position.x = 0;
                position.y = 100;
                position.role = role;
            } else {
                position.x = 100;
                position.y = 100;
                position.role = role;
            }
            
            if (r.state <= 3) {
                r["players"][role] = {
                    displayName: player.displayName,
                    uid: player.uid,
                    role: role,
                    position : position
                }
                transaction.update(room, { state: r.state + 1, players: r.players });
            }
        });
    }).then(function() {
        console.log("Succesfully joined to ", roomId);
        waitingRoom(roomId);
    }).catch(function(err) {
        console.error(err);
    });
}

function matchMaking() {
    if (player) {
        rooms.where("state", "<=", 3).limit(1)
            .get()
            .then(function(querySnapshot) {
                if (querySnapshot.empty) {
                    console.log("Create Room");
                    createRoom();
                }
                querySnapshot.forEach(function(doc) {
                    console.log(doc.id, " => ", doc.data());
                    joinRoom(doc.id);
                });
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
        Object.keys(v.players).forEach( p => {
            if (p.uid == player.uid) {
                window.location.href = "../waiting_room.html"
            }
        })
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
    console.log(sec)
}