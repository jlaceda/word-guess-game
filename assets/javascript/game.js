// grab all the elements to be manipulated
var helpEl = document.getElementById("help");
var winsEl = document.getElementById("wins");
var remainingGuessCountEl = document.getElementById("remainingGuessCount");
var lettersGuessedEl = document.getElementById("lettersGuessed");
var wordDisplayEl = document.getElementById("wordDisplay");

// Updates DOM
// param: Game Object
// reads: WordGuessGame
// writes: winsEl, remainingGuessCountEl, helpEl, lettersGuessedEl, wordDisplayEl
// returns: nothing
function updateDisplay(game)
{
	winsEl.textContent = game.wins;
	remainingGuessCountEl.textContent = game.remainingGuesses;
	lettersGuessedEl.textContent = game.lettersGuessed;
	wordDisplayEl.textContent = game.wordDisplay;
	helpEl.textContent = game.helpText;
}

// GAME OBJECT !!!
var WordGuessGame =
{
	availableWords: words,
	wordsGuessed: [],
	wordsNotGuessed: [],
	currentWord: {},
	wins: 0,
	remainingGuesses: 0,
	lettersGuessed: "",
	wordDisplay: "",
	isPlaying: false,
	helpText: "Press ANY letter key to get started.",
	gameOver: false,

	// GAME METHODS:

	// puts a new word into currentWord
	// reads: availableWords
	// writes: currentWord, availableWords
	// returns: nothing
	newRandomWord: function() 
	{
		// clear word
		this.currentWord = {};

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

	// start a round
	// reads: currentWord
	// writes: currentWord, gameOver, helpText, wordDisplay, remainingGuesses, lettersGuessed, isPlaying
	// returns: nothing
	initializeRound: function()
	{
		// initialize game
		this.newRandomWord();

		// sets gameOver true when we run out of words
		if (this.currentWord === {})
		{
			this.gameOver = true;
			this.helpText = "Game Over! You got " + this.wins + " .";
			return;
		}

		// create display of underscores for each letter in the word.
		var blanks = ""
		for (let i = 0; i < this.currentWord.word.length; i++)
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

	// tries a letter against hidden word
	// params: letter to be tried
	// reads: currentWord, lettersGuessed
	// writes: remainingGuesses, lettersGuessed, helpText, wordDisplay
	// returns: nothing
	guessLetter: function(letter)
	{
		// already guess this letter, skip.
		if (this.lettersGuessed.indexOf(letter) !== -1)
		{
			this.helpText = "You have already guessed " + letter + " before.";
			return;
		}

		var word = this.currentWord.word

		// this letter is not in the word.
		if (word.indexOf(letter) === -1)
		{
			this.remainingGuesses--;
			// add to lettersGuessed
			this.lettersGuessed = this.lettersGuessed + " " + letter;
			this.helpText = "Oops! Try again."
			return;
		}

		this.helpText = "Noice!"

		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
		var startSearchFrom = 0;
		while (word.indexOf(letter, startSearchFrom) !== -1) 
		{
			var index = word.indexOf(letter, startSearchFrom)
			// update wordDisplay
			// https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
			this.wordDisplay = this.wordDisplay.substring(0,index) + letter + this.wordDisplay.substring(index + 1);
			startSearchFrom = index + 1;
		}

	},

	// Checks if player has won or lost the round
	// no side effects if neither won nor lost
	// reads: wordDisplay, remainingGuesses, currentWord
	// writes: wins, isPlaying, helpText, wordsGuessed
	// returns: bool if won
	checkWinLoss: function()
	{
		// round won if no more blanks
		if (this.wordDisplay.indexOf("_") === -1)
		{
			this.wins++;
			this.isPlaying = false;
			this.helpText = "Dang! Good job getting " + this.currentWord.band + "! Press ANY letter key to get a new word.";
			// put word into wordsGuessed
			this.wordsGuessed.push(this.currentWord);
			return true;
		}

		// round loss
		if (this.remainingGuesses === 0)
		{
			this.isPlaying = false;
			this.helpText = "Out of guesses! The word was " + this.currentWord.band + ". Press ANY letter key to get a new word.";
			// put word into wordsNotGuessed
			this.wordsNotGuessed.push(this.currentWord);
			return false;
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
	var isNotLetter = "abcdefghijklmnopqrstuvwxyz".indexOf(keyPressed) === -1;

	// skip everything if a non letter is pressed.
	if (isNotLetter) return;
	
	// initialize the game
	if (!WordGuessGame.isPlaying)
	{
		WordGuessGame.initializeRound();
		updateDisplay(WordGuessGame);
		return;
	}
	
	// check if letter pressed is in the word
	WordGuessGame.guessLetter(keyPressed);

	// update music player
	if (WordGuessGame.checkWinLoss())
	{
		updateMusicPlayer(WordGuessGame.currentWord)
	}

	// update ui
	updateDisplay(WordGuessGame);
}