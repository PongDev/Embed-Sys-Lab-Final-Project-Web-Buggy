var thaiButton = document.getElementById("thaibutton")
var engButton = document.getElementById("engbutton")
function toThai(){
    thaiButton.className = "langbuttonon"
    engButton.className = "langbuttonoff"

    thaiButton.disabled = true;
    engButton.disabled = false;
}

function toEnglish(){
    thaiButton.className = "langbuttonoff"
    engButton.className = "langbuttonon"

    thaiButton.disabled = false;
    engButton.disabled = true;
}
