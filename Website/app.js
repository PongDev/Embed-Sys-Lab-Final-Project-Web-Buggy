var front = document.getElementById("frontDis")
var back = document.getElementById("backDis")
var distances = document.getElementsByClassName('distance')
console.log(distances)
var closeDistance = 12;
document.addEventListener("keydown",(event) =>{
    var name = event.key
    console.log(name)
    if (name == "w" || name == "W"){
        moveForward();
    }
    else if (name == "s" || name == "S"){
        moveBackward();
    }
    else if(name == 'a' || name == 'A'){
        turnLeft();
    }
    else if(name == 'd' || name == 'D'){
        turnRight();
    }

    for(let dis of distances){
        x = parseFloat(dis.innerHTML)
        console.log(dis.classList)
        if(dis.classList.contains("near-hit")){
            if(x > closeDistance){
                dis.classList.remove("near-hit")
            }
        }
        else{
            if(x < closeDistance){
                dis.classList.add("near-hit")
            }
        }
    }

})
function moveForward(){
    front.innerHTML = (parseFloat(front.innerHTML) - 4).toFixed(1);
    back.innerHTML = (parseFloat(back.innerHTML) + 4).toFixed(1);
}

function moveBackward(){
    front.innerHTML = (parseFloat(front.innerHTML) + 4).toFixed(1);
    back.innerHTML = (parseFloat(back.innerHTML) - 4).toFixed(1);
}

function turnLeft(){

}

function turnRight(){

}
