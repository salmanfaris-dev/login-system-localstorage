import { getId, selector, addEvent } from "./utils/dom.js";
import { getStorage, removeStorage } from "./utils/storage.js";
import { initDarkMode } from "./utils/darkmode.js";

const logoutBtn = getId("logoutBtn");
const userEmail = getId("userEmail");
const liveDate = getId("liveDate");
const liveTime = getId("liveTime");

const hamburger = selector(".hamburger");
const overlay = selector(".overlay");
const sidebar = selector(".sidebar");
const toggleBtn = selector(".toggle-box");
const menuDarkMode = selector(".menu-dark-mode");

initDarkMode();

if (getStorage("darkMode") === true) {
  toggleBtn.classList.add("active");
}

function logoutUser() {
  removeStorage("isLogin");
  removeStorage("currentUser");
  window.location.href = "index.html";
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

function darkModeHamburger() {
  toggleBtn.classList.toggle("active");
}

const isLogin = getStorage("isLogin");

if (isLogin !== "true") {
  window.location.href = "index.html";
}

const currentUser = getStorage("currentUser");
userEmail.textContent = currentUser;

if (logoutBtn) {
  addEvent(logoutBtn, "click", logoutUser);
}

addEvent(hamburger, "click", toggleMenu);
addEvent(overlay, "click", toggleMenu);
addEvent(menuDarkMode, "click", darkModeHamburger);
