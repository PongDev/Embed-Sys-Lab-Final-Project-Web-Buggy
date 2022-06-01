var thaiButton = document.getElementById("thaibutton")
var engButton = document.getElementById("engbutton")

var tableheads = document.getElementsByTagName("th")
function toThai(){
    thaiButton.className = "langbuttonon"
    engButton.className = "langbuttonoff"

    thaiButton.disabled = true;
    engButton.disabled = false;

    tableheads[0].innerHTML = "ระยะห่างจากสิ่งกีดขวางด้านหน้า (ซม)"
    tableheads[1].innerHTML = "สถานะของไฟหน้ารถ"
}

function toEnglish(){
    thaiButton.className = "langbuttonoff"
    engButton.className = "langbuttonon"

    thaiButton.disabled = false;
    engButton.disabled = true;

    tableheads[0].innerHTML = "Distance from Front Obstacle (cm)"
    tableheads[1].innerHTML = "Headlight Status"
}
