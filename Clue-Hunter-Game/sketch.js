/******************************************************************************
 * @author Jake Brockbank
 * Dec 4th, 2023 (Original)
 * This program is a game where you have to find clues to escape the room
 * The game is called Clue Hunter. 
******************************************************************************/

// Title Screen variables and booleans
let TitleScreen;
let settingsActive = false;
let titleScreenActive = true;

let ticketIsActive = false;
let bookActive = false;
let windowActive = false;
let footPrintActive = false;
let goBack = false;
let briefCaseIsActive = false;
let phoneIsActive = false;

// Animation variables
let rectWidth = 20;
let rectHeight = 100;
let x1 = -rectWidth;
let y = 150;

let img;
let exitActive = false;
let noteIsActive = false;
let keyIsActive = false;
let passwordCorrect = false;

// Variables for the array
var code = ['_', '_', '_', '_'];
var codeNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var password = 6280;
var thousands, hundreds, tenths, ones;
var passwordEntered = '';
var timerValue = 60;
var startButton;

let startSearch = false;

var x = 20;
var homeActive = false;

// Booleans
let noteActive = false,
	keyMove = false,
	clickedHome = false,
	runKey = true;

// Different levels
var level = 1;

/******************************************************************************
 * Method: preload: 
 * 
 * - This function loads images and other resources before the program starts. 
 * Each loadImage call loads an image file into a variable. For example, 
 * LocationOne = loadImage('Location 1.png'); loads an image named 
 * 'Location 1.png' into the variable LocationOne. This function ensures that 
 * all necessary graphics are loaded and ready to use when the game starts.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function preload() 
{
	// Levels 1 and 2
	LocationOne = loadImage('Location 1.png');
	KeyGame = loadImage('Keys.png');
	home = loadImage('Home.png');
	homeClicked = loadImage('HomePressed.png');
	LocationTwo = loadImage('Location 2.jpg');
	MagnifyingGlass = loadImage('MagnifyingGlass.png');
	TitleScreen = loadImage('TitleScreen.jpg');
	HomeImage = loadImage('HomeImage.jpg');
	FakeKey = loadImage('FakeKey.png');
	Key2 = loadImage('Key2.png');
	StartButton = loadImage('StartButton.png');
	Settings = loadImage('Settings.png');

	// Levels 3 and 4
	OutsideTrain = loadImage('OutsideTrain.jpg');
	InsideTrain = loadImage('InsideTrain.png');
	TrainTicket = loadImage('TrainTicket.png');
	People = loadImage('People.png');
	Book = loadImage('Book.png');
	Page = loadImage('Page.png');
	Footprint = loadImage('Footprint.png');
	ID = loadImage('ID.png');
	Transparent = loadImage('Transparent.png');
	Back = loadImage('Back.png');
	Phone = loadImage('Phone.png');
	briefCase = loadImage('briefCase.png');
	Money = loadImage('Money.png');
	Office = loadImage('Office.jpg');
}

/******************************************************************************
 * Method: setup: 
 * 
 * - This function is called once when the program starts. It's used to set up 
 * the environment, such as creating the canvas with createCanvas(400, 400); 
 * and setting the text alignment with textAlign(CENTER);.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function setup() 
{
	createCanvas(400, 400);
	textAlign(CENTER);
}

/******************************************************************************
 * Method: keyPressed: 
 * 
 * - This function is called every time a keyboard key is pressed. It's used 
 * here to handle input when the user is on level 2 of the game. The 
 * function checks for key presses, updates the passwordEntered variable, 
 * and performs actions based on the input (like unlocking a box if the 
 * correct password is entered).
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function keyPressed()
{
	if (level == 2) 
	{
		startSearch = true;
		passwordEntered += key;
		print(passwordEntered);
		if (passwordEntered == password) 
		{
			noteIsActive = false;
			button.remove();
			passwordCorrect = true;
			//Unlock the box
		} 
		else if (passwordEntered.length >= 5) 
		{
			passwordEntered = '';
		}
	}
}

/******************************************************************************
 * Method: draw: 
 * 
 * - The draw() function continuously executes the lines of code contained 
 * inside its block until the program is stopped. It's used to update the 
 * display window and to handle interactions. In this case, it's used to 
 * draw different game screens based on the game state, such as the title 
 * screen, home screen, or different game levels.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function draw() 
{
	// If the home button is clicked display home screen otherwise display level 1
	if (titleScreenActive == true) 
	{
		drawTitleScreen();
	} 
	else if (homeActive == true) 
	{
		drawHomeScreen();
	} 
	else if (level == 1) 
	{
		drawLevel1();
	} 
	else if (level == 2) 
	{
		drawLevel2();
	} 
	else if (level == 3) 
	{
		drawLevel3();
	} 
	else if (level == 4) 
	{
		drawLevel4();
	}

	// Enables titlescreen until play button is pressed
	// This happens all the time
	homeAnimation();
	if (titleScreenActive == false) 
	{
		drawHomeButton();
	}
}

/******************************************************************************
 * Method: drawHomeButton: 
 * 
 * - This function is responsible for drawing the home button on the screen. 
 * It also handles the logic to change the button's appearance when it's 
 * clicked.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function drawHomeButton() 
{
	image(home, 280, 270, 200, 200);

	// Home button clicked
	if (mouseX > 360 && mouseY > 370 && mouseIsPressed) 
	{
		// Boolean for home button
		image(homeClicked, 280, 270, 200, 200);
		clickedHome = true;
	}
}

/******************************************************************************
 * Method: drawHomeScreen: 
 * 
 * - Draws the home screen of the game. It displays the home image, and text 
 * for 'Clue Hunter', 'Exit', and 'Return'. It also includes logic to reload 
 * the page when the 'Exit' area is clicked.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function drawHomeScreen() 
{
	image(HomeImage, 0, 0, width, height);

	textSize(40);
	fill('white');
	text('Clue Hunter', 150, 70);

	textSize(30);
	fill('white');
	text('Exit', 250, 250);

	textSize(30);
	fill('white');
	text('Return', 250, 390);

	if (mouseX > 252 && mouseX < 298 && mouseY > 237 && mouseY < 249 && mouseIsPressed) 
	{
		location.reload();
	}
}

/******************************************************************************
 * Method: drawLevel1: 
 * 
 * - Renders the first level of the game. It sets a custom background and 
 * calls other functions (keyAttributes(), clickedBox(), exit1()) to handle 
 * specific elements and interactions within this level.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function drawLevel1() 
{
	// Custom background
	image(LocationOne, 0, 0, width, height + 40);
	// Draws seperate image functions
	keyAttributes();
	clickedBox();
	exit1();
}

/******************************************************************************
 * Method: homeAnimation: 
 * 
 * - Handles an animation when the home button is clicked. It gradually 
 * increases the size of an ellipse and toggles the homeActive state once 
 * the animation is complete.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function homeAnimation() 
{
	if (clickedHome == true) 
	{
		if (x < width + 320) 
		{
			x = x + 20;
		}

		fill(0);
		stroke(50);
		ellipse(200, 200, x);
	}

	// Animation is done
	if (x == 720) 
	{
		x = 0;
		homeActive = !homeActive;
		clickedHome = false;
	}
}

/******************************************************************************
 * Method: keyAttributes: 
 * 
 * - Manages the key's attributes in Level 1. If keyMove is false, the key is 
 * static; otherwise, the key follows the mouse. It also includes logic for 
 * enabling the key to move when certain conditions are met.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function keyAttributes() 
{
	/* If they key move is false the key will not move; however, if the mouse is over the set barrier the player can move the key */
	if (keyMove == false) 
	{
		image(KeyGame, 178, 85, 15, 30);
	} 
	else 
	{
		keyIsActive = true;
		image(KeyGame, mouseX, mouseY, 15, 30);
	}

	// Barrier made for the key
	if (mouseY >= 89 && mouseX <= 188 && mouseY <= 112 && mouseX >= 181 && mouseIsPressed) 
	{
		keyMove = true;
	}
}

