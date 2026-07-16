import { getId, selector } from "./utils/dom.js";
import { getStorage, setStorage, removeStorage } from "./utils/storage.js";
import { darkModeButton } from "./utils/darkmode.js";

const logoutBtn = getId("logoutBtn");
const userEmail = getId("userEmail");
const liveDate = getId("liveDate");
const liveTime = getId("liveTime");

const hamburger = selector(".hamburger");
const overlay = selector(".overlay");
const sidebar = selector(".sidebar");

darkModeButton();

function logoutUser() {
  removeStorage("isLogin");
  removeStorage("currentUser");
}

function updateLiveTime() {
  const now = new Date();
  liveDate.textContent = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  liveTime.textContent = now.toLocaleTimeString("id-ID");
}
updateLiveTime();
setInterval(updateLiveTime, 1000);

function toggleMenu() {
  hamburger.classList.toggle("active");
  overlay.classList.toggle("show");
  sidebar.classList.toggle("show");
}

hamburger.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);

if (window.location.pathname.includes("dashboard.html")) {
  const isLogin = getStorage("isLogin");

  if (isLogin !== "true") {
    window.location.href = "index.html";
  }

  const currentUser = getStorage("currentUser");
  userEmail.textContent = currentUser;
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", logoutUser);
}

