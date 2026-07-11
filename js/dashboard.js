import { getId } from "./utils/dom.js";
import { getStorage, setStorage, removeStorage } from "./utils/storage.js";
import { darkModeButton } from "./utils/darkmode.js";

const logoutBtn = getId("logoutBtn");
const userEmail = getId("userEmail");

darkModeButton();

function logoutUser() {
  removeStorage("isLogin");
  removeStorage("currentUser");
}

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
