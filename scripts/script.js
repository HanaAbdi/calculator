function add(a, b) {
    return Math.round((Number(a) + Number(b)) * 10) / 10;
}

function subtract(a, b) {
    return Math.round((Number(a) - Number(b)) * 10) / 10;
}

function multiply(a, b) {
    return Math.round((Number(a) * Number(b)) * 10) / 10;
}

function divide(a, b) {
    let result = Math.round((Number(a) / Number(b)) * 10) / 10;
    return result == Infinity ? "ERROR" : result;
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

// Can only add one period 
const period = document.querySelector('button.period');
period.addEventListener(('click'), updateDisplay, {once: true});

let data = {
    initialValues: [],
    finalValue: "",
    displayValue: "",
    operations: [] 
};


numbers.forEach((number) => {
    number.addEventListener(('click'), updateDisplay);
});

function updateDisplay(e) {
    data.displayValue += e.target.innerText;
    display.innerText = data.displayValue;
} 

const operators = Array.from(document.querySelectorAll('button.operator'));
operators.forEach((operator) => {
    operator.addEventListener(('click'), manageOperators);
});

function manageOperators(e) {
    data.initialValues.push(data.displayValue);
    data.operations.push(e.target.innerText);
    data.displayValue = "";
    period.addEventListener(('click'), updateDisplay, {once: true});
}

let result = "";
const equal = document.querySelector('button.eq');
equal.addEventListener(('click'), equalClicked);    

function equalClicked(e) {
    data.finalValue = data.displayValue;
    // Remove empty elements (Same button pressed multiple times)
    data.initialValues = data.initialValues.filter(function(element) {
        if(element != '') return element;
    });
    
    data.operations = data.operations.filter(function(element) {
        if(element != '') return element;
    });
    
    // Calculate initial calculations in chained input
    for (let i = 0; i < (data.operations.length - 1); i++) {
        if (i == 0) {
            result += operate(data.operations[i], data.initialValues[i], data.initialValues[i+1]);
        } else {
            // using previous result
            result = operate(data.operations[i], result, data.initialValues[i + 1]);
        }
    }

    if (data.initialValues.length == 1) {
        // only one calculation
        result = operate(data.operations[data.operations.length - 1], data.initialValues[0], data.finalValue);
    } else {
        // final calculation in chained input, Also run when calculation is done on result
        result = operate(data.operations[data.operations.length - 1], result, data.finalValue);
    }

    if (result == "" || result == undefined) {
        // click = before operator
        display.innerText = "ERROR";
    } else {
        display.innerText = result;
    }
    // result = ""; (So user can use previous calculations)
    data = {
        initialValues: [],
        finalValue: "",
        displayValue: "",
        operations: [] 
    };
}


const clear = document.querySelector('button.clear');
clear.addEventListener(('click'), clearClicked);

function clearClicked(e) {
    result = "";
    data = {
        initialValues: [],
        finalValue: "",
        displayValue: "",
        operations: [] 
    };    
    display.innerText = "";
    period.addEventListener(('click'), updateDisplay, {once: true});
}

const undo = document.querySelector('button.del');
undo.addEventListener(('click'), deleteClicked);

function deleteClicked(e) {
    data.displayValue = data.displayValue.slice(0, -1);
    display.innerText = display.innerText.slice(0, -1);
}