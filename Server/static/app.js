var front = document.getElementById("frontDis")
var light = document.getElementById("light")
var distances = document.getElementsByClassName('distance')

var upbut = document.getElementById("upbutton")
var downbut = document.getElementById("downbutton")
var leftbut = document.getElementById("leftbutton")
var rightbut = document.getElementById("rightbutton")

var closeDistance = 25;
var clientState;

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


    /*else if (name == 'e' || name == 'E') {
        setLight(0)
    }
    else if (name == 'r' || name == 'R') {
        setLight(100)
    }
    else if (name == 't' || name == 'T') {
        setLight(50)
    }*/

    isClose()

})

document.addEventListener("keyup", async (event) => {
    var name = event.key
    if (name == "w" || name == "W" || name == "s" || name == "S" || name == 'a' || name == 'A' || name == 'd' || name == 'D') {
        await fetch('/move/stop', {
            method: 'POST'
        });
    }
})
var counter;
upbut.onmousedown = function () {
    counter = setInterval(function () {
        moveForward();
        isClose();
    }, 100);
}
upbut.onmouseup = async () => {
    clearInterval(counter);
    await fetch('/move/stop', {
        method: 'POST'
    });
}

downbut.onmousedown = function () {
    counter = setInterval(function () {
        moveBackward();
        isClose();
    }, 100);
}
downbut.onmouseup = async () => {
    clearInterval(counter);
    await fetch('/move/stop', {
        method: 'POST'
    });
}

leftbut.onmousedown = function () {
    counter = setInterval(function () {
        turnLeft();
        isClose();
    }, 100);
}
leftbut.onmouseup = async () => {
    clearInterval(counter);
    await fetch('/move/stop', {
        method: 'POST'
    });
}

rightbut.onmousedown = function () {
    counter = setInterval(function () {
        turnRight();
        isClose();
    }, 100);
}
rightbut.onmouseup = async () => {
    clearInterval(counter);
    await fetch('/move/stop', {
        method: 'POST'
    });
}
let lockState = false;

async function isClose() {
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
}

async function moveForward() {

    if (!lockState) {
        lockState = true;
        await fetch('/move/w', {
            method: 'POST'
        });
        lockState = false;
    }
}

async function moveBackward() {
    if (!lockState) {
        lockState = true;
        await fetch('/move/s', {
            method: 'POST'
        });
        lockState = false;
    }
}

async function turnLeft() {
    if (!lockState) {
        lockState = true;
        await fetch('/move/a', {
            method: 'POST'
        });
        lockState = false;
    }
}

async function turnRight() {
    if (!lockState) {
        lockState = true;
        await fetch('/move/d', {
            method: 'POST'
        });
        lockState = false;
    }
}

async function setLight(lightState) {
    if (lightState) {
        light.innerHTML = 'ON';
        light.className = 'greenback'
    } else {
        light.innerHTML = 'OFF';
        light.className = 'redback'
    }
}

setInterval(async () => {
    clientState = await fetch('/state', {
        method: 'GET'
    }).then(res => res.json());
    document.getElementById('isOnline').innerHTML = clientState.isOnline ? "Online" : "Offline"
    await setLight(clientState.headLight)
    front.innerHTML = clientState.distance;
}, 1000)
