// music player elements
var bandPictureEl = document.getElementById("bandPicture");
var musicPlayerEl = document.getElementById("musicPlayer");
var playButtonEl = document.getElementById("playButton");
var nowPlayingEl = document.getElementById("nowPlaying");
var audioEl = document.createElement("audio");
var musicIsPlaying = false;

// play/pause button functionality
playButtonEl.onclick = function()
{
	if (audioEl.paused)
	{
		audioEl.play();
		playButtonEl.textContent = "Pause"
		return;
	}
	audioEl.pause();
	playButtonEl.textContent = "Play"
}

// updates the Music Player Display with data from a word object.
// param: wordObject
// reads: wordObject
// writes: audioEl, playButtonEl, nowPlayingEl, bandPictureEl
// returns: nothing
function updateMusicPlayer(wordObject)
{
	musicPlayerEl.className = "show";
	audioEl.pause();
	playButtonEl.textContent = "Play";
	nowPlayingEl.textContent = wordObject.songName;
	bandPictureEl.src = wordObject.imageUrl;
	audioEl.src = wordObject.songUrl;
	playButtonEl.click();
}