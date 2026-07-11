function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function removeStorage(key) {
  localStorage.removeItem(key);
}

export { getStorage, setStorage, removeStorage };
