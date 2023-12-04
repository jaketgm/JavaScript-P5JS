/******************************************************************************
 * @author Jake Brockbank
 * Dec 4th, 2023 (Re-vitalized)
 * This program is a glitch art generator. It takes an image and applies
 * various effects to it to create a glitchy effect.
******************************************************************************/

const WINDOW_WIDTH = 250;
const WINDOW_HEIGHT = 250;
const IMG_SRC = 'Logo.png';
let isLoaded = false;
let glitch;

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
	loadImage(IMG_SRC, (img) => {
		glitch = new Glitch(img);
		isLoaded = true;
	});
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
	clear();
	background(0);

	if (isLoaded) 
	{
		glitch.show();
	}

	displayFrameRate();
}

/******************************************************************************
 * Method: displayFrameRate: 
 * 
 * - This method displays the current frame rate to the canvas.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
function displayFrameRate() 
{
	fill(255);
	textSize(14);
	text(`FPS: ${floor(frameRate())}`, 20, 30);
}

/******************************************************************************
 * Class: Glitch: 
 * 
 * - Constructor (constructor(img)): 
 *   - Initializes the class with an image (img).
 *   - Loads the pixels of the image for processing.
 *   - Sets the channel length (presumably for RGBA channels).
 *   - Copies the original pixel data of the image.
 *   - Calls initializeEffects() to set up various glitch effects.
 * - Initializing Effects (initializeEffects()):
 *   - Creates a flow line effect object with specific parameters.
 *   - Initializes an array for shift line images.
 *   - Initializes a shift RGB effect (set to null initially).
 *   - Initializes an array for scatter images (random image fragments).
 *   - Sets a flag (throughFlag) used to control the application of effects.
 * - Creating Effect Object (createEffectObject(...)):
 *   - Returns an object with properties defining a glitch effect (like flow line), 
 *     including parameters like speed and random values.
 * - Replacing Image Data (replaceData(destImg, srcPixels)):
 *   - Replaces the pixel data of destImg with srcPixels.
 *   - Iterates over each pixel and updates the RGBA values.
 * - Flow Line Effect (flowLine(obj)):
 *   - Creates a horizontal line effect that alters the pixels along its path 
 *     in the image.
 * - Shift Line Effect (shiftLine()):
 *   - Shifts a horizontal section of the image by a random offset, creating 
 *     a shifted or smeared effect.
 * - Apply Shift RGB Effect (applyShiftRGB()):
 *   - Randomly shifts the RGB values of the image pixels, creating a color 
 *     distortion effect.
 * - Get Random Rectangular Image Fragment (getRandomRectImg()):
 *   - Extracts a random rectangular section from the image.
 * - Display Functions:
 *   - show(): Coordinates the application of the glitch effects.
 *   - restoreOriginal(): Restores the image to its original state.
 *   - checkThroughFlag(): Controls whether the effects should be applied or 
 *     not, based on a random chance.
 *   - displayOriginal(), displayModified(): Helper methods to display the image.
 *   - translateAndDisplay(): Positions and displays the image on the canvas.
 *   - Applying Effects (applyEffects()):
 * - Applies the various glitch effects 
 * (flow line, shift line, shift RGB, scatter images) to the image based on 
 * certain conditions.
 *
 * Input: None.
 *
 * Output: Glitch effect.
 *
******************************************************************************/
class Glitch 
{
	/******************************************************************************
	 * Method: constructor: 
	 * 
	 * - Initializes the class with an image (img).
	 *
	 * Input: None.
	 *
	 * Output: None.
	 *
	******************************************************************************/
	constructor(img) 
	{
		this.imgOrigin = img;
		this.imgOrigin.loadPixels();
		this.channelLen = 4;
		this.copyData = new Uint8ClampedArray(this.imgOrigin.pixels);
		this.initializeEffects();
	}

	/******************************************************************************
	 * Method: initializeEffects: 
	 * 
	 * - Sets up various glitch effects.
	 *
	 * Input: None.
	 *
	 * Output: None.
	 *
	******************************************************************************/
	initializeEffects() 
	{
		this.flowLineImg = this.createEffectObject(1000, 4, 24, 24, 80);
		this.shiftLineImgs = Array(6).fill(null);
		this.shiftRGB = null;
		this.scatImgs = Array(3).fill().map(() => ({ img: null, x: 0, y: 0 }));
		this.throughFlag = true;
	}

