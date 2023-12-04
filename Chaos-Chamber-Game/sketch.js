/******************************************************************************
 * @author Jake Brockbank
 * Dec 4th, 2023 (Re-vitalized)
 * This program is a maze game where the player must navigate through a maze
 * and reach the exit. The player must avoid the enemies that are randomly
 * placed throughout the maze. The player can move using the arrow keys.
******************************************************************************/

var soundTrack;
var scl = 20;
var slider;
let song;
var numberOfEnemies = 3;
var backgroundColor = 0;

var exit = {
	size: 50,
	x: 0,
	y: 0,
};

var enemies = [];
var walls = [];
var player;

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
	soundTrack = loadSound('Waterflame - Haunted woods-1.mp3', loaded);
	slider = createSlider(0, 1, 0.5, 0.01);

	player = new Player();
	frameRate(10);

	walls = [
		[0, 90, 50, 700],
		[0, -20, 150, 150],
		[0, 500, 150, 150],
		[0, 90, 150, 150],
		[150, 576, 150, 150],
		[308, 382, 100, 100, 20],
	];

	for (var j = 0; j < numberOfEnemies; j++) 
	{
		enemies[j] = {
			speed: 5,
			x: random(width),
			y: random(height),
		};
	}
}

/******************************************************************************
 * Method: loaded: 
 * 
 * - This method is called once the sound track is loaded.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function loaded() 
{
	soundTrack.loop();
}

let randomFlag = true;

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
	if (randomFlag == true)
	{
		resetLevel();
		randomFlag = false;
	}

	if (playerWin == false) 
	{
		if (player.isLive == true) 
		{
			background(0);
			drawWalls();
			detect();
			drawExit();
			moveEnemies();
			drawEnemies();
			soundTrack.setVolume(slider.value());
			player.update();
			player.show();
		} 
		else
		{
			background('red');
			textSize(50);
			text('Dead, R TO RESTART', 300, 200);
			if (keyIsDown(82)) 
			{
				resetLevel();
				player.isLive = true; 
				player.hitPoints = 0;
				player.x = 200; 
				player.y = 50;
				for (var j = 0; j < numberOfEnemies; j++) 
				{ 
					enemies[j] = {
						speed: 6,
						x: random(width),
						y: random(height),
					};
				}
			}
		}
	}
    else 
	{
		if (keyIsDown(82)) 
		{
			resetLevel();
			playerWin = false;
		}
  	}
    winLevel();
}

/******************************************************************************
 * Method: drawWalls: 
 * 
 * - Loop Over the Walls Array: The function uses a for loop to iterate over 
 * each element in the walls array. Each element in this array is expected 
 * to represent a wall.
 * - Access Wall Properties: Within the loop, var wall = walls[i]; assigns 
 * the ith element of the walls array to the variable wall. Each wall is 
 * expected to be an array or object that contains information about the 
 * position and size of the wall. Typically, this would be in the format 
 * [x, y, width, height].
 * - Set Fill Color: The fill(182, 88, 44); line sets the color for 
 * drawing the walls. The color is defined using RGB values; in this 
 * case, it's a shade of brown.
 * - Draw the Rectangle: rect(wall[0], wall[1], wall[2], wall[3]); 
 * draws a rectangle on the canvas. The parameters for rect function are 
 * interpreted as the x-coordinate (wall[0]), y-coordinate (wall[1]), 
 * width (wall[2]), and height (wall[3]) of the rectangle. This corresponds 
 * to the position and size of the wall.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function drawWalls() 
{
	for (var i = 0; i < walls.length; i++) 
	{
		var wall = walls[i];

		fill(182, 88, 44);
		rect(wall[0], wall[1], wall[2], wall[3]);
	}
}

/******************************************************************************
 * Method: drawEnemies: 
 * 
 * - Loop Through Enemies: The function begins with a for loop that iterates 
 * over the enemies array. The loop runs as many times as the value of 
 * numberOfEnemies, ensuring that each enemy in the array is processed.
 * - Access Individual Enemy: Inside the loop, var enemy = enemies[i]; 
 * retrieves the ith enemy from the enemies array. Each enemy is expected to 
 * be an object or array that contains information about its position on 
 * the canvas.
 * - Set Fill Color for Drawing: The line fill(124, 37, 58); sets the color 
 * used to draw the enemies. The color is specified in RGB format 
 * (in this case, a shade of burgundy).
 * - Draw the Enemy: The rect(enemy.x, enemy.y, scl, scl); command draws a 
 * rectangle at the enemy's position. The enemy.x and enemy.y represent the 
 * x and y coordinates of the enemy, respectively, while scl is used for both 
 * the width and height of the rectangle, making it a square. This means each 
 * enemy is represented as a square of side length scl pixels, drawn at its 
 * respective position.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function drawEnemies() 
{
	for (var i = 0; i < numberOfEnemies; i++) 
	{
		var enemy = enemies[i];

		fill(124, 37, 58);
		rect(enemy.x, enemy.y, scl, scl);
	}
}

/******************************************************************************
 * Method: moveEnemies: 
 * 
 * - Loop Through Each Enemy: The function starts with a for loop that 
 * iterates over the enemies array. Each iteration of the loop processes 
 * one enemy.
 * - Access and Process Each Enemy: Inside the loop, var enemy = enemies[i]; 
 * retrieves the current enemy from the enemies array. This enemy is expected 
 * to have properties like x and y for its position.
 * - Calculate Distance to Player:
 *   - var distX = player.x - enemy.x; and var distY = player.y - enemy.y; 
 *     calculate the horizontal and vertical distances between the enemy and 
 *     the player, respectively.
 *   - var distanceBetween = dist(enemy.x, enemy.y, player.x, player.y); 
 *     computes the direct distance between the enemy and the player using 
 *     the dist function, which likely calculates the Euclidean distance.
 * - Move Enemy Towards Player:
 *   - The condition if (distanceBetween > enemy.speed) checks if the enemy 
 *     is farther away from the player than its speed. This prevents the 
 *     enemy from overshooting the player's position.
 *   - var ratio = enemy.speed / distanceBetween; calculates a movement 
 *     ratio based on the enemy's speed and the distance to the player. This 
 *     ensures that the enemy moves a fraction of the distance towards the 
 *     player.
 *   - enemy.x += random(ratio * distX); and enemy.y += random(ratio * distY); 
 *     update the enemy's position. The use of random introduces a degree of 
 *     variability in the movement, making the enemy's approach less linear 
 *     and more unpredictable.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function moveEnemies() 
{
	for (var i = 0; i < enemies.length; i++) 
	{
		// Get the current enemy from the array
		var enemy = enemies[i];

		/* Check the distance between the enemy and player */
		var distX = player.x - enemy.x;
		var distY = player.y - enemy.y;

		var distanceBetween = dist(enemy.x, enemy.y, player.x, player.y);

		// Move the enemy towards the player
		if (distanceBetween > enemy.speed) 
		{
			var ratio = enemy.speed / distanceBetween;
			enemy.x += random(ratio * distX);
			enemy.y += random(ratio * distY);
		}
	}
}

