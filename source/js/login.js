document.getElementsByClassName("rectangle-2")[0].style.display = "none";
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // playerId = user;
        // console.log(playerId)
        player = user;
        document.getElementsByClassName('info')[0].classList.remove('hide');
        document.getElementsByClassName('googleSignIn')[0].classList.add('hide');
        document.getElementById('username').innerHTML = user.displayName.split(' ')[0];


        rooms.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    let room = doc.data();
                    room.players.forEach(function(p) {
                        if (p.uid == player.uid) {
                            roomId = doc.id;
                            //waitingRoom(roomId);
                        }
                    });
                });
            })
            .catch(function(error) {
                console.log("error", error);
            });

    } else {
        document.getElementsByClassName('info')[0].classList.add('hide');
        // document.getElementsByClassName('googleSignIn')[0].classList.add('hide');
    }
});

function gmail() {
    document.getElementsByClassName("hide2")[0].classList.add('hide');
    document.getElementsByClassName("googleSignIn")[0].classList.add('hide');
    document.getElementsByClassName("rectangle-2")[0].style.display = "flex";
    
    document.getElementById("papa").style.justifyContent = "flex-start";

  
}



function login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

function signOut() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log('Signed out!');
    }).catch(function(error) {
        // An error happened.
        console.log('Error occurred!');
    });
}