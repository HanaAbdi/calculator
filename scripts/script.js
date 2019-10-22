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
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

const display = document.querySelector('.display');
const numbers = Array.from(document.querySelectorAll('button.number'));

let displayValue = "";
numbers.forEach((number) => {
    number.addEventListener(('click'), (e) => {
        displayValue += e.target.innerText;
        display.innerText = displayValue;
    });
});