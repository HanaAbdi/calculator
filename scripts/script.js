function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

const display = document.querySelector('.display');
const numbers = Array.from(document.querySelectorAll('button.number'));

let displayValue = "";
numbers.forEach((number) => {
    number.addEventListener(('click'), updateDisplay);
});

function updateDisplay(e) {
    displayValue += e.target.innerText;
    display.innerText = displayValue;
} 

let firstValue = "";
let operation = "";
let secondValue = "";

const operators = Array.from(document.querySelectorAll('button.operator'));
operators.forEach((operator) => {
    operator.addEventListener(('click'), (e) => {
        firstValue = displayValue;
        operation = e.target.innerText;
        // display.innerText = "";
        displayValue = "";
    });
});

let result = "";
const equal = document.querySelector('button.eq');
equal.addEventListener(('click'), (e) => {
    secondValue = displayValue;
    display.innerText = operate(operation, firstValue, secondValue);
    displayValue = "";
});