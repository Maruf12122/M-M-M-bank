const addtakabt = document.getElementById("add-taka-bt");
const send_taka = document.getElementById("send-taka")
const addtaka = document.getElementById("add-taka");
const home = document.getElementById("Home");
const send_taka_page = document.getElementById("send-taka-page")



addtakabt.addEventListener("click",()=>{
    addtaka.style.display = "block";
    home.style.display = "none";
    send_taka_page.style.display = "none"

})
send_taka.addEventListener("click",()=>{
    addtaka.style.display = "none";
    home.style.display = "none";
    send_taka_page.style.display = "block"

})