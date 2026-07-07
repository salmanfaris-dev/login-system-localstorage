const getId = (selector) => document.getElementById(selector);
const darkBtn = getId("darkBtn");
const loginForm = getId("loginForm");
const loginEmail = getId("loginEmail");
const loginPassword = getId("loginPassword");
const registerForm = getId("registerForm");
const registerEmail = getId("registerEmail");
const registerPassword = getId("registerPassword");
const registerConfirmPassword = getId("registerConfirmPassword");
const loginBtn = getId("loginBtn");
const registerBtn = getId("registerBtn");
const logoutBtn = getId("logoutBtn");
const userEmail = getId("userEmail");
const emailError = getId("emailError");
const passwordError = getId("passwordError");
const confirmPasswordError = getId("confirmPasswordError");

function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function removeStorage(key) {
  localStorage.removeItem(key);
}

// dark mode start
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
// dark mode end

function clearInput(input) {
  input.value = "";
}

function clearError(input, errorElement) {
  input.addEventListener("input", () => {
    errorElement.textContent = "";
  });
}

function registerUser(e) {
  e.preventDefault();
  const users = getStorage("users") || [];

  const emailValue = registerEmail.value.trim();
  const passwordValue = registerPassword.value.trim();
  const confirmPasswordValue = registerConfirmPassword.value.trim();

  if (emailValue === "") {
    emailError.textContent = "Mohon isi Email terlebih dahulu";
    return;
  } else if (passwordValue === "") {
    passwordError.textContent = "Mohon isi Password terlebih dahulu";
    return;
  } else if (confirmPasswordValue === "") {
    confirmPasswordError.textContent = "Mohon isi Password terlebih dahulu";
  }

  if (passwordValue !== confirmPasswordValue) return;

  const newUser = {
    email: emailValue,
    password: passwordValue,
  };

  const existingUser = users.find((user) => {
    return user.email === emailValue;
  });

  if (existingUser) {
    return;
  }

  users.push(newUser);
  alert("Akun berhasil dibuat");
  setStorage("users", users);
  clearInput(registerEmail);
  clearInput(registerPassword);
  clearInput(registerConfirmPassword);
}

function loginUser(e) {
  e.preventDefault();
  const users = getStorage("users") || [];

  const emailValue = loginEmail.value.trim();
  const passwordValue = loginPassword.value.trim();

  if (emailValue === "") {
    emailError.textContent = "Mohon isi Email terlebih dahulu";
    return;
  } else if (passwordValue === "") {
    passwordError.textContent = "Mohon isi Password terlebih dahulu";
    return;
  }

  const user = users.find((user) => {
    return user.email === emailValue && user.password === passwordValue;
  });

  clearInput(loginEmail);
  clearInput(loginPassword);

  if (!user) {
    emailError.textContent = "Email atau Password salah, Mohon isi yang benar";
    return;
  }
  setStorage("isLogin", "true");
  setStorage("currentUser", emailValue);
  window.location.href = "dashboard.html";
}

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

if (registerForm) {
  registerForm.addEventListener("submit", registerUser);
  clearError(registerEmail, emailError);
  clearError(registerPassword, passwordError);
  clearError(registerConfirmPassword, confirmPasswordError);
}

if (loginForm) {
  loginForm.addEventListener("submit", loginUser);
  clearError(loginEmail, emailError);
  clearError(loginPassword, passwordError);
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", logoutUser);
}
