/******************************************************************************
 * @author Jake Brockbank
 * Dec 4th, 2023
 * This program is a simple game where the player must shoot enemies to gain
 * points and advance to the next round. The player can also pick up powerups
 * to restore health and ammo, and activate a shield for a short time.
******************************************************************************/

const playerHealthMax = 100;
const enemyDamage = 10;
const shieldDuration = 100; // frames for shield duration
const bulletSpeed = 50;

const mREADY = 1;
const mSET = 2;
const mGO = 3;
const mGAME = 4;
const mGAMEOVER = 5;
const mYOUWIN = 6;

// Game state variables
var score = 0;
var gameRound = 1;
var health = playerHealthMax;
var ammo = 10;
var shieldActive = false;
var shieldCounter = 0;
var usedGreenPowerup = false;
var usedBluePowerup = false;
var enemies = []; // To handle multiple enemies
var particles = []; // Particles for bullets
var mode = mGAME;

// Player and power-up configuration
var player = { x: 0, y: 0, w: 20, h: 20 };
var greenPowerup = { x: 300, y: 300, w: 10, h: 10, active: true };
var bluePowerup = { x: 300, y: 100, w: 10, h: 10, active: true };

/******************************************************************************
 * Method: setup: 
 * 
 * - Called once at the start of the program.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function setup() 
{
    createCanvas(windowWidth, windowHeight);
    console.log("Spawning enemies for round:", gameRound);
    spawnEnemies(gameRound); 
    console.log("Enemies after spawn:", enemies);
}

/******************************************************************************
 * Method: draw: 
 * 
 * - Called once per frame.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function draw() 
{
    background(0);
    handlePlayerMovement();
    handlePowerups();
    handleEnemies();
    handleBullets();
    displayUI();

    // Check if all enemies are dead
    if (enemies.length === 0) 
	{
        // Increase ammo by 10 at the start of each new round
        ammo += 10;
        // Reset powerups for the new round
        resetPowerups();
        // Advance to the next round
        gameRound++;
        spawnEnemies(gameRound); // Spawn more enemies for the new round
    }

    switch (mode) 
	{
		// Could be implemented for future iterations
    }
}

/******************************************************************************
 * Method: spawnEnemies: 
 * 
 * - Spawns a number of enemies and adds them to the enemies array.
 *
 * Input: number.
 *
 * Output: None.
 *
******************************************************************************/
function spawnEnemies(number) 
{
    console.log("Spawning", number, "enemies");
    enemies = []; 
    for (let i = 0; i < number; i++) 
	{
        let newEnemy = createEnemy();
        console.log("New enemy created:", newEnemy); // Check the properties of the new enemy
        enemies.push(newEnemy);
    }
    console.log("Enemies after spawning:", enemies); // Check the array after spawning
}

