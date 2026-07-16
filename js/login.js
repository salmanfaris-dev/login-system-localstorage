import { getId, selector } from "./utils/dom.js";
import {
  toggleButtonState,
  clearError,
  clearInput,
  inputError,
  inputValid,
} from "./utils/validation.js";
import { getStorage, setStorage, removeStorage } from "./utils/storage.js";
import { darkModeButton } from "./utils/darkmode.js";

const loginForm = getId("loginForm");
const loginEmail = getId("loginEmail");
const loginPassword = getId("loginPassword");
const loginBtn = getId("loginBtn");
const loginInputs = [loginEmail, loginPassword];
const emailError = getId("emailError");
const passwordError = getId("passwordError");

darkModeButton();

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

  const user = users.find((user) => {
    return user.email === emailValue && user.password === passwordValue;
  });

  clearInput(loginEmail);
  clearInput(loginPassword);

  if (!user) {
    inputError(loginEmail);
    emailError.textContent = "Email atau Password salah, Mohon isi yang benar";
    return;
  }
  setStorage("isLogin", "true");
  setStorage("currentUser", emailValue);
  window.location.href = "dashboard.html";
}

if (loginForm) {
  toggleButtonState(loginInputs, loginBtn);
  loginForm.addEventListener("submit", loginUser);
  clearError(loginEmail, emailError);
  clearError(loginPassword, passwordError);
}
