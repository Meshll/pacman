this.addEventListener("keydown", myEventHandler);

function goUp() {
    future = 'U';
}

function goDown() {
    future = 'D';
}

function goLeft() {
    future = 'L';
}

function goRight() {
    future = 'R';
}

function Stop() {
    future = 'S';
}

function myEventHandler(event) {
    var key = event.keyCode;
    if (key == 37 || event.key == 'a') {
        goLeft();
    }
    if (key == 38 || event.key == 'w') {
        goUp();
    }
    if (key == 39 || event.key == 'd') {
        goRight();
    }
    if (key == 40 || event.key == 's') {
        goDown();
    }
    if (event.key == 't') {
        Stop();
    }
}