	/******************************************************************************
	 * Method: createEffectObject: 
	 * 
	 * - Returns an object with properties defining a glitch effect 
	 * (like flow line), including parameters like speed and random values.
	 *
	 * Input: maxT1, minSpeed, maxSpeed, minX, maxX.
	 *
	 * Output: Effect object.
	 *
	******************************************************************************/
	createEffectObject(maxT1, minSpeed, maxSpeed, minX, maxX) 
	{
		return {
			pixels: null,
			t1: floor(random(maxT1)),
			speed: floor(random(minSpeed, maxSpeed)),
			randX: floor(random(minX, maxX))
		};
	}

	/******************************************************************************
	 * Method: replaceData: 
	 * 
	 * - Replaces the pixel data of destImg with srcPixels.
	 *
	 * Input: destImg, srcPixels.
	 *
	 * Output: None.
	 *
	******************************************************************************/
	replaceData(destImg, srcPixels) 
	{
		const totalPixels = destImg.width * destImg.height;
		for (let i = 0; i < totalPixels; i++) 
		{
			const baseIndex = i * this.channelLen;
			for (let offset = 0; offset < this.channelLen; offset++) 
			{
				destImg.pixels[baseIndex + offset] = srcPixels[baseIndex + offset];
			}
		}
		destImg.updatePixels();
	}

	/******************************************************************************
	 * Method: flowLine: 
	 * 
	 * - Creates a horizontal line effect that alters the pixels along its path
	 * in the image.
	 *
	 * Input: obj.
	 *
	 * Output: Modified pixels.
	 *
	******************************************************************************/
	flowLine(obj) 
	{
		let destPixels = new Uint8ClampedArray(this.imgOrigin.pixels);
		obj.t1 %= this.imgOrigin.height;
		obj.t1 += obj.speed;
		let tempY = floor(obj.t1);

		for (let y = 0; y < this.imgOrigin.height; y++) 
		{
			if (tempY === y) 
			{
				for (let x = 0; x < this.imgOrigin.width; x++) 
				{
					let index = (y * this.imgOrigin.width + x) * this.channelLen;
					for (let offset = 0; offset < this.channelLen; offset++) 
					{
						destPixels[index + offset] = this.imgOrigin.pixels[index + offset] + (offset < 3 ? obj.randX : 0);
					}
				}
			}
		}
		return destPixels;
	}

	/******************************************************************************
	 * Method: shiftLine: 
	 * 
	 * - Shifts a horizontal section of the image by a random offset, creating
	 * a shifted or smeared effect.
	 *
	 * Input: None.
	 *
	 * Output: Modified pixels.
	 *
	******************************************************************************/
	shiftLine() 
	{
		let destPixels = new Uint8ClampedArray(this.imgOrigin.pixels);
		let rangeH = this.imgOrigin.height;
		let rangeMin = floor(random(rangeH));
		let rangeMax = rangeMin + floor(random(1, rangeH - rangeMin));
		let offsetX = this.channelLen * floor(random(-40, 40));

		for (let y = 0; y < rangeH; y++) 
		{
			if (y > rangeMin && y < rangeMax) 
			{
				for (let x = 0; x < this.imgOrigin.width; x++) 
				{
					let index = (y * this.imgOrigin.width + x) * this.channelLen;
					let newIndex = index + offsetX;

					for (let offset = 0; offset < this.channelLen; offset++) 
					{
						let currentPixel = index + offset;
						let shiftedPixel = (newIndex + offset) % this.imgOrigin.pixels.length;
						destPixels[currentPixel] = this.imgOrigin.pixels[shiftedPixel];
					}
				}
			}
		}
		return destPixels;
	}

	/******************************************************************************
	 * Method: applyShiftRGB: 
	 * 
	 * - Randomly shifts the RGB values of the image pixels, creating a color
	 * distortion effect.
	 *
	 * Input: None.
	 *
	 * Output: Modified pixels.
	 *
	******************************************************************************/
	applyShiftRGB() 
	{
		let destPixels = new Uint8ClampedArray(this.imgOrigin.pixels);
		let randOffsets = [
			(floor(random(-16, 16)) * this.imgOrigin.width + floor(random(-16, 16))) * this.channelLen,
			(floor(random(-16, 16)) * this.imgOrigin.width + floor(random(-16, 16))) * this.channelLen,
			(floor(random(-16, 16)) * this.imgOrigin.width + floor(random(-16, 16))) * this.channelLen
		];

		for (let y = 0; y < this.imgOrigin.height; y++) 
		{
			for (let x = 0; x < this.imgOrigin.width; x++) 
			{
				let index = (y * this.imgOrigin.width + x) * this.channelLen;
				for (let offset = 0; offset < this.channelLen; offset++) 
				{
					let currentPixel = index + offset;
					let shiftedPixel = (currentPixel + randOffsets[offset % 3]) % this.imgOrigin.pixels.length;
					destPixels[currentPixel] = this.imgOrigin.pixels[shiftedPixel];
				}
			}
		}
		return destPixels;
	}

