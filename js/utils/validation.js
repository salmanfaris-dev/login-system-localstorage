function toggleButtonState(inputs, button) {
  button.disabled = true;
  inputs.forEach((item) => {
    item.addEventListener("input", () => {
      if (inputs.every((item) => item.value.trim() !== "")) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }
    });
  });
}

function clearInput(input) {
  input.value = "";
}

function clearError(input, errorElement) {
  input.addEventListener("input", () => {
    errorElement.textContent = "";
    input.classList.remove("error");
    input.classList.remove("valid");
  });
}

function inputError(input) {
  input.classList.add("error");
  input.classList.remove("valid");
}

function inputValid(input) {
  input.classList.add("valid");
  input.classList.remove("error");
}

export { toggleButtonState, clearError, clearInput, inputError, inputValid };
