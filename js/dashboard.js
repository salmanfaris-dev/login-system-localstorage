import { getId, selector, addEvent, createElement } from "./utils/dom.js";
import { getStorage, removeStorage, setStorage } from "./utils/storage.js";
import { initDarkMode } from "./utils/darkmode.js";

const logoutBtn = getId("logoutBtn");
const userEmail = getId("userEmail");
const liveDate = getId("liveDate");
const liveTime = getId("liveTime");
const formEditEmail = getId("formEditEmail");
const currentEmail = getId("currentEmail");
const newEmail = getId("newEmail");

const hamburger = selector(".hamburger");
const overlay = selector(".overlay");
const sidebar = selector(".sidebar");
const toggleBtn = selector(".toggle-box");
const menuDarkMode = selector(".menu-dark-mode");
const menuViewAccount = getId("menu-view-account");
const menuEditEmail = getId("menu-edit-email");

const btnBack = getId("btnBack");
const listAccount = getId("listAccount");
const dashboardSection = getId("dashboard-section");
const viewAccountSection = getId("view-account-section");
const editEmailSection = getId("edit-email-section");

const sections = [dashboardSection, viewAccountSection, editEmailSection];
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

// validation dashboard
const isLogin = getStorage("isLogin");

if (isLogin !== "true") {
  window.location.href = "index.html";
}

const currentUser = getStorage("currentUser");
userEmail.textContent = currentUser;

if (logoutBtn) {
  addEvent(logoutBtn, "click", logoutUser);
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
  hamburger.classList.remove("active");
}

function navigateTo(section) {
  showSection(section);
  closeSidebar();
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

// view account
function createUserElement(user) {
  const li = createElement("li");
  li.textContent = `${user.email}`;
  li.classList.add("margin-top-16");
  return li;
}

users.forEach((user) => {
  const li = createUserElement(user);
  listAccount.appendChild(li);
});

// edit email
function editEmail(e) {
  e.preventDefault();
  const currentEmailValue = currentEmail.value.trim();
  const newEmailValue = newEmail.value.trim();
  const currentUser = getStorage("currentUser");

  if (currentEmailValue === currentUser) {
    const user = users.find((user) => user.email === currentEmailValue);
    if (!user) {
      alert("Masukkan Email anda saat ini!");
      return;
    }
    user.email = newEmailValue;
    setStorage("currentUser", user.email);
  } else {
    alert("Masukkan email anda saat ini!");
  }

  setStorage("users", users);
}

addEvent(hamburger, "click", toggleMenu);
addEvent(overlay, "click", toggleMenu);
addEvent(btnBack, "click", () => showSection(dashboardSection));
addEvent(menuDarkMode, "click", darkModeHamburger);
addEvent(menuViewAccount, "click", () => navigateTo(viewAccountSection));
addEvent(menuEditEmail, "click", () => navigateTo(editEmailSection));
addEvent(formEditEmail, "submit", editEmail);
