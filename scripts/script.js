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
  await wait(2000);
  return;
}

async function init() {
  const display = document.getElementById("display-text");
  display.innerHTML = ""; // Clear display before starting the typewriter effect
  output = ""; // Reset the output
  await typewrite("Welcome to the financial calculator!");
  await typewrite(" It's good to have you here!");
}

let output = "";

init();
