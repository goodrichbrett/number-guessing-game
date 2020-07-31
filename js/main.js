//---------Constants----------

//---------Variables----------
let secretNum, guessList, isWinner, currentGuess;

//---------Cached Element References----------
const messageEl = document.querySelector("#message");
const guessesEl = document.querySelector("#prevGuesses");
const guessBtn = document.querySelector("#guessButton");
const resetBtn = document.querySelector("#resetButton");
const guessInput = document.querySelector("#guessInput");
const headerOne = document.querySelector("#mainHeader");

//---------Event Listeners----------

resetBtn.addEventListener("click", function () {
	init();
});

guessBtn.addEventListener("click", function () {
	if (guessList.length === 0) {
		guessesEl.innerText = "Previous Guesses:";
	}
	if (isWinner === false) {
		checkGuess(parseInt(guessInput.value));
	}
});

//---------Functions----------

init();

function init() {
	//Remove all appended children from element
	headerOne.className = "";
	messageEl.className = "default";
	guessesEl.innerText = "";
	messageEl.innerText = "Please enter a number between 1 and 100";
	guessInput.value = "";
	guessList = [];
	isWinner = false;
	secretNum = Math.floor(Math.random() * 100) + 1;
}

function checkGuess(guess) {
	if (guess < 1 || guess > 100) {
		// Ensure number is within range
		messageEl.innerText = "Whoops! Please enter a number between 1 and 100";
	} else if (guess === secretNum) {
		// Win scenario
		headerOne.className = "animated bounce";
		messageEl.className = "winner";
		isWinner = true;
		confetti.start(1500);
		if (guessList.length === 0) {
			messageEl.innerText = `Congrats! You found the number in ${
				guessList.length + 1
			} guess`;
		} else {
			messageEl.innerText = `Congrats! You found the number in ${
				guessList.length + 1
			} guesses!`;
		}
	} else if (guess < secretNum) {
		// Handle guess is too low
		messageEl.innerText = `Your guess of ${guess} is too low.`;
		messageEl.className = "low";
		guessList.push(guess);
		render(guess);
	} else {
		//Handle guess is too high
		messageEl.innerText = `Your guess of ${guess} is too high.`;
		messageEl.className = "high";
		guessList.push(guess);
		render(guess);
	}
}

function render(guess) {
	// Append a child div to the guesssesEl div based on where it is lower or higher than secretNum
	if (guess === secretNum) {
		let div = document.createElement("div");
		div.innerText = guess;
		div.className = "winner";
		guessesEl.appendChild(div);
	} else if (guess > secretNum) {
		// Create new div, then append to parent div (guessesEl)
		let div = document.createElement("div");
		div.innerText = guess;
		div.className = "high";
		guessesEl.appendChild(div);
	} else {
		let div = document.createElement("div");
		div.innerText = guess;
		div.className = "low";
		guessesEl.appendChild(div);
	}
}
