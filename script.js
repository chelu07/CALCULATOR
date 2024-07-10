let isOn = false;
let memory = 0;
const MAX_CHARACTERS = 11;
let isError = false; 
const operators = ["+", "-", "*", "/", "x", "÷"];

const turnOn = () => {
  isOn = true;
  document.getElementById("screen").disabled = false;
  clearScreen();
};

const turnOff = () => {
  isOn = false;
  const screen = document.getElementById("screen");
  screen.disabled = true;
  screen.value = ""; 
  memory = 0; 
};

const addToScreen = (character) => {
  if (isOn) {
    let screen = document.getElementById("screen");
    let currentValue = screen.value;

    if (currentValue === "Error") {
      screen.value = "";
    }

  

    // Decimales
    if (character === ".") {
      let parts = currentValue.split(/[\+\-\*\/x÷]/);
      let lastPart = parts.pop();

      if (lastPart.includes(".")) {
        return;
      }
    }

// Operadores
if (operators.includes(character)) {
  let lastChar = currentValue.slice(-1);

  if (operators.includes(lastChar)) {
    // Reemplaza el último operador si es un operador nuevo
    screen.value = currentValue.slice(0, -1) + character;
  } else if (currentValue.length > 0) {
    // Añade el operador si el último carácter no es un operador
    screen.value += character;
  }
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
    let screen = document.getElementById("screen");
    let currentValue = screen.value;

    if (currentValue === "" || currentValue === "Error") {
      screen.value = memory;
    } else {
      // Si ya hay un valor en pantalla, añade el valor de memoria al final
      screen.value += memory;
    }
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

       
        if (result === undefined || result === Infinity || result === -Infinity || isNaN(result)) {
          result = "Error";
          isError = true; 
        } else {
          isError = false; // Resetea el estado de error si la operación se ha podido hacer
        }
      } catch (error) {
        result = "Error";
        isError = true; 
      }
    }

    
    screen.value = result;
  }
};

document.getElementById("screen").addEventListener('keypress', (e) => {
  e.preventDefault();
});

