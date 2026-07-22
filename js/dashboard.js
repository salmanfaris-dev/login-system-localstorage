import { getId, selector, addEvent, createElement } from "./utils/dom.js";
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

const menuViewAccount = getId("menuViewAccount");

const btnBack = getId("btnBack");
const listAccount = getId("listAccount");
const dashboardSection = getId("dashboard-section");
const viewAccountSection = getId("view-account-section");

const sections = [dashboardSection, viewAccountSection];
const users = getStorage("users");

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

function closeSidebar() {
  sidebar.classList.remove("show");
  overlay.classList.remove("show");
}

function navigateTo(section) {
  closeSidebar();
  showSection(section);
}

function darkModeHamburger() {
  toggleBtn.classList.toggle("active");
}

function showSection(activeSection) {
  sections.forEach((section) => {
    section.hidden = true;
  });
  activeSection.hidden = false;
}

function createUserElement(user) {
  const li = createElement("li");
  li.textContent = `${user.email}`;
  li.classList.add("margin-top-16");
  return li;
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

users.forEach((user) => {
  const li = createUserElement(user);
  listAccount.appendChild(li);
});

addEvent(hamburger, "click", toggleMenu);
addEvent(overlay, "click", toggleMenu);
addEvent(menuDarkMode, "click", darkModeHamburger);
addEvent(menuViewAccount, "click", () => navigateTo(viewAccountSection));
addEvent(btnBack, "click", () => showSection(dashboardSection));