/******************************************************************************
 * Method: clickedBox: 
 * 
 * - Handles the interaction with a clickable box. It toggles the noteActive 
 * state when the box is clicked, and if active, it displays a secret note.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function clickedBox() 
{
	// Note box
	fill(15);
	rect(0, 0, 15, 30);

	if (mouseX <= 15 && mouseY <= 30 && mouseIsPressed) 
	{
		noteActive = true;
	}

	// This contains the boolean, the barrier and the text for the secret note
	if (noteActive == true) 
	{
		textSize(20);
		fill('brown');
		text('You have found the secret code \n - The hint is F2H0 ', 30, 30);

		if (mouseX <= 15 && mouseY <= 30 && mouseIsPressed) 
		{
			noteActive = false;
		}
	}
}

/******************************************************************************
 * Method: exit1: 
 * 
 * - Handles the exit logic for Level 1. If certain conditions are met 
 * (like having the key and clicking in a specific area), it sets level to 
 * 2, indicating the transition to the next level.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function exit1() 
{
	if (mouseX >= 123 && mouseX <= 162 && mouseY >= 146 && mouseY <= 246 && mouseIsPressed && level == 1 && keyIsActive == true) 
	{
		exitActive = true;
		level = 2;
	} 
	else if (exitActive == false && keyIsActive == true) 
	{
		fill(232, 228, 205);
		strokeWeight(5);
		stroke(255);
		rect(150, 0, 150, 30);

		fill(0);
		textSize(10);
		noStroke();
		text('YOU HAVE FOUND THE KEY, \n NOW ESCAPE', 155, 12);
	}
}

numberOfTimesActive = 1;

/******************************************************************************
 * Method: buttonResetLevel2: 
 * 
 * - Resets the passwordEntered variable. This function is called from a 
 * button to reset the password input in Level 2.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function buttonResetLevel2() 
{
	passwordEntered = '';
}

/******************************************************************************
 * Method: drawLevel2: 
 * 
 * - Draws the second level of the game. It sets a background, displays 
 * images, and includes logic for transitioning to Level 3 if the correct 
 * conditions are met.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function drawLevel2() 
{
	background(0);
	image(LocationTwo, 0, 0, width, height + 40);
	image(FakeKey, 163, 201, 30, 30);
	image(Key2, 17, 233, 40, 30);

	if (passwordCorrect == false) 
	{
		fill(52, 55, 53);
		noStroke();
		rect(10, 203, 50, 100, 40);
	} 
	else if (mouseX >= 10 && mouseX <= 60 && mouseY >= 205 && mouseY <= 305 && mouseIsPressed) 
	{
		// click detection here
		level = 3;
		setInterval(timeIt, 1000);
	}

	keyNote();
	displayText();
}

/******************************************************************************
 * Method: keyNote: 
 * 
 * - Manages the display and interaction with a note in Level 2. It toggles 
 * the noteIsActive state and displays text for a password hint.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function keyNote() 
{
	if (noteIsActive == true) 
	{

		numberOfTimesActive += 1;

		if (numberOfTimesActive == 2) 
		{
			button = createButton('Reset');
			button.position(250, 250, 30, 30);
			button.mousePressed(buttonResetLevel2);
		}

		fill(52, 55, 53);
		rect(200, 100, 150, 200, 30);

		fill(255);
		textSize(10);
		textFont('Code Bold');
		text('Type in a 4 character password', 210, 130);
	}

	if (mouseX >= 10 && mouseX <= 60 && mouseY >= 205 && mouseY <= 305 && mouseIsPressed) 
	{
		noteIsActive = true;
	}

	if (noteIsActive) 
	{
		fill(150);
		for (i = 0; i < 4; i++) 
		{
			textSize(30);
			text(code[i], 227 + (25 * i), 190);
		}
	}
}

/******************************************************************************
 * Method: displayText: 
 * 
 * - Displays text based on the passwordEntered variable. It's used in Level 
 * 2 to show the password as it's being entered.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function displayText() 
{
	if (passwordEntered != '' && noteIsActive) 
	{
		for (i = 0; i < passwordEntered.length; i++) 
		{
			textSize(30);
			text(passwordEntered[i] + '', 235 + (25 * i), 190);
		}
	}
}

/******************************************************************************
 * Method: setup: 
 * 
 * - Sets up the canvas for the game.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function setup() 
{
	createCanvas(400, 400);
}

/******************************************************************************
 * Method: customAspects: 
 * 
 * - Sets up custom aspects of the title screen, including images and text 
 * styling.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function customAspects() 
{
	// Custom Images used
	image(TitleScreen, 0, 0, width, height + 40);
	image(StartButton, 270, 340, 60, 60);
	image(Settings, 34, 349, 90, 50);

	// Title
	fill(35, 50, 142);
	textSize(50);
	textFont('Code Bold');
	text('CLUE HUNTER', 12, 100);
}

/******************************************************************************
 * Method: drawTitleScreen: 
 * 
 * - Renders the title screen with custom aspects, settings box, and play 
 * button. It also includes text for the buttons.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function drawTitleScreen() 
{
	background(0);
	customAspects();
	settingsBox();
	playButton();

	// Text in Buttons
	fill(35, 50, 142);
	textSize(15);
	textFont('Code Bold');
	text('PLAY', 280, 375);

	fill(35, 50, 142);
	textSize(15);
	textFont('Code Bold');
	text('SETTINGS', 40, 380);
}

/******************************************************************************
 * Method: settingsBox: 
 * 
 * - Manages the display and interaction with the settings box. It toggles 
 * the settingsActive state and displays instructions for playing the game.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function settingsBox() 
{
	// This contains the boolean, barrier and the text for the settings
	if (settingsActive == true) 
	{
		fill(35, 50, 142);
		strokeWeight(5);
		rect(0, 132, 160, 190, 40);

		fill(35, 50, 142);
		noStroke();
		quad(108, 281, 106, 320, 69, 323, 75, 366);

		fill(255);
		textSize(15);
		textFont('Code Bold');
		text('How to Play: \n\n click using your \n mouse to find clues \n Once you have found all \n clues, find the key \n Then escape', 5, 185);
	}
	if (mouseX >= 33 && mouseX <= 123 && mouseY >= 350 && mouseY <= 399 && mouseIsPressed && settingsActive == false) 
	{
		settingsActive = true;
	} 
	else if (mouseIsPressed) 
	{
		settingsActive = false;
	}
}

/******************************************************************************
 * Method: playButton: 
 * 
 * - Handles the play button interaction on the title screen. When clicked, 
 * it disables the title screen, indicating the start of the game.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function playButton() 
{
	if (mouseX >= 270 && mouseX <= 328 && mouseY >= 340 && mouseY <= 398 && mouseIsPressed) 
	{
		titleScreenActive = false;
	}
}

/******************************************************************************
 * Method: drawLevel3: 
 * 
 * - Renders the third level of the game, displaying images like OutsideTrain 
 * and People. It handles interactions with a book, displaying a page with 
 * text when certain conditions are met. Also, it includes a timer display 
 * and a logic to reset the level if time runs out.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function drawLevel3() 
{
	image(OutsideTrain, 0, 0, width, height + 40);
	image(People, 141, 180, 200, 160);
	image(Book, 0, 360, 50, 50);

	if (mouseIsPressed) 
	{
		if (bookActive == true) 
		{
			image(Page, 150, 150, 100, 100);
			fill(0);
			text('Not a door \n ; however, \n you can see \n out of it', 168, 180);
		}
	}

	if (mouseX > 0 && mouseX < 46 && mouseY > 363 && mouseY < 400) 
	{
		fill(255);
		text('Hold to inspect', 50, 337);
		bookActive = true;
	} 
	else 
	{
		bookActive = false;
	}

	fill(220);
	stroke(0);
	strokeWeight(5);
	rect(70, 10, 100, 50);

	rect(70, 0, 10, 20);
	rect(160, 0, 10, 20);

	fill(235, 230, 209);
	strokeWeight(5);
	rect(350, 300, 30, 40);

	fill(235, 230, 209);
	strokeWeight(5);
	rect(340, 330, 50, 20);
	noStroke();

	ticketBox();

	// Type of time (Seconds)
	if (timerValue <= 60) 
	{
		textSize(12);
		fill(0);
		text(timerValue + " SECONDS", 80, 40);
	}

	if (timerValue == 0) 
	{
		fill('red');
		ellipse(300, 300, 2000);
		textSize(25);
		fill(0);
		text('Suspect Got Away, R TO RESTART', 10, 200);

		ticketIsActive = false;

		if (keyIsDown(82)) 
		{
			resetLevel();
		}
	}
	windowEscape();
}

/******************************************************************************
 * Method: drawLevel4: 
 * 
 * - Draws the fourth level. It displays images like InsideTrain, Footprint, 
 * Phone, and briefCase, and includes logic for different interactive elements 
 * like phone, footprint, and briefcase. When phoneIsActive is true, it 
 * changes the scene to an office setting.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function drawLevel4() 
{
	if (level != 3) 
	{
		image(InsideTrain, 0, 0, width, height + 40);
		fill(35, 50, 142);
		textFont('Code Bold');
		text('Final Location', 173, 77);
		image(Footprint, 199, 377, 50, 50);
		image(Phone, 190, 149, 15, 20);
		image(briefCase, 170, 170, 50, 50);
		phone();
		footPrint();
		brief();

		if (phoneIsActive == true) 
		{
			image(Office, 0, 0, width, height);
			fill(145);
			rect(0, 25, 400, 30);
			textSize(30);
			fill(35, 50, 142);
			textFont('Code Bold');
			text('Clue Hunter', 120, 50);
			fill(145);
			rect(0, 350, 400, 30);

			fill(35, 50, 142);
			textSize(20);
			text('By: Jake Brockbank', 120, 370);

			fill(35, 50, 142);
			animation();

		}
	}
	ticketIsActive = false;
}

/******************************************************************************
 * Method: resetLevel: 
 * 
 * - Resets various variables to their initial states, essentially restarting 
 * the current level.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function resetLevel() 
{
	//reset booleans back to original values
	timerValue = 30;
	ticketIsActive = false;
	level = 3;
	bookActive = false;
	windowActive = false;
}

/******************************************************************************
 * Method: timeIt: 
 * 
 * - Decreases the timerValue by one. It's likely used with a timer to count 
 * down seconds.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function timeIt() 
{
	if (timerValue > 0) 
	{
		timerValue--;
	}
}

/******************************************************************************
 * Method: ticketBox: 
 * 
 * - Manages the interaction with a ticket box. When ticketIsActive is true, 
 * it displays the TrainTicket image and some text.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function ticketBox() 
{
	// Draw ticket rectangle
	fill(235, 230, 209);
	stroke(0);
	strokeWeight(5);
	rect(365, 310, 20, 20);
	noStroke();

	if (ticketIsActive == true) 
	{
		image(TrainTicket, 150, 200, 100, 100);

		fill(0);
		textSize(15);
		textFont('Code Bold');
		text('Cabin 6', 175, 270);
		text('Ticket', 175, 235);
	}
	if (mouseX >= 363 && mouseX <= 387, mouseY >= 310 && mouseY <= 331 && mouseIsPressed && ticketIsActive == false) 
	{
		ticketIsActive = true;
	} 
	else if (mouseIsPressed) 
	{
		ticketIsActive = false;
	}
}

/******************************************************************************
 * Method: windowEscape: 
 * 
 * - Handles the logic for a window escape scenario. If windowActive is true, 
 * it changes the level to 4.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function windowEscape() 
{
	if (windowActive == true) 
	{
		ticketIsActive = false;
		bookActive = false;
	}
	if (mouseX >= 9 && mouseX <= 39 && mouseY <= 186 && mouseY >= 78 && mouseIsPressed) 
	{
		windowActive = true;
		level = 4;
	}
}

/******************************************************************************
 * Method: footPrint: 
 * 
 * - Manages the interaction with a footprint. When footPrintActive is true, 
 * it displays an ID card and other information, with the ability to close 
 * this view.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function footPrint() 
{
	if (footPrintActive == true) 
	{
		image(Transparent, 0, 0, width, height);
		image(ID, 50, 100, 150, 150);
		image(Back, 300, 320, 50, 50);
		fill(255);
		text('Jeremey Scott', 100, 100);
		text('Age: 32', 220, 150);
		text('Date of Birth: January 2nd, 1992', 220, 180);
		text('Adress: 1234 Oak Street', 220, 210);
	}
	if (mouseX >= 199 && mouseX <= 238 && mouseY >= 379 && mouseY <= 400 && mouseIsPressed) 
	{
		footPrintActive = true;
	}
	if (mouseX >= 301 && mouseX <= 351 && mouseY >= 322 && mouseY <= 371 && mouseIsPressed) 
	{
		footPrintActive = false;
	}
}

/******************************************************************************
 * Method: brief: 
 * 
 * - Handles the interaction with a briefcase. When briefCaseIsActive is true, 
 * it displays an image of money.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function brief() 
{
	if (briefCaseIsActive == true) 
	{
		image(Money, 30, 30, 50, 50);
	}
	if (mouseX >= 172 && mouseX <= 220 && mouseY >= 173 && mouseY <= 218 && mouseIsPressed && briefCaseIsActive == false) 
	{
		briefCaseIsActive = true;
	} 
	else if (mouseIsPressed) 
	{
		briefCaseIsActive = false;
	}
}

/******************************************************************************
 * Method: phone: 
 * 
 * - Manages the interaction with a phone. When phoneIsActive is true, it 
 * clears the current content and sets a background.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function phone() 
{
	if (phoneIsActive == true) 
	{
		clear();
		background(0);
	}
	if (mouseX >= 193 && mouseX <= 203 && mouseY >= 153 && mouseY <= 170 && mouseIsPressed) 
	{
		phoneIsActive = true;
	}
}

/******************************************************************************
 * Method: animation: 
 * 
 * - Creates a moving rectangle animation. It continuously moves a rectangle 
 * across the screen, resetting its position once it moves off-screen.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function animation() 
{
	noStroke();
	// Make a rectangle
	rect(x1, y, rectWidth, rectHeight);
	// Make it move
	if (x1 > width) 
	{
		x1 = -rectWidth;
	}

	x1 += 2.9;
}