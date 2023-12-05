/******************************************************************************
 * @author Jake Brockbank
 * Dec 4th, 2023 (Re-vitalized)
 * This program is a simple drawing program that allows the user to draw on 
 * the screen with a variety of colors and brush sizes. The user can also 
 * erase their drawings and clear the screen. The user can also save their 
 * drawing if they wish to do so.
******************************************************************************/

let currentColor, colorPicker1, colorPicker2;
let brushSizeSlider;
let brushLocked = false;

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
	createCanvas(600, 600);
	background(0);
	frameRate(60);

	setupColorPickers();
	setupButtons();
	setupSlider();
}

/******************************************************************************
 * Method: setupColorPickers: 
 * 
 * - This method sets up the color pickers for the program.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function setupColorPickers() 
{
	colorPicker1 = createColorPicker('#ff0000');
	colorPicker1.input(() => setCurrentColor(colorPicker1.color()));
	colorPicker2 = createColorPicker('yellow');
	colorPicker2.input(() => setCurrentColor(colorPicker2.color()));
}

/******************************************************************************
 * Method: setupButtons: 
 * 
 * - This method sets up the buttons for the program.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function setupButtons() 
{
	createButton('Draw').mousePressed(() => setCurrentColor(colorPicker1.color()));
	createButton('Fill Page').mousePressed(fillPage);
	createButton('Thickness').mousePressed(changeThickness);
	createButton('Erase').mousePressed(erase);
	createButton('Clear').mousePressed(clearCanvas);
	createButton('Save Image').mousePressed(saveCanvas);
}

/******************************************************************************
 * Method: setupSlider: 
 * 
 * - This method sets up the slider for the program.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function setupSlider() 
{
	brushSizeSlider = createSlider(10, 200, 40);
	brushSizeSlider.position(5, 570);
	brushSizeSlider.style('width', '80px');
}

/******************************************************************************
 * Method: setCurrentColor: 
 * 
 * - This method sets the current color of the brush.
 *
 * Input: color.
 *
 * Output: None.
 *
******************************************************************************/
function setCurrentColor(color) 
{
	currentColor = color;
}

/******************************************************************************
 * Method: fillPage: 
 * 
 * - This method fills the page with the current color.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function fillPage() 
{
	background(colorPicker1.color());
}

/******************************************************************************
 * Method: draw: 
 * 
 * - This method is called every frame and updates the program.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function draw() 
{
	updateBrushLock();
}

/******************************************************************************
 * Method: updateBrushLock: 
 * 
 * - This method updates the brush lock.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function updateBrushLock() 
{
	brushLocked = mouseX > 49 && mouseY > 530;
}

/******************************************************************************
 * Method: mouseDragged: 
 * 
 * - This method is called every time the mouse is dragged and draws the
 * brush.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function mouseDragged() 
{
	if (!brushLocked) 
	{
		fill(currentColor);
		noStroke();
		ellipse(mouseX, mouseY, brushSizeSlider.value(), brushSizeSlider.value());
	}
}

/******************************************************************************
 * Method: changeThickness: 
 * 
 * - This method changes the thickness of the brush.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function changeThickness() 
{
    // Prompt the user for a new thickness value
    let newThickness = prompt("Enter new thickness (10 - 200):", brushSizeSlider.value());

    // Check if the user entered a value and if it's within the allowed range
    if (newThickness !== null && !isNaN(newThickness)) 
	{
        newThickness = constrain(parseInt(newThickness), 10, 200);
        brushSizeSlider.value(newThickness);
    }
}

/******************************************************************************
 * Method: erase: 
 * 
 * - This method erases the drawing.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function erase() 
{
	currentColor = 0;
}

/******************************************************************************
 * Method: clearCanvas: 
 * 
 * - This method clears the canvas.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function clearCanvas() 
{
	background(0);
}

/******************************************************************************
 * Method: saveCanvas: 
 * 
 * - This method saves the canvas.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function saveCanvas() 
{
	save('myCanvas.jpg');
}