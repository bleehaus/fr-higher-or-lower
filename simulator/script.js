let numLeft = Math.floor(Math.random()*13) + 1;
let numRight = Math.floor(Math.random()*13) + 1;
let score = 0;
let guessCounter = 0;
console.log (score);
console.log ("local score = " + localStorage.getItem("score"));

if (score == null && isNaN(localStorage.getItem("score"))) {
	score = 0;
	localStorage.setItem("score", score);
	console.log("score is null. set score to 0");
} else {
	score = parseInt(localStorage.getItem("score"));
}

if (guessCounter == null || isNaN(localStorage.getItem("guessCounter"))) {
	guessCounter = 0;
	localStorage.setItem("guessCounter", guessCounter);
	console.log("guessCounter is null. set guessCounter to 0");
	console.log("guessCounter = " + guessCounter);
} else {
	guessCounter = parseInt(localStorage.getItem("guessCounter"));
	console.log("guessCounter = " + guessCounter);
	console.log("local guessCounter = " + localStorage.getItem("guessCounter"));
	document.querySelector("#guess-counter span").innerHTML = 25-guessCounter;
}

let probabilityLower = 0;
let probabilityHigher = 0;
console.log (score);
console.log ("local score = " + localStorage.getItem("score"));
if (score == 0) {
	document.querySelector("#score span").innerHTML = score + " of " +  guessCounter + ", or 0%";
} else {
	document.querySelector("#score span").innerHTML = score + " of " +  guessCounter + ", or " + (score/guessCounter*100).toFixed(2) + "%";
}

document.querySelector("#coins span").innerHTML = score*65;

console.log("numLeft = " + numLeft);
console.log("numRight = " + numRight);

while (numLeft == 1 || numLeft == 13) {
	numLeft = Math.floor(Math.random()*13) + 1;
	console.log("numLeft has been changed to = " + numLeft);
}

while (numLeft == numRight) {
	numRight = Math.floor(Math.random()*13) + 1;
	console.log("numRight has been changed to = " + numRight);
}

probabilityLower = (numLeft - 1);
probabilityHigher = (13 - numLeft);
document.querySelector("#probability-lower").innerHTML = probabilityLower;
document.querySelector("#probability-higher").innerHTML = probabilityHigher;
document.querySelector("#probability-lower-percentage").innerHTML = (probabilityLower/12*100).toFixed(2);
document.querySelector("#probability-higher-percentage").innerHTML = (probabilityHigher/12*100).toFixed(2);

if (probabilityLower > probabilityHigher) {
	document.querySelector("#probability-prediction").innerHTML = "lower";
	document.querySelector("#probability-result").innerHTML = "more";
} else if (probabilityHigher > probabilityLower) {
	document.querySelector("#probability-prediction").innerHTML = "higher";
	document.querySelector("#probability-result").innerHTML = "more";
} else {
	document.querySelector("#probability-prediction").innerHTML = "higher or lower";
	document.querySelector("#probability-result").innerHTML = "equally as";
}

document.querySelector("#card-left p").innerHTML = numLeft;

function reveal() {
	guessCounter++;
	localStorage.setItem("guessCounter", guessCounter);
	document.querySelector("#card-right").style.transform = "rotateY(180deg)";
	document.querySelector("#card-right").style.backgroundColor = "#eae5bf";
	document.querySelector("#card-right").style.border = "1px solid #79654d";
	document.querySelector("#card-right p").innerHTML = numRight;
	document.querySelector("#card-right p").style.visibility = "visible";
	document.querySelector("#card-right p").style.transform = "rotateY(180deg)";
	if (score == 0) {
		document.querySelector("#score span").innerHTML = score + " of " +  guessCounter + ", or 0%";
	} else {
		document.querySelector("#score span").innerHTML = score + " of " +  guessCounter + ", or " + (score/guessCounter*100).toFixed(2) + "%";
	}
	document.querySelector("#coins span").innerHTML = localStorage.getItem("score")*65;
	document.querySelector("#guess-counter span").innerHTML = 25-guessCounter;
	document.querySelector("#guess-lower").disabled = true;
	document.querySelector("#guess-higher").disabled = true;
	document.querySelector("#guess").style.display = "none";
	document.querySelector("#retry").style.display = "inline";

	if (guessCounter == 25) {
		score = 0;
		localStorage.setItem("score", score);
		guessCounter = 0;
		localStorage.setItem("guessCounter", guessCounter);
		document.querySelector("#guess-counter").innerHTML = "You're out of guesses! Your score and guess count will be reset.";
		document.querySelector("#retry").innerHTML = "new round ⟳";
	}
}

function guessedHigher() {
	console.log("guessed higher");
	if (numRight > numLeft) {
		correct();
	}
	else {
		incorrect();
	}
	reveal();
}

function guessedLower() {
	console.log("guessed lower");
	if (numRight < numLeft) {
		correct();
	}
	else {
		incorrect();
	}
	reveal();
}

function correct() {
	document.querySelector("#result").innerHTML = "You guessed correctly! You've won 65 coins.";
	score++;
	localStorage.setItem("score", score);
	console.log(score);
	console.log("local score = " + localStorage.getItem("score"));
}

function incorrect() {
	document.querySelector("#result").innerHTML = "Oops! You guessed incorrectly. Better luck next time!";
	console.log(score);
	score = score + 0;
	localStorage.setItem("score", score);
	console.log("local score = " + localStorage.getItem("score"));
}

var acc = document.getElementsByClassName("accordion-title");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}