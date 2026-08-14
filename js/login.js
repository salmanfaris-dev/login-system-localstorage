import { getId, selector, addEvent } from "./utils/dom.js";
import {
  toggleButtonState,
  clearErrorText,
  clearInput,
  inputError,
  inputValid,
} from "./utils/validation.js";
import { getStorage, setStorage } from "./utils/storage.js";
import { initDarkMode } from "./utils/darkmode.js";

const loginForm = getId("loginForm");
const loginEmail = getId("loginEmail");
const loginPassword = getId("loginPassword");
const loginBtn = getId("loginBtn");
const loginInputs = [loginEmail, loginPassword];
const emailError = getId("emailError");
const passwordError = getId("passwordError");

initDarkMode();

function loginUser(e) {
  e.preventDefault();
  const users = getStorage("users") || [];

  const emailValue = loginEmail.value.trim();
  const passwordValue = loginPassword.value.trim();

  if (emailValue === "") {
    inputError(loginEmail);
    emailError.textContent = "Mohon isi Email terlebih dahulu";
    return;
  } else if (passwordValue === "") {
    inputError(loginPassword);
    passwordError.textContent = "Mohon isi Password terlebih dahulu";
    return;
  }

  const userEmail = users.find((user) => user.email === emailValue);
  const userPassword = users.find((user) => user.password === passwordValue);

  if (!userEmail) {
    inputError(loginEmail);
    emailError.textContent = "Email belum terdaftar";
    return;
  } else if (!userPassword) {
    inputError(loginPassword);
    passwordError.textContent = "Password salah, silahkan coba lagi";
  } else if (userEmail && userPassword) {
    clearInput(loginEmail);
    clearInput(loginPassword);

    setStorage("isLogin", "true");
    setStorage("currentUser", { email: emailValue, password: passwordValue });
    window.location.href = "dashboard.html";
  }
}

if (loginForm) {
  toggleButtonState(loginInputs, loginBtn);
  addEvent(loginForm, "submit", loginUser);

  addEvent(loginEmail, "input", () => {
    clearErrorText(loginEmail, emailError);
  });
  addEvent(loginPassword, "input", () => {
    clearErrorText(loginPassword, passwordError);
  });
}