	/******************************************************************************
	 * Method: getRandomRectImg: 
	 * 
	 * - Extracts a random rectangular section from the image.
	 *
	 * Input: None.
	 *
	 * Output: Image fragment.
	 *
	******************************************************************************/
	getRandomRectImg() 
	{
		let startX = floor(random(this.imgOrigin.width - 30));
		let startY = floor(random(this.imgOrigin.height - 50));
		let rectW = floor(random(30, this.imgOrigin.width - startX));
		let rectH = floor(random(1, 50));
		let destImg = this.imgOrigin.get(startX, startY, rectW, rectH);
		destImg.loadPixels();
		return destImg;
	}

	/******************************************************************************
	 * Method: show: 
	 * 
	 * - Coordinates the application of the glitch effects.
	 *
	 * Input: None.
	 *
	 * Output: None.
	 *
	******************************************************************************/
	show() 
	{
		this.restoreOriginal();
		if (this.checkThroughFlag()) 
		{
			this.displayOriginal();
			return;
		}
		this.applyEffects();
		this.displayModified();
	}

	/******************************************************************************
	 * Method: restoreOriginal: 
	 * 
	 * - Restores the image to its original state.
	 *
	 * Input: None.
	 *
	 * Output: None.
	 *
	******************************************************************************/
	restoreOriginal() 
	{
		this.replaceData(this.imgOrigin, this.copyData);
	}

	/******************************************************************************
	 * Method: checkThroughFlag: 
	 * 
	 * - Controls whether the effects should be applied or not, based on a random
	 * chance.
	 *
	 * Input: None.
	 *
	 * Output: None.
	 *
	******************************************************************************/
	checkThroughFlag() 
	{
		const n = floor(random(100));
		if (n > 75 && this.throughFlag) 
		{
			this.throughFlag = false;
			setTimeout(() => { this.throughFlag = true; }, floor(random(40, 400)));
		}
		return !this.throughFlag;
	}

	/******************************************************************************
	 * Method: displayOriginal: 
	 * 
	 * - Helper method to display the image.
	 *
	 * Input: None.
	 *
	 * Output: None.
	 *
	******************************************************************************/
	displayOriginal() 
	{
		push();
		this.translateAndDisplay();
		pop();
	}

	/******************************************************************************
	 * Method: applyEffects: 
	 * 
	 * - Applies the various glitch effects.
	 *
	 * Input: None.
	 *
	 * Output: None.
	 *
	******************************************************************************/
	applyEffects() 
	{
		this.flowLineImg.pixels = this.flowLine(this.flowLineImg);
		this.replaceData(this.imgOrigin, this.flowLineImg.pixels);

		this.shiftLineImgs.forEach((_, i, arr) => {
			if (floor(random(100)) > 50) 
			{
				arr[i] = this.shiftLine();
				this.replaceData(this.imgOrigin, arr[i]);
			} 
			else if (arr[i]) 
			{
				this.replaceData(this.imgOrigin, arr[i]);
			}
		});

		if (floor(random(100)) > 65) 
		{
			this.shiftRGB = this.applyShiftRGB();
			this.replaceData(this.imgOrigin, this.shiftRGB);
		}

		this.scatImgs.forEach(obj => {
			if (floor(random(100)) > 80) 
			{
				obj.x = floor(random(-this.imgOrigin.width * 0.3, this.imgOrigin.width * 0.7));
				obj.y = floor(random(-this.imgOrigin.height * 0.1, this.imgOrigin.height));
				obj.img = this.getRandomRectImg();
			}
			if (obj.img) 
			{
				push();
				this.translateAndDisplay();
				image(obj.img, obj.x, obj.y);
				pop();
			}
		});
	}

	/******************************************************************************
	 * Method: displayModified: 
	 * 
	 * - Helper method to display the image.
	 *
	 * Input: None.
	 *
	 * Output: None.
	 *
	******************************************************************************/
	displayModified() 
	{
		push();
		this.translateAndDisplay();
		pop();
	}

	/******************************************************************************
	 * Method: translateAndDisplay: 
	 * 
	 * - Positions and displays the image on the canvas.
	 *
	 * Input: None.
	 *
	 * Output: None.
	 *
	******************************************************************************/
	translateAndDisplay() 
	{
		translate((width - this.imgOrigin.width) / 2, (height - this.imgOrigin.height) / 2);
		image(this.imgOrigin, 0, 0);
	}
}