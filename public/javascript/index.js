const addtakabt = document.getElementById("add-taka-bt");
const addtakabdt2 = document.getElementById("add-taka-bt2");
const send_taka = document.getElementById("send-taka");
const addtaka = document.getElementById("add-taka");
const home = document.getElementById("Home");
const send_taka_page = document.getElementById("send-taka-page");
const your_taka_bt = document.getElementById("your-taka-bt");
const add_profil_bt = document.getElementById("add-profil-bt");
const profile = document.getElementById("profile");

const logout = document.getElementById("logout");

addtakabt.addEventListener("click", () => {
  addtaka.style.display = "block";
  home.style.display = "none";
  send_taka_page.style.display = "none";
  profile.style.display = "none";
});
addtakabdt2.addEventListener("click", () => {
  addtaka.style.display = "block";
  home.style.display = "none";
  send_taka_page.style.display = "none";
  profile.style.display = "none";
});
send_taka.addEventListener("click", () => {
  addtaka.style.display = "none";
  home.style.display = "none";
  send_taka_page.style.display = "block";
  profile.style.display = "none";
});
your_taka_bt.addEventListener("click", () => {
  addtaka.style.display = "none";
  home.style.display = "block";
  send_taka_page.style.display = "none";
  profile.style.display = "none";
});

add_profil_bt.addEventListener("click", () => {
  addtaka.style.display = "none";
  home.style.display = "none";
  send_taka_page.style.display = "none";
  profile.style.display = "block";
});

logout.addEventListener("click",()=>{
  window.location.href = '/logout';
})