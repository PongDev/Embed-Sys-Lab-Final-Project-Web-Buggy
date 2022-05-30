var front = document.getElementById("frontDis")
var light = document.getElementById("light")
var distances = document.getElementsByClassName('distance')
var closeDistance = 12;
document.addEventListener("keydown", async (event) => {
    var name = event.key
    if (name == "w" || name == "W") {
        moveForward();
    }
    else if (name == "s" || name == "S") {
        moveBackward();
    }
    else if (name == 'a' || name == 'A') {
        turnLeft();
    }
    else if (name == 'd' || name == 'D') {
        turnRight();
    }
    else if (name == 'e' || name == 'E'){
        setLight(0)
    }
    else if (name == 'r' || name == 'R'){
        setLight(100)
    }
    else if (name == 't' || name == 'T'){
        setLight(50)
    }

    for (let dis of distances) {
        x = parseFloat(dis.innerHTML)
        if (dis.classList.contains("near-hit")) {
            if (x > closeDistance) {
                dis.classList.remove("near-hit")
            }
        }
        else {
            if (x < closeDistance) {
                dis.classList.add("near-hit")
            }
        }
    }

})

let lockState = false;

async function moveForward() {
    front.innerHTML = (parseFloat(front.innerHTML) - 4).toFixed(1);
    //back.innerHTML = (parseFloat(back.innerHTML) + 4).toFixed(1);
    if (!lockState) {
        lockState = true;
        await fetch('/move/w');
        lockState = false;
    }
}

async function moveBackward() {
    front.innerHTML = (parseFloat(front.innerHTML) + 4).toFixed(1);
    //back.innerHTML = (parseFloat(back.innerHTML) - 4).toFixed(1);
    if (!lockState) {
        lockState = true;
        await fetch('/move/s');
        lockState = false;
    }
}

async function turnLeft() {
    if (!lockState) {
        lockState = true;
        await fetch('/move/a');
        lockState = false;
    }
}

async function turnRight() {
    if (!lockState) {
        lockState = true;
        await fetch('/move/d');
        lockState = false;
    }
}

async function setLight(x){
    if(x == 0){
        light.innerHTML = 'OFF';
        light.className = 'redback'
    }
    else if(x == 100){
        light.innerHTML = 'ON';
        light.className = 'greenback'
    }
    else if (x > 0 && x < 100){
        light.innerHTML =  'DIM('+ x + '%)'
        light.className = 'cyanback'
    }
}