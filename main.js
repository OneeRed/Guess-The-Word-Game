// Setting Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Created By Redouane`;

// Setting Game Options
let numberOfTries = 5;
let numOfLetters = 6;
let currentTry = 1;

// WORDS to guess
let wordToGuess = "";
const words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "RedOne", "School", "Random"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");

function generateInput() {
    const inputsContainer = document.querySelector(".inputs");

    // Create Main Try Div
    for (let i = 1; i <= numberOfTries; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;

        if (i != 1) tryDiv.classList.add("disabled-inputs");

        // Create Inputs
        for (let j = 1; j <= numOfLetters; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute("maxlength", "1");
            tryDiv.appendChild(input);
        }

        inputsContainer.appendChild(tryDiv);
    }

    // Focus On First Input In First Try Element
    inputsContainer.children[0].children[1].focus();

    // Disable All Inputs Except First One
    const inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input");
    inputsInDisabledDiv.forEach((input) => (input.disabled = true));

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input, index) => {
        // Convert Input To UpperCase
        input.addEventListener("input", function() {
            this.value = this.value.toUpperCase();
            const nextInput = inputs[index + 1];
            if (nextInput) nextInput.focus();
            // if (input.value.length === 1) {
            //     // input.style.backgroundColor = "#baceff";
            // }
        });
        
        input.addEventListener("keydown", function(event) {
            // console.log(event);
            // To get back the index of the target from the array of inputs
            const currentIndex = Array.from(inputs).indexOf(event.target);
            if (event.key === "ArrowRight") {
                const nextInput = currentIndex + 1;
                if (nextInput < inputs.length) inputs[nextInput].focus();
            }
            if (event.key === "ArrowLeft") {
                const previousInput = currentIndex - 1;
                console.log(previousInput);
                if (previousInput >= 0) inputs[previousInput].focus();
            }
        });
         
    })
}

const guessButton = document.querySelector(".check");

guessButton.addEventListener("click", handleGuesses);

console.log(wordToGuess);
function handleGuesses() {
    let sucessGuess = true;
    for (let i = 1; i <= numOfLetters; i++) {
        const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
        const letter = inputField.value.toLowerCase();
        const wordLetter = wordToGuess[i - 1];

        // Game Logic

            if (letter === wordLetter) {
                // Letter Is Correct And In Place
                inputField.classList.add("yes-in-place");
            } else if (wordToGuess.includes(letter) && letter !== "") {
                // Letter Is Correct And Not In Place
                inputField.classList.add("not-in-place");
                sucessGuess = false;
            } else {
                // Letter In Not Correct
                inputField.classList.add("no");
                sucessGuess = false;
            }


    }

    // Check If User Win Or Lose
    if (sucessGuess) {

        messageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`;

        let allTries = document.querySelectorAll(".inputs > div");

        // Add Disabled Class On All Try Divs
        // style => pointer-events: none;
        allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));

        // Disable Guess Button
        guessButton.disabled = true;
    } else{

        document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
        for (let i = 1; i <= numOfLetters; i++) {
            let input = document.querySelector(`#guess-${currentTry}-letter-${i}`);
            input.disabled = true;
        }
        currentTry++;

        let el = document.querySelector(`.try-${currentTry}`);
        if (el) {
            el.classList.remove("disabled-inputs");
            for (let i = 1; i <= numOfLetters; i++) {
                let nextTryInputs = document.querySelector(`#guess-${currentTry}-letter-${i}`);
                nextTryInputs.disabled = false;
            }
            // FOCUS NEXT INPUT
            el.children[1].focus();
        } else {
            guessButton.disabled = true;
            messageArea.innerHTML = `You Lose, The Word To Guess Was <span>${wordToGuess}</span>`
        }


        // Add Disabled Class On All Try Divs
        // style => pointer-events: none;
        // allTries[currentTry - 1].classList.add("disabled-inputs");
    }



}


// generateInput();
window.onload = function() {
    generateInput();
}


// DO THE PANNEL TO SHOW THAT YOU WON, AND THE BACKGROUND EFFET