// Wait the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    // This event allows the user type Enter instead of click to submit an answer
    document.getElementById("answer-box").addEventListener("keydown", function(event){
        if (event.key === "Enter") {
            checkAnswer();
        }
    })
    runGame("addition");
})

/**
 * The main loop is called when the script is first loaded
 * and after the user's answer been processed
 */
function runGame(gameType) {
    // Clean the field input after the user type a answer and submit it
    document.getElementById("answer-box").value = "";
    // Each time the game run, the field input will have the cursor on this again
    document.getElementById("answer-box").focus();

    // Creates two numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivisionQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}.Aborting!`;
    }
}

/**
 * Checks the answer against the array first element returned by the function calculateCorrectAnswer
 */
function checkAnswer() {
    // Needs to use .value here, because it is an input element.
    let userAnswer = parseInt(document.getElementById("answer-box").value);

    let correctAnswer = calculateCorrectAnswer();

    isCorrect = userAnswer === correctAnswer[0];
    if (isCorrect) {
        alert ("Hey, you got it right :D");
        incrementScore();
    } else {
        alert(`Awwww you answered ${userAnswer}. The correct answer was ${correctAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(correctAnswer[1]);
}

/**
 * Get the operands (the numbers) and the operator (plus, minus, multiply, divide)
 * directly from the DOM, and returns the correct answer.
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "/") {
        let result = operand1 / operand2;

        // This piece of code ensures the returned number will be an integer.
        if (operand1 % operand2 !== 0) {
            result = Math.trunc(result);
        }
        return [result, "division"];
    } else {
        alert`Unimplemented operator ${operator}`;
        throw `Unimplemented operator ${operator}.Aborting!`;
    }
}

/**
 * Get the current score from the DOM and increments it by 1
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

/**
 * Get the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand2 < operand1 ? operand2 : operand1;
    document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand2 < operand1 ? operand2 : operand1;
    document.getElementById("operator").textContent = "/";
}