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
upbut.onmouseup = function () {
    clearInterval(counter);

}

downbut.onmousedown = function () {
    counter = setInterval(function () {
        moveBackward();
        isClose();
    }, 100);
}
downbut.onmouseup = function () {
    clearInterval(counter);

}

leftbut.onmousedown = function () {
    counter = setInterval(function () {
        turnLeft();
        isClose();
    }, 100);
}
leftbut.onmouseup = function () {
    clearInterval(counter);

}

rightbut.onmousedown = function () {
    counter = setInterval(function () {
        turnRight();
        isClose();
    }, 100);
}
rightbut.onmouseup = function () {
    clearInterval(counter);

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
    console.log("moving")
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

async function setLight(x) {
    if (x == 0) {
        light.innerHTML = 'OFF';
        light.className = 'redback'
    }
    else if (x == 100) {
        light.innerHTML = 'ON';
        light.className = 'greenback'
    }
    else if (x > 0 && x < 100) {
        light.innerHTML = 'DIM(' + x + '%)'
        light.className = 'cyanback'
    }
}

setInterval(async () => {
    clientState = await fetch('/state', {
        method: 'GET'
    }).then(res => res.json());
    document.getElementById('isOnline').innerHTML = clientState.isOnline ? "Online" : "Offline"
    front.innerHTML = clientState.distance;
}, 1000)
