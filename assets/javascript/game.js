
// grab all the elements to be manipulated
var helpEl = document.getElementById("help");
var winsEl = document.getElementById("wins");
var remainingGuessCountEl = document.getElementById("remainingGuessCount");
var lettersGuessedEl = document.getElementById("lettersGuessed");
var wordDisplayEl = document.getElementById("wordDisplay");

// GAME OBJECT !!!
var WordGuessGame = {
	LEGALLETTERS: "abcdefghijklmnopqrstuvwxyz",
	// https://en.wiktionary.org/wiki/Appendix:Basic_English_word_list#Things_-_200_picturable_words
	availableWords: [
	"angle",
	"ant",
	"apple",
	"arch",
	"arm",
	"army",
	"baby",
	"bag",
	"ball",
	"band",
	"basin",
	"basket",
	"bath",
	"bed",
	"bee",
	"bell",
	"berry",
	"bird",
	"blade",
	"board",
	"boat",
	"bone",
	"book",
	"boot",
	"bottle",
	"box",
	"boy",
	"brain",
	"brake",
	"branch",
	"brick",
	"bridge",
	"brush",
	"bucket",
	"bulb",
	"button",
	"cake",
	"camera",
	"card",
	"cart",
	"carriage",
	"cat",
	"chain",
	"cheese",
	"chest",
	"chin",
	"church",
	"circle",
	"clock",
	"cloud",
	"coat",
	"collar",
	"comb",
	"cord",
	"cow",
	"cup",
	"curtain",
	"cushion",
	"dog",
	"door",
	"drain",
	"drawer",
	"dress",
	"drop",
	"ear",
	"egg",
	"engine",
	"eye",
	"face",
	"farm",
	"feather",
	"finger",
	"fish",
	"flag",
	"floor",
	"fly",
	"foot",
	"fork",
	"fowl",
	"frame",
	"garden",
	"girl",
	"glove",
	"goat",
	"gun",
	"hair",
	"hammer",
	"hand",
	"hat",
	"head",
	"heart",
	"hook",
	"horn",
	"horse",
	"hospital",
	"house",
	"island",
	"jewel",
	"kettle",
	"key",
	"knee",
	"knife",
	"knot",
	"leaf",
	"leg",
	"library",
	"line",
	"lip",
	"lock",
	"map",
	"match",
	"monkey",
	"moon",
	"mouth",
	"muscle",
	"nail",
	"neck",
	"needle",
	"nerve",
	"net",
	"nose",
	"nut",
	"office",
	"orange",
	"oven",
	"parcel",
	"pen",
	"pencil",
	"picture",
	"pig",
	"pin",
	"pipe",
	"plane",
	"plate",
	"plough",
	"pocket",
	"pot",
	"potato",
	"prison",
	"pump",
	"rail",
	"rat",
	"receipt",
	"ring",
	"rod",
	"roof",
	"root",
	"sail",
	"school",
	"scissors",
	"screw",
	"seed",
	"sheep",
	"shelf",
	"ship",
	"shirt",
	"shoe",
	"skin",
	"skirt",
	"snake",
	"sock",
	"spade",
	"sponge",
	"spoon",
	"spring",
	"square",
	"stamp",
	"star",
	"station",
	"stem",
	"stick",
	"stocking",
	"stomach",
	"store",
	"street",
	"sun",
	"table",
	"tail",
	"thread",
	"throat",
	"thumb",
	"ticket",
	"toe",
	"tongue",
	"tooth",
	"town",
	"train",
	"tray",
	"tree",
	"trousers",
	"umbrella",
	"wall",
	"watch",
	"wheel",
	"whip",
	"whistle",
	"window",
	"wing",
	"wire",
	"worm"],
	wordsGuessed: [],
	wordsNotGuessed: [],
	currentWord: "",
	wins: 0,
	remainingGuesses: 0,
	lettersGuessed: "",
	wordDisplay: "",
	isPlaying: false,
	helpText: "Press ANY letter key to get started.",
	gameOver: false,

	// METHODS:
	// method that puts a new word into currentWord
	// from availableWords as a string
	// also moves the chosen word into wordsUsed
	newRandomWord: function() 
	{
		// clear word
		this.currentWord = "";

		// Game over check
		if (this.availableWords.length === 0)
		{
			return;
		}
		
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
		var randomIndex = Math.floor(Math.random() * Math.floor(this.availableWords.length));

		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice#Remove_1_element_from_index_3
		// returns an array with a single item.
		var word = this.availableWords.splice(randomIndex, 1)[0];

		// update current word
		this.currentWord = word;
	},

	// start a round.
	initializeRound: function()
	{
		// initialize game
		this.newRandomWord();

		if (this.currentWord === "")
		{
			this.gameOver = true;
			this.helpText = "Game Over! You got " + this.wins + " .";
			return;
		}

		// create display of underscores for each letter in the word.
		var blanks = ""
		for (let i = 0; i < this.currentWord.length; i++)
		{
			blanks = blanks + "_";
		}

		// init round game state
		this.wordDisplay = blanks;
		this.remainingGuesses = 15;
		this.lettersGuessed = "";
		this.helpText = "Press a letter key to guess."
		this.isPlaying = true;
	},

	guessLetter: function(letter)
	{
		// already guess this letter, skip.
		if (this.lettersGuessed.indexOf(letter) !== -1)
		{
			this.helpText = "You have already guessed " + letter + " before.";
			return;
		}

		// add to lettersGuessed
		this.lettersGuessed = this.lettersGuessed + " " + letter;

		// this letter is not in the word.
		if (this.currentWord.indexOf(letter) === -1)
		{
			this.remainingGuesses--;
			this.helpText = "Oops! Try again."
			return;
		}

		this.helpText = "Noice!"

		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
		// 
		var startSearchFrom = 0;
		while (this.currentWord.indexOf(letter, startSearchFrom) !== -1) 
		{
			var index = this.currentWord.indexOf(letter, startSearchFrom)
			// update wordDisplay
			// https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
			this.wordDisplay = this.wordDisplay.substring(0,index) + letter + this.wordDisplay.substring(index + 1);
			startSearchFrom = index + 1;
		}

	},

	updateDisplay: function()
	{
		winsEl.textContent = this.wins;
		remainingGuessCountEl.textContent = this.remainingGuesses;
		lettersGuessedEl.textContent = this.lettersGuessed;
		wordDisplayEl.textContent = this.wordDisplay;
		helpEl.textContent = this.helpText;
	},

	checkWinLoss: function()
	{
		// round won if no more blanks
		if (this.wordDisplay.indexOf("_") === -1)
		{
			this.wins++;
			this.isPlaying = false;
			this.helpText = "Dang! You won the round, good job!&nbsp;Press ANY letter key to get a new word.";
			// put word into wordsNotGuessed
			this.wordsGuessed.push(this.currentWord);
			return;
		}

		// round loss
		if (this.remainingGuesses === 0)
		{
			this.isPlaying = false;
			this.helpText = "Out of guesses! The word was " + this.currentWord + ".&nbsp;Press ANY letter key to get a new word.";
			// put word into wordsNotGuessed
			this.wordsNotGuessed.push(this.currentWord);
			return;
		}
	},
}

// MAIN GAME LOOP:

// anytime a key is pressed then released, do stuff:
document.onkeyup = function(event)
{
	if (WordGuessGame.gameOver === true)
	{
		return;
	}

	var keyPressed = event.key;
	var isNotLetter = WordGuessGame.LEGALLETTERS.indexOf(keyPressed) === -1;

	// skip everything if a non letter is pressed.
	if (isNotLetter) return;
	
	// initialize the game
	if (!WordGuessGame.isPlaying)
	{
		WordGuessGame.initializeRound();
		WordGuessGame.updateDisplay();
		return;
	}
	
	// check if letter pressed is in the word
	WordGuessGame.guessLetter(keyPressed);
	WordGuessGame.checkWinLoss();

	// update ui
	WordGuessGame.updateDisplay();
}