
firebase.auth().onAuthStateChanged(function (user) {
    console.log('user: ', user);
    if (user) {
        playerId = user;
        console.log(playerId)
        player = user; 
        document.getElementsByClassName("googleSignIn")[0].classList.add('hide');
        document.getElementsByClassName('withoutLogin')[0].classList.add('hide');
        document.getElementsByClassName('rectangle-2')[0].classList.add('hide');
        document.getElementsByClassName('withLogin')[0].classList.remove('hide');
        document.getElementsByClassName('info')[0].classList.remove('hide');
        document.getElementsByClassName('rectangle-2')[0].style.display = 'none';
        document.getElementById('username').innerHTML = user.displayName.split(' ')[0];
        document.getElementById("papa").style.justifyContent ='space-between';

        // document.getElementsByClassName('info').style.display='flex';
        
        rooms.get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let room = doc.data();
<<<<<<< HEAD
                    Object.keys(room.players).forEach(p => {
=======
                    room.players.forEach(function (p) {
>>>>>>> bc53b527c7adf145e1f526a3ce929f6aa293e6eb
                        if (p.uid == player.uid) {
                            roomId = doc.id;
                            waitingRoom(roomId);
                        }
                    })
                });
            })
            .catch(function (error) {
                console.log("error", error);
            });

    } else {
        document.getElementsByClassName('withoutLogin')[0].classList.remove('hide');
        document.getElementsByClassName('withLogin')[0].classList.add('hide');
        document.getElementsByClassName('info')[0].classList.add('hide');
        document.getElementsByClassName('rectangle-2')[0].classList.add('hide');
        document.getElementsByClassName('rectangle-2')[0].style.display = 'none';
    }
});

function gmail() {
<<<<<<< HEAD
    document.getElementsByClassName("hide2")[0].classList.add('hide');
    document.getElementsByClassName("googleSignIn")[0].classList.add('hide');
    document.getElementsByClassName("rectangle-2")[0].style.display = "flex";
    document.getElementById("papa").style.justifyContent = "flex-start";
=======
   document.getElementsByClassName('withoutLogIn')[0].classList.add('hide');
   document.getElementsByClassName('googleSignIn')[0].classList.add('hide');
   document.getElementsByClassName('rectangle-2')[0].classList.remove('hide');
   document.getElementsByClassName('rectangle-2')[0].style.display = 'flex';
   document.getElementById("papa").style.justifyContent = "flex-start";
>>>>>>> bc53b527c7adf145e1f526a3ce929f6aa293e6eb
}



function login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
<<<<<<< HEAD
        console.log(user);
=======
>>>>>>> bc53b527c7adf145e1f526a3ce929f6aa293e6eb
        // ...
    }).catch(function (error) {
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


function signOutpage() {
    document.getElementsByClassName('withLogin')[0].classList.add('hide');
    document.getElementsByClassName('info')[0].classList.add('hide');
    document.getElementsByClassName('rectangle-3')[0].classList.remove('hide');
    document.getElementsByClassName('rectangle-3')[0].style.display='flex';
    document.getElementsByClassName('rectangle-2')[0].classList.add('hide');
    document.getElementsByClassName('rectangle-2')[0].style.display = 'none';
}

function realsignout() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log('Signed out!');
    }).catch(function (error) {
        // An error happe ned.
        console.log('Error occurred!');
    });
    document.getElementsByClassName('info')[0].classList.add('hide');
    document.getElementsByClassName('rectangle-3')[0].classList.add('hide');
    document.getElementsByClassName('rectangle-3')[0].style.display='none';
    document.getElementsByClassName('WithLogin')[0].classList.add('hide');
    document.getElementsByClassName('withoutLogIn')[0].classList.remove('hide');
    document.getElementsByClassName('googleSignIn')[0].classList.remove('hide');
    document.getElementsByClassName('rectangle-2')[0].classList.add('hide');
}
function back() {
    document.getElementsByClassName('info')[0].classList.remove('hide');
    document.getElementsByClassName('rectangle-3')[0].classList.add('hide');
    document.getElementsByClassName('rectangle-3')[0].style.display='none';
    document.getElementsByClassName('WithLogin')[0].classList.remove('hide');
    document.getElementsByClassName('rectangle-2')[0].classList.add('hide');
}
function back1() {
    document.getElementsByClassName('rectangle-2')[0].style.display = 'none';
    document.getElementById("papa").style.justifyContent ='space-between';
    document.getElementsByClassName('rectangle-2')[0].classList.add('hide');
    document.getElementsByClassName('withoutLogin')[0].classList.remove('hide');
    document.getElementsByClassName("googleSignIn")[0].classList.remove('hide');
}