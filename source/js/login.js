
firebase.auth().onAuthStateChanged(function (user) {
    console.log('user: ', user);
    if (user) {
        player = user;
        document.getElementsByClassName("googleSignIn")[0].classList.add('hide');
        document.getElementsByClassName('withoutLogin')[0].classList.add('hide');
        document.getElementsByClassName('rectangle-2')[0].classList.add('hide');
        document.getElementsByClassName('withLogin')[0].classList.remove('hide');
        document.getElementsByClassName('info')[0].classList.remove('hide');
        document.getElementsByClassName('rectangle-2')[0].style.display = 'none';
        document.getElementById('username').innerHTML = user.displayName.split(' ')[0];
        document.getElementById("papa").style.justifyContent = 'space-between';

        // document.getElementsByClassName('info').style.display='flex';'
        users.where("uid", "==", player.uid).get().then(snapshot => {
            if (snapshot.empty) {
                createUser();
                return;
            }
        })

        rooms.get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let room = doc.data();
                    Object.keys(room.players).forEach(p => {
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


function createUser(){
    users.doc(player.uid).set({
        displayName: player.displayName.split(' ')[0]
    })
}

function gmail() {
    document.getElementsByClassName('withoutLogIn')[0].classList.add('hide');
    document.getElementsByClassName('googleSignIn')[0].classList.add('hide');
    document.getElementsByClassName('rectangle-2')[0].classList.remove('hide');
    document.getElementsByClassName('rectangle-2')[0].style.display = 'flex';
    document.getElementById("papa").style.justifyContent = "flex-start";
}



function login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
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
    document.getElementsByClassName('rectangle-3')[0].style.display = 'flex';
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
    document.getElementsByClassName('rectangle-3')[0].style.display = 'none';
    document.getElementsByClassName('WithLogin')[0].classList.add('hide');
    document.getElementsByClassName('withoutLogIn')[0].classList.remove('hide');
    document.getElementsByClassName('googleSignIn')[0].classList.remove('hide');
    document.getElementsByClassName('rectangle-2')[0].classList.add('hide');
}
function back() {
    document.getElementsByClassName('info')[0].classList.remove('hide');
    document.getElementsByClassName('rectangle-3')[0].classList.add('hide');
    document.getElementsByClassName('rectangle-3')[0].style.display = 'none';
    document.getElementsByClassName('WithLogin')[0].classList.remove('hide');
    document.getElementsByClassName('rectangle-2')[0].classList.add('hide');
}
function back1() {
    document.getElementsByClassName('rectangle-2')[0].style.display = 'none';
    document.getElementById("papa").style.justifyContent = 'space-between';
    document.getElementsByClassName('rectangle-2')[0].classList.add('hide');
    document.getElementsByClassName('withoutLogin')[0].classList.remove('hide');
    document.getElementsByClassName("googleSignIn")[0].classList.remove('hide');
}