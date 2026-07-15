import { getId } from "./utils/dom.js";
import {
  toggleButtonState,
  clearError,
  clearInput,
  inputError,
  inputValid,
} from "./utils/validation.js";
import { getStorage, setStorage, removeStorage } from "./utils/storage.js";
import { darkModeButton } from "./utils/darkmode.js";

const registerForm = getId("registerForm");
const registerEmail = getId("registerEmail");
const registerPassword = getId("registerPassword");
const registerConfirmPassword = getId("registerConfirmPassword");
const registerBtn = getId("registerBtn");
const registerInputs = [
  registerEmail,
  registerPassword,
  registerConfirmPassword,
];
const emailError = getId("emailError");
const passwordError = getId("passwordError");
const confirmPasswordError = getId("confirmPasswordError");

darkModeButton();

function registerUser(e) {
  e.preventDefault();
  const users = getStorage("users") || [];

  const emailValue = registerEmail.value.trim();
  const passwordValue = registerPassword.value.trim();
  const confirmPasswordValue = registerConfirmPassword.value.trim();

  if (emailValue === "") {
    inputError(registerEmail);
    emailError.textContent = "Mohon isi Email terlebih dahulu";
    return;
  } else if (passwordValue === "") {
    inputError(registerPassword);
    passwordError.textContent = "Mohon isi Password terlebih dahulu";
    return;
  } else if (passwordValue.length < 8) {
    inputError(registerPassword);
    passwordError.textContent = "Password harus lebih dari 8 karakter";
    return;
  } else {
    inputValid(registerPassword);
  }
  if (confirmPasswordValue === "") {
    inputError(registerConfirmPassword);
    confirmPasswordError.textContent = "Mohon isi Password terlebih dahulu";
    return;
  }

  if (passwordValue !== confirmPasswordValue) {
    inputError(registerConfirmPassword);
    confirmPasswordError.textContent = "Masukkan Password yang sama";
    return;
  }

  const newUser = {
    email: emailValue,
    password: passwordValue,
    id: Date.now(),
  };

  const existingUser = users.some((user) => {
    return user.email === emailValue;
  });

  if (existingUser) {
    inputError(registerEmail);
    emailError.textContent = "Email sudah terdaftar";
    return;
  }

  users.push(newUser);
  alert("Akun berhasil dibuat");
  setStorage("users", users);
  clearInput(registerEmail);
  clearInput(registerPassword);
  clearInput(registerConfirmPassword);
}

if (registerForm) {
  toggleButtonState(registerInputs, registerBtn);
  registerForm.addEventListener("submit", registerUser);
  clearError(registerEmail, emailError);
  clearError(registerPassword, passwordError);
  clearError(registerConfirmPassword, confirmPasswordError);
}
