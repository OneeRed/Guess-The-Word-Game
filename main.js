// Creating HTML Elements(I Tried To Not Use HTML At All)
headerDiv = document.createElement("div");
h1 = document.createElement("h1");


// Setting Game Name
let gameName = "Guess The Word";
gameName.style = "color:red; font-size:40px;"
document.title = gameName;
h1.innerHTML = `Welcome, To <span>${gameName}</span>`;
headerDiv.appendChild(h1);
headerDiv.classList.add("header");
document.body.appendChild(headerDiv);

container = document.createElement("div");
container.classList.add("container");

guessGame = document.createElement("div");
guessGame.classList.add("guess-game");

gameArea = document.createElement("div");
gameArea.classList.add("game-area");

inputsDiv = document.createElement("div");
inputsDiv.classList.add("inputs");

controlDiv = document.createElement("div");
controlDiv.classList.add("control");

checkBtn = document.createElement("button");
checkBtn.classList.add("check");
checkBtn.prepend("Check word");

hintBtn = document.createElement("button");
hintBtn.classList.add("hint");
span = document.createElement("span");
hintBtn.appendChild(span);
/* <i class="fa-solid fa-bars"></i> */
hintBtn.append(" Hints");

reloadBtn = document.createElement("button");
reloadBtn.classList.add("reload");
reloadBtn.prepend("Reload");

controlDiv.appendChild(checkBtn);
controlDiv.appendChild(hintBtn);
controlDiv.appendChild(reloadBtn);

messageDiv = document.createElement("div");
messageDiv.classList.add("message");

gameArea.appendChild(inputsDiv);
gameArea.appendChild(controlDiv);
gameArea.appendChild(messageDiv);

keyColors = document.createElement("div");
keyColors.classList.add("key-colors");
h2 = document.createElement("h2");
h2.prepend("Key Colors Guide");
keyColors.appendChild(h2);

keyOne = document.createElement("div");
keyOne.classList.add("key-color");
inPlace = document.createElement("div");
inPlace.classList.add("key", "in-place");
keyTextOne = document.createElement("div");
keyTextOne.classList.add("key-text");
keyTextOne.prepend("Letter is correct and in place");
keyOne.appendChild(inPlace);
keyOne.appendChild(keyTextOne);

keyTwo = document.createElement("div");
keyTwo.classList.add("key-color");
notInPlace = document.createElement("div");
notInPlace.classList.add("key", "not-in-place");
keyTextTwo = document.createElement("div");
keyTextTwo.classList.add("key-text");
keyTextTwo.prepend("Letter is correct but not in place");
keyTwo.appendChild(notInPlace);
keyTwo.appendChild(keyTextTwo);

keyThree = document.createElement("div");
keyThree.classList.add("key-color");
no = document.createElement("div");
no.classList.add("key", "no");
keyTextThree = document.createElement("div");
keyTextThree.classList.add("key-text");
keyTextThree.prepend("Letter is not in the word");
keyThree.appendChild(no);
keyThree.appendChild(keyTextThree);

keyColors.appendChild(keyOne);
keyColors.appendChild(keyTwo);
keyColors.appendChild(keyThree);

guessGame.appendChild(gameArea);
guessGame.appendChild(keyColors);
container.appendChild(guessGame);

document.body.appendChild(container);

footer = document.createElement("footer");
footer.innerHTML = `${gameName} Game Created By <span>Redouane</span>`;
document.body.appendChild(footer);


// Setting Game Options
let numberOfTries = 6;
let numOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;

// WORDS to guess
let wordToGuess = "";

const words = [
    "Create", "Update", "Delete", "Master", "Branch", "Mainly", "RedOne", "School", "Random", "Puzzle",
    "Animal", "Banana", "Camera", "Doctor", "Future", "Garden", "Insect", "Jacket", "Cookie", "Sudoko",
    "Laptop", "Market", "Number", "Office", "Pencil", "Butter", "Cheese", "Forest", "Column", "Player",
    "Wallet", "Lonely", "Purple", "Flower", "Yellow", "Taylor", "Syntax", "Travel", "Custom", "Tablet",
    "Hungry", "Quartz", "Object", "Python", "Router", "Switch", "Record", "Glitch", "Design", "Screen",
    "Deploy", "GitHub", "Docker", "Review", "Server", "Client", "Aspect", "Widget", "Layout", "Button",
  ];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");

