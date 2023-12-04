/******************************************************************************
 * Method: Particle: 
 * 
 * - Creates a particle object.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function Particle() 
{
	this.pos = createVector(random(width), random(height));
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);
	// Slows down particles
	this.maxspeed = 2;

	this.prevPos = this.pos.copy();

	this.update = function() 
	{
		this.vel.add(this.acc);
		this.vel.limit(this.maxspeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	this.applyForce = function(force) 
	{
		this.acc.add(force);
	}

	/* Based on the particles x and y position scale the particle to a grid of columns and rows, and then look up the corresponding vector in the one dimensional array, and then finally take that vector and apply it as a force */
	this.follow = function(vectors) 
	{
		var x = floor(this.pos.x / scl);
		var y = floor(this.pos.y / scl);
		// Take two dimensional value into one dimensional array
		var index = x + y * cols;
		var force = vectors[index];
		this.applyForce(force);
	}

	// Draws particle
	this.show = function() 
	{
		stroke(5, 30);
		strokeWeight(1);
		line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
		// After drawn previous position becomes the current position
		this.updatePrev();
	}

	this.updatePrev = function() 
	{
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
	}

	this.edges = function() 
	{
		if (this.pos.x > width) 
		{
			this.pos.x = 0;
			this.updatePrev();
		}
		if (this.pos.x < 0) 
		{
			this.pos.x = width;
			this.updatePrev();
		}
		if (this.pos.y > height) 
		{
			this.pos.y = 0;
			this.updatePrev();
		}
		if (this.pos.y < 0) 
		{
			this.pos.y = height;
			this.updatePrev();
		}
	}
}