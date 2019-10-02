var player;
const db = firebase.firestore();
const rooms = firebase.firestore().collection('rooms');

function createRoom() {
    var emptyRoom = {
        players: [{
            displayName: player.displayName,
            uid: player.uid
        }],
        state: 1
    }
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
            if (r.state <= 3) {
                r.players.push({
                    displayName: player.displayName,
                    uid: player.uid
                })
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
        console.log('YOU HAVE TO LOGIN FIRST');
    }
}


function waitingRoom(roomId) {
    console.log('waiting room to load ', roomId);
    rooms.doc(roomId).onSnapshot(doc => {
        v = doc.data();
        v.players.forEach(function(p) {
            if (p.uid == player.uid) {
                window.location = "/waiting_room.html"
            }
        })
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
}