// Manage Hints
document.querySelector(".hint span").innerHTML = numberOfHints;
const hintButton = document.querySelector(".hint");
hintButton.addEventListener("click", hintFunct);

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
            if (this.value !== "") {
                this.value = this.value.toUpperCase();
                const nextInput = inputs[index + 1];
                if (nextInput) nextInput.focus();
            }
            // if (input.value.length === 1) {
            //     // input.style.backgroundColor = "#baceff";
            // }
        });
        
        input.addEventListener("keydown", function(event) {
            // To get back the index of the target from the array of inputs
            const currentIndex = Array.from(inputs).indexOf(event.target);
            if (event.key === "ArrowRight") {
                const nextInput = currentIndex + 1;
                if (nextInput < inputs.length) inputs[nextInput].focus();
            }
            if (event.key === "ArrowLeft") {
                const previousInput = currentIndex - 1;
                if (previousInput >= 0) inputs[previousInput].focus();
            }         
            if (event.key === "Enter") {
                handleGuesses();
            }

        });


         
    })
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);


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
    guessGameDiv = document.querySelector(".guess-game");
    if (sucessGuess) {

        messageArea.innerHTML = `You Won! Congrats. The Word Is <span>${wordToGuess}</span>`;

        // Scroll To The Bottom Of The Page So That The Uses Sees The Message
        // guessGameDiv.style.height = "100vh";
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });

        if (numberOfHints === 2) {
            messageArea.innerHTML = `<p><span>Congratulations</span> You Didn't Use Hints</p>`;
        }
        let allTries = document.querySelectorAll(".inputs > div");

        // Add Disabled Class On All Try Divs
        // style => pointer-events: none;
        allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));

        // Disable Guess Button
        guessButton.disabled = true;
        hintButton.disabled = true;
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
            // Disable Buttons
            guessButton.disabled = true;
            hintButton.disabled = true;
            messageArea.innerHTML = `You Lose, The Word To Guess Was <span>${wordToGuess}</span>`
        
            // Scroll To The Bottom Of The Page So That The Uses Sees The Message
            guessGameDiv.style.height = "100vh";
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        }

        // Add Disabled Class On All Try Divs
        // style => pointer-events: none;
        // allTries[currentTry - 1].classList.add("disabled-inputs");
    }

}


// Hint Function
function hintFunct() {
    if (numberOfHints > 0) {
        numberOfHints--;
        if (numberOfHints === 1) {
            document.querySelector(".hint").innerHTML = `<span>${numberOfHints}</span> Hint`
        } else {
            document.querySelector(".hint span").innerHTML = numberOfHints;
        }
    }
    if (numberOfHints === 0) {
        hintButton.disabled = true;
    }

    const enabledInputs = document.querySelectorAll("input:not([disabled])");

    // We chose empty enabled inputs to put the hint
    const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");

    if (emptyEnabledInputs.length > 0) {
        // Get A Random Index From The Empty Inputs Of The User
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        const randomInput = emptyEnabledInputs[randomIndex];
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
        if (indexToFill !== -1) {
            randomInput.value = wordToGuess[indexToFill].toUpperCase();
            randomInput.classList.add("yes-in-place");
            // randomInput.disabled = true;
        }
    }

}

function handleBackspace(event) {
    if (event.key === "Backspace") {
        const inputs = document.querySelectorAll("input:not([disabled])");
        const currentIndex = Array.from(inputs).indexOf(document.activeElement);
        const currentInput = inputs[currentIndex];

        if (currentIndex > 0){
            const previousInput = inputs [currentIndex - 1];
            currentInput.value = "";
            previousInput.focus();
        }
    }

}

document.addEventListener("keydown", handleBackspace);
// generateInput();
window.onload = function() {
    generateInput();
}


// Relaod Button
reloadBtn = document.querySelector(".reload");
reloadBtn.onclick = () => window.location.reload();


script = document.createElement("script");
script.setAttribute("src", "main.js");
document.body.appendChild(script);
