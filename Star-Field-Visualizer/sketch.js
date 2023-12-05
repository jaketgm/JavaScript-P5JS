/******************************************************************************
 * @author Jake Brockbank
 * Dec 4th, 2023 (Re-vitalized)
 * This program is a simple starfield simulation.
******************************************************************************/

var stars = []
var num = 800;
var speed;

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
	for(var i = 0; i < num; i++)
	{
		stars.push(new Star());  
	}
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
	speed = map(mouseX,0,width,0,20);
	background(0);
	translate(width/2,height/2);
	for(var i = 0; i < stars.length; i++)
	{
		stars[i].move();
		stars[i].edges();
		stars[i].display();
	}
}