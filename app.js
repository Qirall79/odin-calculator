
// Calculation Functions

const sum = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;


// Operate

function operate(operator, a, b){
    document.querySelector("p").style.visibility = "hidden";
    let result;
    if(operator === "+") result = a + b;
    if(operator === "-") result = a - b;
    if(operator === "*") result = a * b;
    if(operator === "/"){
        if(b === 0){
            document.querySelector("p").style.visibility = "visible";
            return;
        }
        else{
            result = a / b;
        }
    }
    return Math.round(result);
}


// Dom handling
const screenDisplay = document.querySelector(".screen");
const digits = document.querySelectorAll("span.digit");
const operators = document.querySelectorAll("span.operator");
const clear = document.querySelector(".clear");

clear.addEventListener("click", () => {
    clearDisplay()
    if(operSelected){
        document.querySelector(".selected").classList.remove("selected");
        operSelected = false;
    }
})

function clearDisplay(){
        screenDisplay.innerHTML = "";
}

let content = "";
let a, b, oper, operSelected = false;

digits.forEach(digit => {
    digit.addEventListener("click", e => {
        if(operSelected){
            clearDisplay();
        }
        populateDisplay(e.target.innerHTML);
    });
})

operators.forEach(operator => {
    operator.addEventListener("click", (e) => {
        if(e.target.innerHTML === "="){
            if(!a || !oper){
                clearDisplay();
                return;
            }
            
            b = parseInt(screenDisplay.innerHTML);
            clearDisplay();

            if(operate(oper, a, b)) populateDisplay(operate(oper, a, b));
            oper = undefined, a = undefined, b = undefined;
            operSelected = false;
            document.querySelector(".selected").classList.remove("selected");
            return;
        }

        else if(e.target.classList[0] === "operator"){

            if(operSelected){
                oper = document.querySelector(".selected").innerHTML;
                document.querySelector(".selected").classList.remove("selected");

                b = parseInt(screenDisplay.innerHTML);

                let result = operate(oper, a, b);

                clearDisplay();

                populateDisplay(result);

                oper = e.target.innerHTML, a = result, b = undefined;
            }

            else{
                a = parseInt(screenDisplay.innerHTML);
                oper = e.target.innerHTML;
            }

            e.target.classList.add("selected");
            operSelected = true;
        }
    })
})



function populateDisplay(value){
    screenDisplay.innerHTML += value;
}