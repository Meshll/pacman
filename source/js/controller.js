this.addEventListener("keydown", myEventHandler);

function goUp(p) {
    p.future = 'U';
}

function goDown(p) {
    p.future = 'D';
}

function goLeft(p) {
    p.future = 'L';
}

function goRight(p) {
    p.future = 'R';
}

function Stop(p) {
    p.future = 'S';
}

function myEventHandler(event) {
    var key = event.keyCode;
    if (key == 37 || event.key == 'a') {
        goLeft(me);
    }
    if (key == 38 || event.key == 'w') {
        goUp(me);
    }
    if (key == 39 || event.key == 'd') {
        goRight(me);
    }
    if (key == 40 || event.key == 's') {
        goDown(me);
    }
    if (event.key == 't') {
        Stop(me);
    }
    updatePos();
}

function sendKeys(v){
    if (v == 'L'){
        goLeft(me);
    }
    if (v == 'R'){
        goRight(me);
    }
    if (v == 'U'){
        goUp(me);
    }
    if (v == 'D'){
        goDown(me);
    }
    updatePos();
}