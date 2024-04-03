/******************************************************************************
 * @author Jake Brockbank
 * Dec 5th, 2023 (Original)
 * This program adds metadata to a video file using exiftool.
******************************************************************************/

import { exec } from 'child_process';
import { join } from 'path';
import { homedir } from 'os';

// Define the input video file path
const inputVideoPath = join(homedir(), 'Desktop', 'IMG.MOV');

// Define new metadata values
const software = 'My Custom Software';
const artist = 'My Name';

// Build the exiftool command to modify commonly writable fields
const exiftoolCommand = `exiftool -overwrite_original -Software="${software}" -Artist="${artist}" "${inputVideoPath}"`;

// Execute the exiftool command
exec(exiftoolCommand, (err, stdout, stderr) => {
	if (err) 
	{
		console.error('Error adding metadata:', err);
	} 
	else 
	{
		console.log('Metadata added successfully:', stdout);
	}
});