var playerWin = false;

/******************************************************************************
 * Method: drawExit: 
 * 
 * - Draw Exit Box:
 *   - noFill() sets no fill color for shapes.
 *   - stroke(184, 24, 231); sets the stroke (outline) color of shapes to 
 *     a specific RGB color (in this case, a shade of purple).
 *   - strokeWeight(4); sets the width of the stroke to 4 pixels.
 *   - rect(exit.x, exit.y, exit.size, exit.size); draws a rectangle 
 *     (the exit box) at coordinates (exit.x, exit.y) with a width and height 
 *     of exit.size. This rectangle likely represents the exit point or goal 
 *     in the game.
 * - Display Exit Text:
 *   - fill(103, 93, 106); sets the fill color for the text, a different shade.
 *   - strokeWeight(0); removes the stroke from the text.
 *   - textSize(14); sets the size of the text.
 *   - textAlign(CENTER); aligns the text to the center.
 *   - text("EXIT", exit.x, exit.y + 5); displays the word "EXIT" at the 
 *     specified coordinates, slightly offset from the top edge of the exit box.
 * - Check for Player Interaction with Exit:
 *   - The if statement checks if the player's position overlaps with the exit 
 *     box. If the player is within the bounds of the exit box, the variable 
 *     playerWin is set to true, indicating that the player has reached the exit 
 *     and possibly completed the level or the game.
 * - Draw Walls:
 *   - The function iterates over the walls array and draws each wall using 
 *     the rect function, similar to the drawWalls function.
 * - Level Reset Condition:
 *   - Another if statement checks if the exit overlaps with any wall. If so, 
 *     it calls resetLevel(). This might be a measure to ensure that the exit 
 *     does not spawn inside a wall, making it inaccessible.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function drawExit() 
{
	noFill();
	stroke(184, 24, 231);
	strokeWeight(4);
	rect(exit.x, exit.y, exit.size, exit.size);

	// Draw text
	fill(103, 93, 106);
	strokeWeight(0);
	textSize(14);
	textAlign(CENTER);
	text("EXIT", exit.x, exit.y + 5);

	if (player.x + 20 > exit.x && player.x < exit.x + exit.size && player.y + 20  > exit.y && player.y < exit.y + exit.size )
	{
		playerWin = true;
	}

	for (var i = 0; i < walls.length; i++) 
	{
		var wall = walls[i];

		fill(182, 88, 44);
		rect(wall[0], wall[1], wall[2], wall[3]);
	}

	if (exit.x + exit.size > wall[0] && exit.x < wall[0] + wall[2] && exit.y + exit.size > wall[1] && exit.y < wall[1] + wall[3] )
	{
		resetLevel();
	}
}

/******************************************************************************
 * Method: winLevel: 
 * 
 * - Check Win Condition:
 *   - The function begins with an if statement that checks the boolean 
 *     variable playerWin. If playerWin is true, it means the player has met 
 *     the conditions for winning the level (such as reaching a certain point, 
 *     collecting a specific item, etc., depending on how playerWin is set in 
 *     other parts of the code).
 * - Update Background:
 *   - background('green'); changes the background color of the canvas to 
 *     green. This acts as a visual indication to the player that they have 
 *     successfully completed the level.
 * - Display Winning Message:
 *   - textSize(50); sets the font size for the text to 50, making it large 
 *     and easily readable.
 *   - text('You Win, R TO RESTART', 300, 200); displays the message 
 *     "You Win, R TO RESTART" on the canvas. The coordinates (300, 200) 
 *     determine where the text is placed on the canvas. This message likely 
 *     serves two purposes: to inform the player of their victory and to 
 *     provide instructions on how to restart the level or game 
 *     (by pressing the 'R' key, as suggested by the message).
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function winLevel() 
{
	if (playerWin == true)
	{
		background('green');
		textSize(50);
		text('You Win, R TO RESTART', 300, 200);
	} 
} 

/******************************************************************************
 * Method: resetLevel: 
 * 
 * - Reset Player Hit Points:
 *   - player.hitPoints = 10; sets the hitPoints property of the player 
 *     object to 10. This line is likely used to reset the player's health or 
 *     a similar attribute to a predefined value at the start of a level 
 *     or after the player respawns.
 * - Decrease Background Color Value:
 *   - backgroundColor -= 10; decreases the backgroundColor variable by 
 *     10. This suggests that backgroundColor is used to dynamically change 
 *     the background color of the game. Each level reset slightly alters 
 *     this color, potentially to visually indicate a new attempt or a 
 *     change in the game state.
 * - Reposition the Exit:
 *   - The do...while loop is used to set a new position for the exit 
 *     (exit.x and exit.y). The exit is repositioned randomly within the 
 *     boundaries of the canvas, ensuring it doesn't spawn too close to 
 *     the player.
 *   - exit.x = random(exit.size, width - exit.size); and exit.y = 
 *     random(exit.size, height - exit.size); use the random function 
 *     to generate new x and y coordinates for the exit. The exit.size 
 *     is considered to ensure the exit stays fully visible within the 
 *     canvas bounds.
 *   - The condition dist(exit.x, exit.y, player.x, player.y) < 50 in the 
 *     while part of the loop ensures that the exit is not placed too 
 *     close to the player's current position (within a distance of 50 units). 
 *     If this condition is true, the loop repeats, generating a new 
 *     position for the exit until it's placed at an adequate distance 
 *     from the player.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function resetLevel() 
{
	player.hitPoints = 10;
	backgroundColor -= 10;

	do 
	{
		exit.x = random(exit.size, width - exit.size);
		exit.y = random(exit.size, height - exit.size);
	} while (dist(exit.x, exit.y, player.x, player.y) < 50);
}

/******************************************************************************
 * Method: keyPressed: 
 * 
 * - Initialize Temporary Variables:
 *   - var tempX = 0; and var tempY = 0; initialize two variables, tempX 
 *     and tempY, which are used to store the direction of movement for 
 *     the player.
 * - Detect Arrow Key Presses:
 *   - The function checks which arrow key is pressed using multiple 
 *     if...else if statements, each corresponding to one of the four 
 *     directional arrow keys (Up, Down, Right, Left).
 *   - When the UP_ARROW key is pressed, tempY is set to -1 and tempX to 0, 
 *     indicating upward movement.
 *   - When the DOWN_ARROW key is pressed, tempY is set to 1 and tempX to 0, 
 *     indicating downward movement.
 *   - When the RIGHT_ARROW key is pressed, tempX is set to 1 and tempY to 0, 
 *     indicating rightward movement.
 *   - When the LEFT_ARROW key is pressed, tempX is set to -1 and tempY to 0, 
 *     indicating leftward movement.
 * - Update Player Direction:
 *   - player.dir(tempX, tempY); calls the dir method of the player 
 *     object (which should be an instance of a class or an object with this 
 *     method defined) and passes the values of tempX and tempY to it.
 *   - This method is expected to update the player's direction based on 
 *     the input. For example, if tempX is 1 and tempY is 0, the player 
 *     will move to the right.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function keyPressed() 
{
    var tempX = 0;
    var tempY = 0;

    // controls for the player
    if (keyCode === UP_ARROW) 
	{
        tempY = -1;
        tempX = 0;
    } 
	else if (keyCode === DOWN_ARROW) 
	{
        tempY = 1;
        tempX = 0;
    } 
	else if (keyCode === RIGHT_ARROW) 
	{
        tempX = 1;
        tempY = 0;
    } 
	else if (keyCode === LEFT_ARROW) 
	{
        tempX = -1;
        tempY = 0;
    }
    player.dir(tempX, tempY);
}

/******************************************************************************
 * Class: Player: 
 * 
 * - Constructor:
 *   - Initializes a new instance of the Player class.
 *   - Sets this.isLive to true, likely indicating whether the player is 
 *     active or alive in the game.
 *   - Initializes the player's position with this.x and this.y.
 *   - Sets this.xspeed and this.yspeed to control the player's movement 
 *     speed in the x and y directions, respectively.
 * - dir Method:
 *   - Updates the player's direction based on the provided x and y values. 
 *     This affects how the player will move when update is called.
 * - update Method:
 *   - Checks whether the player is within any walls 
 *     (defined in the walls array). If the player's coordinates overlap with 
 *     any wall, insideWalls is set to true.
 *   - If the player is not inside walls, updates the player's position 
 *     based on the current speed (xspeed and yspeed) and scale factor (scl).
 *   - Uses constrain to keep the player within the bounds of the game area 
 *     (from 0 to width - scl for x, and 0 to height - scl for y).
 *   - If the player is inside a wall, reverses the direction and moves the 
 *     player accordingly.
 * - show Method:
 *   - Sets the fill color and draws the player at the current position as 
 *     a rectangle of size 20x20.
 *
 * Input: None.
 *
 * Output: Player.
 *
******************************************************************************/
class Player 
{
	/******************************************************************************
	 * Method: constructor: 
	 * 
	 * - Initializes a new instance of the Player class.
	 *
	 * Input: None.
	 *
	 * Output: None.
	 *
	******************************************************************************/
	constructor() 
	{
		this.isLive = true;
		this.x = 200;
		this.y = 50;
		this.xspeed = 2;
		this.yspeed = 0;
	}
  
