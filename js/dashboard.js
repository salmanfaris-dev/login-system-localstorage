import { getId, selector, addEvent, createElement } from "./utils/dom.js";
import { getStorage, removeStorage, setStorage } from "./utils/storage.js";
import { initDarkMode } from "./utils/darkmode.js";
import {
  clearErrorText,
  clearInput,
  inputError,
  toggleButtonState,
} from "./utils/validation.js";

const userEmail = getId("userEmail");
const liveDate = getId("liveDate");
const liveTime = getId("liveTime");
const formEditEmail = getId("formEditEmail");
const formEditPassword = getId("formEditPassword");

const currentEmail = getId("currentEmail");
const newEmail = getId("newEmail");
const currentPassword = getId("currentPassword");
const newPassword = getId("newPassword");

const editEmailInputs = [currentEmail, newEmail];
const editPasswordInputs = [currentPassword, newPassword];

const currentEmailError = getId("currentEmailError");
const newEmailError = getId("newEmailError");
const currentPasswordError = getId("currentPasswordError");
const newPasswordError = getId("newPasswordError");

const hamburger = selector(".hamburger");
const overlay = selector(".overlay");
const sidebar = selector(".sidebar");

const toggleBtn = selector(".toggle-box");
const menuDarkMode = selector(".menu-dark-mode");
const menuViewAccount = getId("menu-view-account");
const menuEditEmail = getId("menu-edit-email");
const menuEditPassword = getId("menu-edit-password");

const deleteConfirmation = getId("deleteConfirmation");
const boxDeleteConfirmation = getId("boxDeleteConfirmation");

const logoutConfirmation = getId("logoutConfirmation");
const boxLogoutConfirmation = getId("boxLogoutConfirmation");

const btnBack = getId("btnBack");

const btnDeleteAccount = getId("btnDeleteAccount");
const btnCancelDelete = getId("btnCancelDelete");
const btnConfirmDelele = getId("btnConfirmDelete");

const btnCancelLogout = getId("btnCancelLogout");
const btnConfirmLogout = getId("btnConfirmLogout");

const listAccount = getId("listAccount");
const dashboardSection = getId("dashboard-section");
const viewAccountSection = getId("view-account-section");
const editEmailSection = getId("edit-email-section");
const editPasswordSection = getId("edit-password-section");

const editEmailBtn = getId("edit-email-btn");
const editPasswordBtn = getId("edit-password-btn");

const sections = [
  dashboardSection,
  viewAccountSection,
  editEmailSection,
  editPasswordSection,
];
const users = getStorage("users");
const currentUser = getStorage("currentUser");

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

userEmail.textContent = currentUser.email;

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

// delete account confirmation
deleteConfirmation.classList.add("hide");
function showDeleteModal() {
  deleteConfirmation.classList.toggle("show");
  deleteConfirmation.classList.remove("hide");

  deleteConfirmation.hidden = false;
  boxDeleteConfirmation.hidden = false;
}

function closeDeleteModal() {
  deleteConfirmation.classList.remove("show");
  deleteConfirmation.classList.add("hide");

  deleteConfirmation.hidden = true;
  boxDeleteConfirmation.hidden = true;
}
// logout account confirmation
logoutConfirmation.classList.add("hide");
function showLogoutModal() {
  logoutConfirmation.classList.toggle("show");
  logoutConfirmation.classList.remove("hide");

  logoutConfirmation.hidden = false;
  boxLogoutConfirmation.hidden = false;
}

function closeLogoutModal() {
  logoutConfirmation.classList.remove("show");
  logoutConfirmation.classList.add("hide");

  logoutConfirmation.hidden = true;
  boxLogoutConfirmation.hidden = true;
}

// view account
function createUserElement(user) {
  const li = createElement("li");
  const listEmail = createElement("span");
  const infoEmail = createElement("span");
  listEmail.textContent = `${user.email}`;
  li.appendChild(listEmail);

  if (currentUser.email === user.email) {
    infoEmail.textContent = "⬅️ Current Email";
    infoEmail.classList.add("margin-left-32");
    li.appendChild(infoEmail);
  }
  li.classList.add("margin-top-16");
  return li;
}

users.forEach((user) => {
  const li = createUserElement(user);
  listAccount.appendChild(li);
});

function deleteAccount() {
  const updatedUsers = users.filter((user) => user.email !== currentUser.email);

  setStorage("users", updatedUsers);
  logoutUser();
}

// edit email
function editEmail(e) {
  e.preventDefault();
  const currentEmailValue = currentEmail.value.trim();
  const newEmailValue = newEmail.value.trim();

  const user = users.find((user) => user.email === currentEmailValue);
  if (!user) {
    currentEmailError.textContent = "Masukkan Email yang sedang Anda gunakan";
    inputError(currentEmail);
    return;
  } else if (currentUser.email === currentEmailValue) {
    user.email = newEmailValue;
    currentUser.email = newEmailValue;

    setStorage("currentUser", currentUser);
    setStorage("users", users);

    alert("Email berhasil diubah");
  }
  clearInput(currentEmail);
  clearInput(newEmail);
}

// edit password
function editPassword(e) {
  e.preventDefault();
  const currentPasswordValue = currentPassword.value.trim();
  const newPasswordValue = newPassword.value.trim();

  const user = users.find((user) => user.password === currentPasswordValue);
  if (!user) {
    currentPasswordError.textContent =
      "Masukkan Password yang sedang Anda gunakan";
    inputError(currentPassword);
    return;
  } else if (newPasswordValue.length < 8) {
    newPasswordError.textContent = "Password minimal 8 karakter";
    inputError(newPassword);
    return;
  } else if (currentUser.password === currentPasswordValue) {
    user.password = newPasswordValue;
    currentUser.password = newPasswordValue;

    setStorage("currentUser", currentUser);
    setStorage("users", users);

    alert("Password berhasil diubah");
  }

  clearInput(currentPassword);
  clearInput(newPassword);
}

toggleButtonState(editEmailInputs, editEmailBtn);
toggleButtonState(editPasswordInputs, editPasswordBtn);

addEvent(currentEmail, "input", () => {
  clearErrorText(currentEmail, currentEmailError);
});
addEvent(newEmail, "input", () => {
  clearErrorText(newEmail, newEmailError);
});
addEvent(currentPassword, "input", () => {
  clearErrorText(currentPassword, currentPasswordError);
});
addEvent(newPassword, "input", () => {
  clearErrorText(newPassword, newPasswordError);
});

addEvent(hamburger, "click", toggleMenu);
addEvent(overlay, "click", toggleMenu);
addEvent(menuDarkMode, "click", darkModeHamburger);

addEvent(menuViewAccount, "click", () => navigateTo(viewAccountSection));
addEvent(btnBack, "click", () => showSection(dashboardSection));

addEvent(btnDeleteAccount, "click", showDeleteModal);
addEvent(btnCancelDelete, "click", closeDeleteModal);
addEvent(btnConfirmDelele, "click", deleteAccount);

addEvent(btnLogoutAccount, "click", showLogoutModal);
addEvent(btnCancelLogout, "click", closeLogoutModal);
if (btnLogoutAccount) {
  addEvent(btnConfirmLogout, "click", logoutUser);
}

addEvent(menuEditEmail, "click", () => navigateTo(editEmailSection));
addEvent(menuEditPassword, "click", () => navigateTo(editPasswordSection));
addEvent(formEditEmail, "submit", editEmail);
addEvent(formEditPassword, "submit", editPassword);
