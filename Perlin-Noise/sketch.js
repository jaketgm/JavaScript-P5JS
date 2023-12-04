/******************************************************************************
 * @author Jake Brockbank
 * Dec 4th, 2023
 * This program creates a flow feild and uses it to create a particle system
 * that follows the flow feild.
******************************************************************************/

var inc = 0.1;
var scl = 10;
var cols, rows;
var zoff = 0;
var fr;
var particles = [];
var flowfeild;

/******************************************************************************
 * Method: setup: 
 * 
 * - Sets up the canvas and creates the flow feild.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function setup() 
{
	createCanvas(windowWidth, windowHeight);
	cols = floor(width / scl);
	rows = floor(height / scl);
	fr = createP('');

	// Pre-sets size of array
	flowfeild = new Array(cols * rows);

	for (var i = 0; i < 500; i++) 
	{
		particles[i] = new Particle();
	}
	background(255);
}

/******************************************************************************
 * Method: draw: 
 * 
 * - yoff and xoff are offset values for Perlin noise, which is used to 
 * generate smooth, natural-looking randomness. These offsets change for 
 * each cell in a grid defined by rows and cols.
 * - The loop through y and x generates a grid of vectors (flowfield) that 
 * point in different directions. These directions are determined by Perlin 
 * noise, which creates the appearance of a flowing field.
 * - The noise function generates Perlin noise values for each point in the 
 * grid. Multiplying the noise value by TWO_PI * 4 converts it into a valid 
 * angle for a 2D vector in radians, which allows the angles to cover a full 
 * circle and then some, creating a more varied flow field.
 * - p5.Vector.fromAngle(angle) creates a vector pointing in the direction 
 * of the calculated angle.
 * - v.setMag(1) sets the magnitude (length) of the vector to 1, 
 * standardizing the strength of the flow across the grid.
 * - The vector is then stored in flowfield[index], which is an array
 * representing the flow field.
 * - xoff += inc and yoff += inc increment the x and y offsets by a small 
 * amount (inc), which changes the noise value slightly for each cell, 
 * giving the flow field smooth variations.
 * - zoff += 0.0003 is likely used to animate the flow field over time, 
 * slowly changing the z-offset in the noise function to make the vectors 
 * change direction as the program runs.
 * - The second loop iterates through an array of particles. Each particle:
 *   - Follows the nearest vector in the flow field with particles[i].
 *     follow(flowfield).
 *   - Updates its position with particles[i].update().
 *   - Handles edge wrapping or bouncing with particles[i].edges().
 *   - Draws itself on the canvas with particles[i].show().
 * - fr.html(floor(frameRate())) is likely updating an HTML element with 
 * the ID fr to display the current frame rate of the sketch, which is 
 * calculated by floor(frameRate()).
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function draw() 
{
	var yoff = 0;
	for (var y = 0; y < rows; y++) 
	{
		var xoff = 0;
		for (var x = 0; x < cols; x++) 
		{
			var index = x + y * cols;
			var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
			var v = p5.Vector.fromAngle(angle);
			// Sets magnitude
			v.setMag(1);
			// Contains all vectors
			flowfeild[index] = v;
			xoff += inc;
			stroke(0, 50);
		}
		yoff += inc;

		zoff += 0.0003;
	}
	for (var i = 0; i < particles.length; i++) 
	{
		particles[i].follow(flowfeild);
		particles[i].update();
		particles[i].edges();
		particles[i].show();
	}
	fr.html(floor(frameRate()));
}