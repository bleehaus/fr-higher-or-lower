let numLeft = 7;
let numRight = Math.floor(Math.random()*13) + 1;
let guessCounter = 0;
let probabilityLower = 0;
let probabilityHigher = 0;

updateNumLeft();

function updateNumLeft() {
	numLeft = parseInt(document.querySelector("#user-number").value);
	if (numLeft >= 2 && numLeft <= 12 ) {
		getProbability();
		document.querySelector("#probability").style.display = "block";
		document.querySelector("#error").innerHTML = "";
		document.querySelector("#guess-lower").disabled = false;
		document.querySelector("#guess-higher").disabled = false;
	} else {
		document.querySelector("#error").innerHTML = "Please ensure that the number on the left card is between 2 and 12 (inclusive).";
		document.querySelector("#probability").style.display = "none";
		document.querySelector("#guess-lower").disabled = true;
		document.querySelector("#guess-higher").disabled = true;
	}
}

while (numLeft == 1 || numLeft == 13) {
	numLeft = Math.floor(Math.random()*13) + 1;
}

while (numLeft == numRight) {
	numRight = Math.floor(Math.random()*13) + 1;
}

function getProbability () {
	probabilityLower = (numLeft - 1);
	probabilityHigher = (13 - numLeft);
	document.querySelector("#probability-lower").innerHTML = probabilityLower;
	document.querySelector("#probability-higher").innerHTML = probabilityHigher;
	document.querySelector("#probability-lower-percentage").innerHTML = (probabilityLower/12*100).toFixed(2);
	document.querySelector("#probability-higher-percentage").innerHTML = (probabilityHigher/12*100).toFixed(2);

	if (probabilityLower > probabilityHigher) {
		document.querySelector("#probability-prediction").innerHTML = "lower";
		document.querySelector("#probability-result").innerHTML = "more";
		document.querySelector("#guess-lower").style.boxShadow = "0px 0px 10px #731d08";
		document.querySelector("#guess-higher").style.boxShadow = "none";
	} else if (probabilityHigher > probabilityLower) {
		document.querySelector("#probability-prediction").innerHTML = "higher";
		document.querySelector("#probability-result").innerHTML = "more";
		document.querySelector("#guess-lower").style.boxShadow = "none";
		document.querySelector("#guess-higher").style.boxShadow = "0px 0px 10px #731d08";
	} else {
		document.querySelector("#probability-prediction").innerHTML = "higher or lower";
		document.querySelector("#probability-result").innerHTML = "equally as";
		document.querySelector("#guess-lower").style.boxShadow = "0px 0px 15px #731d08";
		document.querySelector("#guess-higher").style.boxShadow = "0px 0px 15px #731d08";
	}
}

function reveal() {
	guessCounter++;
	localStorage.setItem("guessCounter", guessCounter);
	document.querySelector(".card-inner").style.transform = "rotateY(180deg)";
	document.querySelector("#card-right p").innerHTML = numRight;
	document.querySelector("#card-right-front").style.boxShadow = "0px 0px 0px rgba(0, 0, 0, 0);"
	document.querySelector("#guess-lower").disabled = true;
	document.querySelector("#guess-higher").disabled = true;
	document.querySelector("#user-number").disabled = true;
	document.querySelector("#guess").style.display = "none";
	document.querySelector("#retry").style.display = "inline";
}

function guessedHigher() {
	if (numRight > numLeft) {
		correct();
	}
	else {
		incorrect();
	}
	reveal();
}

function guessedLower() {
	if (numRight < numLeft) {
		correct();
	}
	else {
		incorrect();
	}
	reveal();
}

function correct() {
	document.querySelector("#result").innerHTML = "You guessed correctly!";
}

function incorrect() {
	document.querySelector("#result").innerHTML = "Oops! You guessed incorrectly. Better luck next time!";
}