	/******************************************************************************
	 * Method: dir: 
	 * 
	 * - Updates the player's direction based on the provided x and y values.
	 *
	 * Input: x, y.
	 *
	 * Output: None.
	 *
	******************************************************************************/
	dir(x, y) 
	{
		this.xspeed = x;
		this.yspeed = y;
	}

	/******************************************************************************
	 * Method: update: 
	 * 
	 * - Initialize Collision Flag:
	 *   - let insideWalls = false; initializes a flag to track whether the 
	 *     player is inside any wall.
	 * - Collision Detection with Walls:
	 *   - The method iterates over the walls array using a for loop.
	 *   - Each wall in the walls array is checked to see if the player's 
	 *     current position (this.x, this.y) is within the bounds of that wall. 
	 *     The wall's position and dimensions are represented by wall[0] 
	 *     (x-position), wall[1] (y-position), wall[2] (width), and wall[3] 
	 *     (height).
	 *   - If the player is found to be inside any wall, insideWalls is set to 
	 *     true.
	 * - Update Player Position:
	 *   - If insideWalls is false (player is not inside a wall), the player's 
	 *     position is updated based on their speed (this.xspeed and this.yspeed) 
	 *     and a scale factor (scl). This effectively moves the player in the 
	 *     direction of their speed.
	 *   - this.x and this.y are then constrained using the constrain function 
	 *     to ensure the player remains within the game area's bounds 
	 *     (from 0 to width - scl for x, and 0 to height - scl for y).
	 * - Handle Collision Response:
	 *   - If the player is inside a wall (insideWalls is true), the player's 
	 *     speed in both x and y directions is reversed (this.xspeed *= -1; 
	 *     and this.yspeed *= -1;). This can act as a simple collision response, 
	 *     making the player "bounce" off the wall.
	 *   - The player's position is then updated with the new speed, moving 
	 *     them away from the wall.
	 *
	 * Input: None.
	 *
	 * Output: None.
	 *
	******************************************************************************/
	update() 
    {
		let insideWalls = false;

		for (let i = 0; i < walls.length; i++) 
		{
			let wall = walls[i];

			if (this.x > wall[0] &&
				this.x < (wall[0] + wall[2]) &&
				this.y > wall[1] &&
				this.y < (wall[1] + wall[3])) 
			{
				insideWalls = true;
			}
		}

		if (!insideWalls) 
		{
			this.x += this.xspeed * scl;
			this.y += this.yspeed * scl;

			this.x = constrain(this.x, 0, width - scl);
			this.y = constrain(this.y, 0, height - scl);
		} 
		else 
		{
			this.xspeed *= -1;
			this.yspeed *= -1;
			this.x += this.xspeed * scl;
			this.y += this.yspeed * scl;
		}
	}

	/******************************************************************************
	 * Method: show: 
	 * 
	 * - Sets the fill color and draws the player at the current position as 
	 * a rectangle of size 20x20.
	 *
	 * Input: None.
	 *
	 * Output: None.
	 *
	******************************************************************************/
	show() 
	{
		fill(124, 125, 58);
		rect(this.x, this.y, 20, 20);
	}
}  

/******************************************************************************
 * Method: detect: 
 * 
 * - Iterates through the enemies array. For each enemy, it checks if the 
 * distance between the player and the enemy is less than 30 units 
 * (using the dist function).
 * - If the player is too close to any enemy, it sets player.isLive to false, 
 * indicating that the player has been "caught" or "defeated" by an enemy.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function detect() 
{
	for (var i = 0; i < numberOfEnemies; i++) 
	{
		var enemy = enemies[i];
		if (dist(player.x, player.y, enemy.x, enemy.y) < 30) 
		{
			player.isLive = false;
		}
	}
}