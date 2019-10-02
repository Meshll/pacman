const db = firebase.firestore();
const rooms = firebase.firestore().collection('rooms');
let player;
let roomId;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        player = user;
        rooms.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    let room = doc.data();
                    room.players.forEach(function(p) {
                        if (p.uid == player.uid) {
                            roomId = doc.id;
                            roomLoader(roomId);
                        }
                    });
                });
            })
            .catch(function(error) {
                console.log("error", error);
            });
    } else {
        window.href = "/login.html"
    }
});


function roomLoader() {
    console.log(roomId);
    rooms.doc(roomId).onSnapshot(function(doc) {
        console.log("Current data: ", doc.data());
        var room = doc.data();
        room.players.forEach(function(p, index) {
            if (index == 0 || index == 1) {
                // GHOST
                document.getElementById("player" + index).children[0].src = "./images/loader_ghost_active.png"
            } else {
                // PACMAN
                document.getElementById("player" + index).children[0].src = "./images/loader_pacman_active.png";
            }
            document.getElementById("player" + index).children[1].innerHTML = p.displayName.split(' ')[0];
        })
    });
}