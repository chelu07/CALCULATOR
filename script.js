let isOn = false;
let memory = 0;
const MAX_CHARACTERS = 11;

const turnOn = () => {
  isOn = true;
  document.getElementById("screen").disabled = false;
  clearScreen();
};

const turnOff = () => {
  isOn = false;
  document.getElementById("screen").disabled = true;
  clearScreen();
};

const addToScreen = (character) => {
  if (isOn) {
    let screen = document.getElementById("screen");
    let currentValue = screen.value;

    if (character === "." && currentValue.includes(".")) {
      return;
    }

    const operators = ["+", "-", "*", "/", "x", "÷"];
    if (
      operators.includes(character) &&
      operators.includes(currentValue.slice(-1))
    ) {
      return;
    }

    if (currentValue.length < MAX_CHARACTERS) {
      screen.value += character;
    }
  }
};

const clearScreen = () => {
  if (isOn) {
    document.getElementById("screen").value = "";
  }
};

const memoryPlus = () => {
  if (isOn) {
    memory = parseFloat(document.getElementById("screen").value) || 0;
    clearScreen();
  }
};

const memoryClear = () => {
  if (isOn) {
    memory = 0;
  }
};

const memoryRecall = () => {
  if (isOn) {
    document.getElementById("screen").value = memory;
  }
};

const calculate = () => {
  if (isOn) {
    let screen = document.getElementById("screen");
    let operation = screen.value;
    let result;

    if (operation === "") {
      result = 0;
    } else {
      try {
     
        operation = operation
          .replace(/%/g, "/100")
          .replace(/x/g, "*")
          .replace(/÷/g, "/");

        result = eval(operation);

     
        if (result === undefined || result === Infinity || result === -Infinity) {
          result = "Error";
        }
      } catch (error) {
        result = "Error";
      }
    }

  
    screen.value = result;
  }
};
