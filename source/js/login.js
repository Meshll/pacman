firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementsByClassName('info')[0].classList.remove('hide');
        document.getElementsByClassName('googleSignIn')[0].classList.add('hide');
        document.getElementById('username').innerHTML = user.displayName.split(' ')[0];
    } else {
        document.getElementsByClassName('info')[0].classList.add('hide');
        document.getElementsByClassName('googleSignIn')[0].classList.remove('hide');
    }
});




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