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

function loadUsers(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function saveUsers(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  const isDark = document.body.classList.contains("dark-mode");
  saveUsers("darkMode", isDark);
}

if (darkBtn) {
  darkBtn.addEventListener("click", toggleDarkMode);
}

function clearInput(input) {
  input.value = "";
}

function registerUser(e) {
  e.preventDefault();
  const users = loadUsers("users");

  const emailValue = registerEmail.value.trim();
  const passwordValue = registerPassword.value.trim();
  const confirmPasswordValue = registerConfirmPassword.value.trim();

  if (
    emailValue === "" ||
    passwordValue === "" ||
    confirmPasswordValue === ""
  ) {
    return;
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
  console.log(newUser);
  saveUsers("users", users);
  clearInput(registerEmail);
  clearInput(registerPassword);
  clearInput(registerConfirmPassword);
}

function loginUser(e) {
  e.preventDefault();
  const users = loadUsers("users");

  const emailValue = loginEmail.value.trim();
  const passwordValue = loginPassword.value.trim();

  const user = users.find((user) => {
    return user.email === emailValue && user.password === passwordValue;
  });

  clearInput(loginEmail);
  clearInput(loginPassword);

  if (!user) {
    alert("Email atau Password salah.");
    return;
  }
  alert("Login berhasil!");
}

if (registerForm) {
  registerForm.addEventListener("submit", registerUser);
}
if (loginForm) {
  loginForm.addEventListener("submit", loginUser);
}
