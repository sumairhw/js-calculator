let buttons = document.querySelectorAll("button");
let outputbox = document.querySelector(".outputbox");
const operatorArray = ["+", "-", "*", "/", "%", "-/+"];

let isOperatorApplied = false;
let Operator = null;
let nextOperator = null;
let floatFlag = false;

for (let btn of buttons) {
  btn.addEventListener("click", (event) => {
    const val = event.target.textContent;

    if (outputbox.value.length >= 18) {
      return;
    }

    if (btn.id == "backspace") {
      let temp = outputbox.value.slice(0, -1);
      outputbox.value = temp;
      return;
    }

    if (val == "AC") {
      reset();
      return;
    }

    if (val == "=") {
      operation(Operator, "eqOperation");
      return;
    }

    if (val == ".") {
      if (floatFlag) {
        return;
      }
      floatFlag = true;
    }

    if (val == "%") {
      let num = +outputbox.value;
      if (num == outputbox.value) {
        let tmp = parseFloat(outputbox.value);
        reset();
        outputbox.value = tmp / 100;
      } else {
        alert("Operation not valid");
      }
      return;
    }

    if (val == "-/+") {
      let num = +outputbox.value;
      if (num == outputbox.value) {
        let tmp = parseFloat(outputbox.value);
        reset();
        outputbox.value = -tmp;
      } else {
        alert("Operation not valid");
      }
      return;
    }

    if (!isOperator(val)) {
      outputbox.value = outputbox.value + val;
    }

    if (isOperator(val) && !isOperatorApplied) {
      floatFlag = false;
      isOperatorApplied = true;
      Operator = val;
      outputbox.value = outputbox.value + val;
    } else if (isOperator(val) && isOperatorApplied) {
      floatFlag = false;
      nextOperator = val;
      operation(Operator);
      Operator = nextOperator;
    }
  });
}

function isOperator(value) {
  for (let op of operatorArray) {
    if (value === op) return true;
  }
  return false;
}

function operation(operator, args) {
  let nums = outputbox.value.split(operator).map((num) => parseFloat(num));
  if (!floatFlag) nums.map((num) => parseInt(num));
  let res;

  switch (operator) {
    case "+":
      res = nums[0] + nums[1];
      break;
    case "-":
      res = nums[0] - nums[1];
      break;
    case "*":
      res = nums[0] * nums[1];
      break;
    case "/":
      res = nums[0] / nums[1];
      break;
  }

  res = res.toFixed(2);
  if (args === "eqOperation") {
    reset();
  } else if (nextOperator) {
    res = `${res} ${nextOperator} `;
  }

  displayResult(res);
  debug(`after op: {operator}`);
}

function reset() {
  outputbox.value = "";
  isOperatorApplied = false;
  Operator = null;
  nextOperator = null;
  floatFlag = false;
}

function displayResult(result) {
  outputbox.value = result;
}

function debug(extra = "") {
  console.log(
    extra,
    "str: ",
    outputbox.value,
    "\tp op:",
    Operator,
    "\tnxt op:",
    nextOperator
  );
}

outputbox.addEventListener("keydown", (event) => {
  if (event.keyCode == 13) {
    let tmp = outputbox.value;
    for (let op of operatorArray) {
      if (tmp.indexOf(op) >= 1) {
        operation(op, "eqOperation");
        return;
      }
    }
    alert("Invalid Operation");
  }
});
