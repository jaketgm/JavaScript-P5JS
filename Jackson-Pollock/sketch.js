/******************************************************************************
 * @author Jake Brockbank
 * Dec 4th, 2023 (Re-vitalized)
 * This program is a simple program that creates a random number of circles
 * that are randomly colored and randomly sized. (Jackson Pollock style)
******************************************************************************/

var things = [];
var numberOfThings = 200;
var randomColor;

/******************************************************************************
 * Method: setup: 
 * 
 * - This method is called once at the beginning of the program, and 
 * initializes the program.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function setup() 
{
	createCanvas(windowWidth, windowHeight);
	frameRate(1);
	for (var i = 0; i < numberOfThings; i++) 
	{
		things[i] = randomObject();
	}
	print(things);
}

/******************************************************************************
 * Method: draw: 
 * 
 * - This method is called once per frame, and draws to the canvas.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function draw() 
{
	background(220);
	for (var i = 0; i < numberOfThings; i++) 
	{
		circle(things[i].x, things[i].y, things[i].size);
		things[i].size = random(0, 60);
		randomColor = color(random(255),random(255),random(255));
		fill(randomColor);
		noStroke();
	}
}

/******************************************************************************
 * Method: randomObject: 
 * 
 * - This method creates a random object with random values.
 *
 * Input: None.
 *
 * Output: myCircles (object).
 *
******************************************************************************/
function randomObject() 
{
	var myCircles = {
		size: random(0, 60),
		x: random(0, width),
		y: random(0, height)
	};
	return myCircles;
}