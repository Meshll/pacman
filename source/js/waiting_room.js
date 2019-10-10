const db = firebase.firestore();
const rooms = firebase.firestore().collection('rooms');
let player;
// let roomId;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        player = user;
        rooms.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {

                    let room = doc.data();

                    console.log(room.players);
                    Object.keys(room.players).forEach(p => {
                        console.log(room.players[p]);
                        if (room.players[p].uid == player.uid) {
                            // roomId = doc.id;
                            roomLoader(doc.id);
                        }
                    })
                });
            })
            .catch(function(error) {
                console.log("error", error);
            });
    } else {
        window.href = "/login.html"
    }
});


function roomLoader(roomId) {
    console.log(roomId);
    rooms.doc(roomId).onSnapshot(function(doc) {
        console.log("Current data: ", doc.data());
        var room = doc.data();
        Object.keys(room.players).forEach((p) => {
            if (room.players[p].role == 0 || room.players[p].role == 1) {
                // GHOST
                document.getElementById("player" + room.players[p].role).children[0].src = "./images/loader_ghost_active.png"
            } else {
                // PACMAN
               document.getElementById("player" + room.players[p].role).children[0].src = "./images/loader_pacman_active.png";
            }
            document.getElementById("player" + room.players[p].role).children[1].innerHTML = room.players[p].displayName.split(' ')[0];
        })
    });
}