import { getId } from "./dom.js";
import { setStorage } from "./storage.js";
const darkBtn = getId("darkBtn")

// dark mode start
export function darkModeButton() {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }

  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");
    setStorage("darkMode", isDark);
  }

  if (darkBtn) {
    darkBtn.addEventListener("click", toggleDarkMode);
  }
}
// dark mode end
