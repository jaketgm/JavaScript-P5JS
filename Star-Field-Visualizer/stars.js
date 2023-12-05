/******************************************************************************
 * Method: Star: 
 * 
 * - Constructor and Initialization:
 *   - this.x, this.y, this.z: These lines set the initial position of the 
 *     star. x and y are randomized across the canvas, and z represents the 
 *     depth or distance of the star, also randomized.
 * - this.pz: Stores the previous z value, which can be used for calculating 
 *   motion or trails.
 * - Color and size properties are initialized:
 *   - this.red, this.green, this.blue: Random initial colors for the star.
 *   - this.size: A random size factor for the star, between 0.8 and 1.2.
 * - move Method:
 *   - Adjusts the z position of the star, creating the effect of the star 
 *     moving towards the viewer.
 *   - When a star gets too close (z < 1), it resets to a new position 
 *     at the farthest depth.
 *   - Updates the star's color in a pulsating pattern using the sine 
 *     function, creating a dynamic color change effect.
 *   - The color components (red, green, blue) are set to fluctuate 
 *     independently, creating a variety of colors.
 *   - Updates the star's size to fluctuate slightly, simulating a 
 *     twinkling effect.
 * - display Method:
 *   - Calculates the star's screen position (sx, sy) based on its 3D 
 *     position (x, y, z). This is done using the map function, which 
 *     translates the 3D position into 2D coordinates.
 *   - Sets the size of the star (r) based on its z position and the 
 *     fluctuating size factor, making distant stars appear smaller.
 *   - Draws the star on the canvas using the point function with the 
 *     calculated screen position and color. The stroke function is 
 *     used to set the color, and strokeWeight determines the size 
 *     of the point.
 * - edges Method:
 *   - Handes behavior when stars reach the edges of 
 *     the canvas, such as wrapping them around to the opposite edge.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function Star() 
{
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.pz = this.z;

    // New properties for color and size fluctuation
    this.red = random(100, 255);
    this.green = random(100, 255);
    this.blue = random(100, 255);
    this.size = random(0.8, 1.2);

    this.move = function() 
    {
        this.z -= speed;
        if (this.z < 1) 
        {
            this.z = width;
            this.x = random(-width, width);
            this.y = random(-height, height);
            this.pz = this.z;
        }

        // Update color for pulsation
        this.red = 255 * (0.5 + sin(frameCount * 0.02) * 0.5);
        this.green = 255 * (0.5 + sin(frameCount * 0.02 + PI/3) * 0.5);
        this.blue = 255 * (0.5 + sin(frameCount * 0.02 + 2*PI/3) * 0.5);

        // Update size for fluctuation
        this.size = 1 + sin(frameCount * 0.1) * 0.2;
    }

    this.edges = function() 
    {
        if (this.sx > width) 
        {
            this.sx = 0;
        } 
        else if (this.sx < 0) 
        {
            this.sx = width;
        }

        if (this.sy > height) 
        {
            this.sy = 0;
        } 
        else if (this.sy < 0) 
        {
            this.sy = height;
        }
    }

    this.display = function() 
    {
        this.sx = map(this.x / this.z, 0, 1, 0, width);
        this.sy = map(this.y / this.z, 0, 1, 0, height);
        this.r = map(this.z, 0, width, 15, 0) * this.size;

        stroke(this.red, this.green, this.blue);
        strokeWeight(this.r);
        point(this.sx, this.sy);
    }
}