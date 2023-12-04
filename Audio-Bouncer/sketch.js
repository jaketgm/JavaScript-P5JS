/******************************************************************************
 * @author Jake Brockbank
 * Dec 4th, 2023
 * This program is a simple audio visualizer that uses the p5.js library to 
 * create a canvas and display a circle that changes color and size based on
 * the bass of the song that is uploaded.
******************************************************************************/

var canvas, bgColor, fft, soundFile;
var audioContextStarted = false; // New variable to track if AudioContext is started

/******************************************************************************
 * Method: setup: 
 * 
 * - Sets up the canvas and the background color.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function setup() 
{
	colorMode(HSB, 360, 100, 100);
	frameRate(60);
	bgColor = color(330, 0, 5);
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.drop(gotFile);
	textAlign(CENTER);
	fill(0, 0, 90);
	text('Drop MP3 here, then click canvas to play when uploaded.', width / 2, height / 2);

	fft = new p5.FFT(0.4, 1024); // Initialize FFT here
}

/******************************************************************************
 * Method: gotFile: 
 * 
 * - Sets up the sound file when it is uploaded.
 *
 * Input: file.
 *
 * Output: None.
 *
******************************************************************************/
function gotFile(file) 
{
	if (!soundFile && file.type === "audio") 
	{
		soundFile = new p5.SoundFile(file.data, onSoundLoad);
		canvas.mouseClicked(togglePlay);
	}
}

/******************************************************************************
 * Method: onSoundLoad: 
 * 
 * - Sets up the sound file when it is uploaded.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function onSoundLoad() 
{
	initSound();
	if (audioContextStarted) 
	{
		soundFile.loop();
	}
}

/******************************************************************************
 * Method: draw: 
 * 
 * - Draws the circle that changes color and size based on the bass of the song
 * that is uploaded.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function draw() 
{
	if (soundFile && soundFile.isLoaded()) 
	{
		background(bgColor);
		analyseSound();

		var bassValue = getNewSoundDataValue("bass");
		var myDataColor = getDataHSBColor(bassValue);

		var myEllipseSize = map(bassValue, 0, 1, 50, 200);
		noStroke();
		fill(myDataColor);
		ellipse(mouseX, mouseY, myEllipseSize, myEllipseSize);
	}
}

/******************************************************************************
 * Method: getDataHSBColor: 
 * 
 * - Gets the color based on the bass value.
 *
 * Input: d.
 *
 * Output: color.
 *
******************************************************************************/
function getDataHSBColor(d) 
{
	var hue = map(d, 0, 1, 0, 360);
	var saturation = map(d, 0, 1, 0, 100);
	var brightness = map(d, 0, 1, 50, 100);
	return color(hue, saturation, brightness);
}

/******************************************************************************
 * Method: getNewSoundDataValue: 
 * 
 * - Gets the new sound data value.
 *
 * Input: freqType.
 *
 * Output: value.
 *
******************************************************************************/
function getNewSoundDataValue(freqType) 
{
	return map(fft.getEnergy(freqType), 0, 255, 0, 1);
}

/******************************************************************************
 * Method: initSound: 
 * 
 * - Initializes the sound.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function initSound() 
{
	soundFile.amp(0.7);
}

/******************************************************************************
 * Method: togglePlay: 
 * 
 * - Toggles the play.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function togglePlay() 
{
	if (!audioContextStarted) 
	{
		userStartAudio(); // Ensure AudioContext starts on user interaction
		audioContextStarted = true;
	}

	if (soundFile.isPlaying()) 
	{
		soundFile.pause();
	} 
	else 
	{
		soundFile.loop();
	}
}

/******************************************************************************
 * Method: analyseSound: 
 * 
 * - Analyzes the sound.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function analyseSound() 
{
	fft.analyze();
}