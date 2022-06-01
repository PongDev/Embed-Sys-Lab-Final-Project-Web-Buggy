var thaiButton = document.getElementById("thaibutton")
var engButton = document.getElementById("engbutton")

var paragraphs = document.getElementsByTagName("p")
var header2s = document.getElementsByTagName("h2")
var header1 = document.getElementsByTagName("h1")[0]
var tableheads = document.getElementsByTagName("th")
function toThai(){
    thaiButton.className = "langbuttonon"
    engButton.className = "langbuttonoff"

    thaiButton.disabled = true;
    engButton.disabled = false;

    header1.innerHTML = "เว็บควบคุมรถ WEBBUGGY"
    tableheads[0].innerHTML = "ระยะห่างจากสิ่งกีดขวางด้านหน้า (ซม)"
    tableheads[1].innerHTML = "สถานะของไฟหน้ารถ"

    header2s[0].innerHTML = "ข้อมูลจากเซ็นเซอร์"
    header2s[1].innerHTML = "ควบคุมรถ"
    header2s[2].innerHTML = "เปลี่ยนภาษา"

    paragraphs[0].innerHTML = "ไฟหน้าจะเปิด/ปิดตามความสว่างโดยรอบของรถ"
    paragraphs[1].innerHTML = "สามารถควบคุมรถได้ด้วยปุ่ม WASD (เปลี่ยนภาษาแป้นพิมพ์เป็นอังกฤษด้วย)"
    paragraphs[2].innerHTML = "หรือด้วยการปุ่มกดด้านล่าง"
}

function toEnglish(){
    thaiButton.className = "langbuttonoff"
    engButton.className = "langbuttonon"

    thaiButton.disabled = false;
    engButton.disabled = true;

    header1.innerHTML = "WEBBEGGY CONTROL"
    tableheads[0].innerHTML = "Distance from Front Obstacle (cm)"
    tableheads[1].innerHTML = "Headlight Status"

    header2s[0].innerHTML = "Data from Sensors"
    header2s[1].innerHTML = "Control"
    header2s[2].innerHTML = "Change Language"

    paragraphs[0].innerHTML = "The headlights are controlled by the surroundings' brightness"
    paragraphs[1].innerHTML = "You can control the car with the keys WASD"
    paragraphs[2].innerHTML = "or with the buttons below"
}
