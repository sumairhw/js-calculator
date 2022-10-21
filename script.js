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

    if (val == "AC") {
      reset();
      return;
    }

    if (val == ".") {
      if (floatFlag) {
        return;
      }
      floatFlag = true;
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

function unaryOperation(operator) {}

function operation(operator) {
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
  if (nextOperator) res = `${res} ${nextOperator} `;
  displayResult(res);
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

function add() {
  let nums = outputbox.value.split("+");
  let res = parseInt(nums[0]) + parseInt(nums[1]);
  debug("after add: ");
  if (nextOperator) res = `${res} ${nextOperator} `;
  displayResult(res);
}
