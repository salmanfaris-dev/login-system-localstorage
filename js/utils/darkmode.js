import { getId, addEvent } from "./dom.js";
import { setStorage, getStorage} from "./storage.js";
const darkBtn = getId("darkBtn");

// dark mode start
export function initDarkMode() {
  if (getStorage("darkMode") === true) {
    document.body.classList.add("dark-mode");
  }

  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");
    setStorage("darkMode", isDark);
  }

  if (darkBtn) {
    addEvent(darkBtn, "click", toggleDarkMode);
  }
}
// dark mode end