/******************************************************************************
 * Method: createEnemy: 
 * 
 * - Creates a new enemy object with random properties.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function createEnemy() 
{
    let enemy = {
        x: random(20, width - 20), // Ensure the enemy is within the canvas
        y: random(20, height - 20),
        w: 20,
        h: 20,
        xSpeed: random(-3, 3),
        ySpeed: random(-3, 3)
    };
    console.log("Created enemy:", enemy);
    return enemy;
}

/******************************************************************************
 * Method: handlePlayerMovement: 
 * 
 * - Handles player movement and shield activation.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function handlePlayerMovement() 
{
    player.x = mouseX - player.w / 2;
    player.y = mouseY - player.h / 2;
    fill(255);
    rect(player.x, player.y, player.w, player.h);
    // Shield activation
    if (shieldActive) 
	{
        fill(117, 222, 255, 150);
        rect(player.x, player.y, player.w, player.h);
        shieldCounter++;
        if (shieldCounter > shieldDuration) 
		{
            shieldActive = false;
            shieldCounter = 0;
        }
    }
}

/******************************************************************************
 * Method: handlePowerups: 
 * 
 * - Handles powerup spawning and activation.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function handlePowerups() 
{
    if (greenPowerup.active) 
	{
        fill(0, 255, 0);
        rect(greenPowerup.x, greenPowerup.y, greenPowerup.w, greenPowerup.h);
        if (rectRect(player.x, player.y, player.w, player.h, greenPowerup.x, greenPowerup.y, greenPowerup.w, greenPowerup.h)) 
		{
            if (!usedGreenPowerup) 
			{
                health = playerHealthMax;
                greenPowerup.active = false;
                usedGreenPowerup = true;
            }
        }
    }

    if (bluePowerup.active)
	{
        fill(117, 222, 255);
        rect(bluePowerup.x, bluePowerup.y, bluePowerup.w, bluePowerup.h);
        if (rectRect(player.x, player.y, player.w, player.h, bluePowerup.x, bluePowerup.y, bluePowerup.w, bluePowerup.h)) 
		{
            if (!usedBluePowerup) 
			{
                // Shield activation
                shieldActive = true;
                // Refill ammo to the maximum
                ammo = playerHealthMax;
                bluePowerup.active = false;
                usedBluePowerup = true;
            }
        }
    }
}

/******************************************************************************
 * Method: handleEnemies: 
 * 
 * - Handles enemy spawning, movement, and collision.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function handleEnemies() 
{
    console.log("Handling enemies, count:", enemies.length);

    for (let i = enemies.length - 1; i >= 0; i--) 
	{
        let enemy = enemies[i];
        console.log("Enemy position before update:", enemy.x, enemy.y);

        fill(232, 37, 23);
        rect(enemy.x, enemy.y, enemy.w, enemy.h); // Draw the enemy

        // Update enemy position
        enemy.x += enemy.xSpeed;
        enemy.y += enemy.ySpeed;
        console.log("Enemy position after update:", enemy.x, enemy.y); // Log each enemy's position after updating

        // Check for wall collisions
        if (enemy.x > width - enemy.w || enemy.x < 0) 
		{
            enemy.xSpeed *= -1;
        }
        if (enemy.y > height - enemy.h || enemy.y < 0) 
		{
            enemy.ySpeed *= -1;
        }

        // Check for collision with the player
        if (rectRect(player.x, player.y, player.w, player.h, enemy.x, enemy.y, enemy.w, enemy.h)) 
		{
            if (!shieldActive) 
			{
                health -= enemyDamage;
                // Check if health drops to zero or below
                if (health <= 0) {
                    // Set mode to GAMEOVER
                    mode = mGAMEOVER;
                    // Display the game over message and prompt for restart
                    console.log("Game Over! Press 'R' to restart.");
                    noLoop(); // Stop the draw loop to halt game progress
                }
            }
            console.log("Enemy collided with player, removing enemy");
            enemies.splice(i, 1); // Remove enemy on collision
        }
    }
}

/******************************************************************************
 * Method: handleBullets: 
 * 
 * - Handles bullet spawning, movement, and collision
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function handleBullets() 
{
    for (let i = particles.length - 1; i >= 0; i--) 
	{
        let part = particles[i];
        fill(255);
        rect(part.x, part.y, 10, 10);
        part.x += part.xSpeed;
        part.y += part.ySpeed;

        // Remove bullets out of bounds
        if (part.x < 0 || part.x > width || part.y < 0 || part.y > height) 
		{
            particles.splice(i, 1);
            continue;
        }

        // Bullet hits enemy
        for (let j = enemies.length - 1; j >= 0; j--) 
		{
            let enemy = enemies[j];
            if (rectRect(part.x, part.y, 10, 10, enemy.x, enemy.y, enemy.w, enemy.h)) 
			{
                enemies.splice(j, 1); // Remove enemy
                particles.splice(i, 1); // Remove bullet
                score += 10;
                break;
            }
        }
    }
}

/******************************************************************************
 * Method: mousePressed: 
 * 
 * - Called when the mouse is pressed.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function mousePressed() 
{
    if (ammo > 0) 
	{
        particles.push({
            x: player.x + player.w / 2,
            y: player.y + player.h / 2,
            xSpeed: bulletSpeed,
            ySpeed: 0
        });
        ammo--;
    }
}

/******************************************************************************
 * Method: keyPressed: 
 * 
 * - Called when a key is pressed.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function keyPressed() 
{
    if (key === 'r' || key === 'R' && mode === mGAMEOVER) 
	{
        restartGameFromBeginning();
    }
}

/******************************************************************************
 * Method: restartGameFromBeginning: 
 * 
 * - Restarts the game from the beginning.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function restartGameFromBeginning() 
{
    mode = mGAME;
    score = 0;
    gameRound = 1;
    health = playerHealthMax;
    ammo = 10;
    shieldActive = false;
    shieldCounter = 0;
    usedGreenPowerup = false;
    usedBluePowerup = false;
    enemies = [];
    particles = [];
    spawnEnemies(gameRound);
    resetPowerups();
    loop(); // Restart the draw loop
}

/******************************************************************************
 * Method: resetPowerups: 
 * 
 * - Resets the powerups for the next round.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function resetPowerups() 
{
    greenPowerup.active = true;
    bluePowerup.active = true;
    usedGreenPowerup = false;
    usedBluePowerup = false;
}

/******************************************************************************
 * Method: displayUI: 
 * 
 * - Displays the UI elements.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function displayUI() 
{
    fill(255);
    textSize(20);
    text(`Score: ${score}`, 20, 30);
    text(`Round: ${gameRound}`, 20, 60);
    text(`Health: ${health}`, 20, 90);
    text(`Ammo: ${ammo}`, 20, 120);
}

/******************************************************************************
 * Method: rectRect: 
 * 
 * - Checks if two rectangles are colliding.
 *
 * Input: r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h.
 *
 * Output: boolean.
 *
******************************************************************************/
function rectRect(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) 
{
    return (r1x + r1w >= r2x && r1x <= r2x + r2w && r1y + r1h >= r2y && r1y <= r2y + r2h);
}
