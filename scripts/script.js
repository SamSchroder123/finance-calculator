let output = "";
let numInput;
const ms = 5; // Delay in milliseconds
let entered = () => {
  console.log("no promise yet");
};

let calculationsArr = [
  {
    id: "none",
    function: () => {
      console.log("none selected");
    },
  },
  {
    id: "gross-rental-income",
    description:
      "Calculates the total annual income generated from renting out the property before any expenses.",
    async function() {
      console.log("gross-rental-income selected");
      let anr = 0;
      let occRate = 0;
      await typewrite(this.questions[0]);
      let awaitingInput = new Promise((resolve) => {
        entered = resolve;
      });
      anr = await awaitingInput;

      console.log("finished waiting for input");
      await typewrite(this.questions[1]);

      awaitingInput = new Promise((resolve) => {
        entered = resolve;
      });

      occRate = await awaitingInput;

      let answer = anr * occRate * 365;
      typewrite("Your Gross Rental Income is £" + answer);
      return;
    },
    questions: {
      0: "What is your average nightly rate? /£: ",
      1: "What is your occupancy rate? /£: ",
    },
  },
  {
    id: "operating-expenses",
    description:
      "Summarizes all expenses associated with operating the rental property.",
    async function() {
      console.log(this.id + " selected");
      let answers = [];
      let qs;
      qs = Object.values(this.questions);
      for (let question in this.questions) {
        console.log("considering this question: " + question);
        await typewrite(this.questions[question]);
        awaitingInput = new Promise((resolve) => {
          entered = resolve;
        });
        answers[question] = await awaitingInput;
      }
      let sum = 0;
      console.log(answers);
      for (num of answers) {
        sum += parseFloat(num);
      }
      const answer = sum;
      typewrite("Your total operating expense is £" + answer);
    },
    questions: {
      0: "What are your total fixed costs? (Mortgage payments, property taxes, insurance, HOA fees .etc) /£: ",
      1: "What are your total variable costs? (Utilities, maintenance, cleaning fees, management fees .etc) /£: ",
      2: "What are your total platform fees? (Fees from booking platforms like Airbnb or VRBO .etc) /£: ",
      3: "What are your total other costs? (Marketing expenses, supplies, legal fees .etc) /£: ",
    },
  },
  {
    id: "net-operating-income",
    description:
      "Calculates the total annual income generated from renting out the property before any expenses.",
    function() {
      console.log("net-operating-income selected");
    },
  },
  {
    id: "cash-flow",
    description:
      "Calculates the total annual income generated from renting out the property before any expenses.",
    function() {
      console.log("cash-flow selected");
    },
  },
];

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
  disableInput();
  output = "";
  let textArr = stringToArr(text);
  for (let i = 0; i < textArr.length; i++) {
    await timeoutFunction(textArr, i, ms);
  }
  console.log("enabling input");
  enableInput();
  return;
}

async function init() {
  const display = document.getElementById("display-text");
  display.innerHTML = ""; // Clear display before starting the typewriter effect
  output = ""; // Reset the output
  await typewrite("Welcome to the financial calculator!");
  // await wait(2000);
  // await typewrite(" It's good to have you here!");
  let calculation = document.getElementById("calculation");
  calculation.setAttribute("onchange", "calculationChange(calculationsArr)");
}

async function calculationChange(calcArr) {
  console.log("calculation change");
  for (const obj of calcArr) {
    if (obj.id === document.getElementById("calculation").value) {
      await obj.function();
      return;
    }
  }
}

function enableInput() {
  console.log("running enableInput()");
  let buttons = document.getElementsByClassName("numeric-button");
  let enter = document.getElementById("enter-button");
  let inputField = document.getElementById("calc-input");
  for (let index = 0; index < buttons.length; index++) {
    const element = buttons[index];
    element.setAttribute("style", "background-color: none;");
    element.setAttribute("onclick", "numericClick(this)");
  }
  inputField.setAttribute("style", "background-color: none;");
  enter.setAttribute("onclick", "enterClick()");
  enter.setAttribute("style", "background-color: none;");
}

function disableInput() {
  let buttons = document.getElementsByClassName("numeric-button");
  let enter = document.getElementById("enter-button");
  let inputField = document.getElementById("calc-input");
  for (let index = 0; index < buttons.length; index++) {
    const element = buttons[index];
    element.setAttribute("style", "background-color: red;");
    element.setAttribute("onclick", "() => {}");
  }
  inputField.setAttribute("style", "background-color: red;");
  enter.setAttribute("onclick", "() => {}");
  enter.setAttribute("style", "background-color: red;");
}

function numericClick(button) {
  numInput = undefined;
  console.log("running numericClick()");
  const display = document.getElementById("display-text");
  if (isNaN(display.innerHTML)) {
    display.innerHTML = "";
  }
  if ((display.innerHTML + button.innerHTML).split(".").length > 2) {
    return;
  }
  display.innerHTML += button.innerHTML;
}

function enterClick() {
  console.log("running enterClick()");
  console.log(document.getElementById("display-text").innerHTML.split(""));
  console.log(parseFloat(document.getElementById("display-text").innerHTML));
  if (isNaN(document.getElementById("display-text").innerHTML)) {
    return;
  } else {
    numInput = parseFloat(document.getElementById("display-text").innerHTML);
    console.log(numInput + " entered");
    entered(numInput);
    return;
  }
}

init();
