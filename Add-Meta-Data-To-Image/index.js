/******************************************************************************
 * @author Jake Brockbank
 * Dec 5th, 2023 (Original)
 * This program adds metadata to an image using ExifTool.
******************************************************************************/

import exiftool from 'node-exiftool';
import exiftoolBin from 'dist-exiftool';
import { join } from 'path';
import { homedir } from 'os';
import { renameSync } from 'fs';

const exiftoolProcess = new exiftool.ExiftoolProcess(exiftoolBin);

const inputImagePath = join(homedir(), 'Desktop', 'IMG.JPG');
const desktopPath = join(homedir(), 'Desktop');
const outputFileName = 'OUT.JPG';
const outputImagePath = join(desktopPath, outputFileName);

const assetIdentifier = 'FluidSimOne';

/******************************************************************************
 * Method: addMetadata: 
 * 
 * - Opening the ExifTool Process:
 *   - await exiftoolProcess.open(); - This line initiates the ExifTool 
 *     process, which is necessary before any metadata operations can be 
 *     performed on image files. The await keyword is used to pause the 
 *     execution of the function until the open method's promise resolves, 
 *     meaning the ExifTool process has successfully started.
 * - Writing Metadata to an Image:
 *   - await exiftoolProcess.writeMetadata(inputImagePath, 
 *     {'MakerNotes:17': assetIdentifier}); - This line writes metadata to 
 *     the image file located at inputImagePath. Specifically, it sets the 
 *     value of the 'MakerNotes:17' metadata field to assetIdentifier. The 
 *     await keyword is used here as well to wait for the completion of the 
 *     metadata writing process.
 * - Logging Success Message:
 *   - console.log('Metadata added successfully.'); - If the metadata is written 
 *     successfully, this message is displayed in the console.
 * - Closing the ExifTool Process:
 *   - await exiftoolProcess.close(); - After the metadata operation, this 
 *     line closes the ExifTool process. It's important to close it to free 
 *     up system resources and to ensure that the process does not continue 
 *     running indefinitely.
 * - Renaming the Image File:
 *   - renameSync(inputImagePath, outputImagePath); - This line synchronously 
 *     renames (or moves) the image file from inputImagePath to outputImagePath. 
 * - Logging the Output File Location:
 *   - console.log(\Output image saved as ${outputImagePath}`);` - If the file 
 *     has been successfully renamed, this message is logged to the console, 
 *     indicating where the processed file is saved.
 * - Error Handling:
 *   - The entire block of code is wrapped in a try...catch statement, which 
 *     means if any error occurs during the process of opening ExifTool, writing 
 *     metadata, or renaming the file, the error will be caught and handled in 
 *     the catch block.
 *   - console.error('Error adding metadata:', err); - If an error occurs, this 
 *     line will log the error message to the console.
 *
 * Input: None.
 *
 * Output: None.
 *
******************************************************************************/
async function addMetadata() 
{
	try 
	{
		await exiftoolProcess.open();

		// Set the metadata using ExifTool
		await exiftoolProcess.writeMetadata(inputImagePath, {
			'MakerNotes:17': assetIdentifier,
		});

		console.log('Metadata added successfully.');

		// Close the ExifTool process
		await exiftoolProcess.close();

		// Rename the input image to the output image
		renameSync(inputImagePath, outputImagePath);

		console.log(`Output image saved as ${outputImagePath}`);
	} 
	catch (err) 
	{
		console.error('Error adding metadata:', err);
	}
}

addMetadata();