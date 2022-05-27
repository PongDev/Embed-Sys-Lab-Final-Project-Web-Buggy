var front = document.getElementById("frontDis")
var back = document.getElementById("backDis")
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
    back.innerHTML = (parseFloat(back.innerHTML) + 4).toFixed(1);
    if (!lockState) {
        lockState = true;
        await fetch('/move/w');
        lockState = false;
    }
}

async function moveBackward() {
    front.innerHTML = (parseFloat(front.innerHTML) + 4).toFixed(1);
    back.innerHTML = (parseFloat(back.innerHTML) - 4).toFixed(1);
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
