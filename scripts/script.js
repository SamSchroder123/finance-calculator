function stringToArr(text) {
  text = text.split("");
  return text;
}

async function timeoutFunction(Arr, index, ms) {
  console.log("running timeoutFunction()");
  const display = document.getElementById("display-text");
  return new Promise((resolve) => {
    setTimeout(() => {
      const display = document.getElementById("display-text");
      let char = Arr[index];
      output += char;
      display.innerHTML = output;
      resolve();
    }, ms);
  });
}

async function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("waited " + milliseconds / 1000 + " seconds");
      resolve();
    }, milliseconds);
  });
}

async function typewrite(text) {
  console.log("running typewrite()");
  output = "";
  const ms = 50; // Delay in milliseconds
  let textArr = stringToArr(text);
  for (let i = 0; i < textArr.length; i++) {
    await timeoutFunction(textArr, i, ms);
  }
  return;
}

async function init() {
  const display = document.getElementById("display-text");
  display.innerHTML = ""; // Clear display before starting the typewriter effect
  output = ""; // Reset the output
  disableInput();
  await typewrite("Welcome to the financial calculator!");
  await wait(2000);
  await typewrite(" It's good to have you here!");
  enableInput();
}

function enableInput() {
  let buttons = document.getElementsByClassName("numeric-button");
  let inputField = document.getElementById("calc-input");
  for (let index = 0; index < buttons.length; index++) {
    const element = buttons[index];
    element.setAttribute("style", "background-color: none;");
    element.setAttribute("onclick", "numericClick(this)");
  }
  inputField.setAttribute("style", "background-color: none;");
}

function disableInput() {
  let buttons = document.getElementsByClassName("numeric-button");
  let inputField = document.getElementById("calc-input");
  for (let index = 0; index < buttons.length; index++) {
    const element = buttons[index];
    element.setAttribute("style", "background-color: red;");
    element.setAttribute("onclick", "() => {}");
  }
  inputField.setAttribute("style", "background-color: red;");
}

function numericClick(button) {
  console.log("running numericClick()");
  const display = document.getElementById("display-text");
  display.innerHTML = button.innerHTML;
}

let output = "";

init();
