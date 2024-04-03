import { exec } from 'child_process';
import { join } from 'path';
import { homedir } from 'os';

const inputFilePath = join(homedir(), 'Desktop', 'testvidapp.mov');
const desktopPath = join(homedir(), 'Desktop');
const outputFileName = 'output.mov';
const outputFilePath = join(desktopPath, outputFileName);

// Desired size (720x1280 pixels)
const desiredSize = '720x1280';

// FFmpeg command for the conversion with specified codec settings and size
const ffmpegCommand = `ffmpeg -i "${inputFilePath}" -c:v h264 -b:v 9355193 -s ${desiredSize} -strict experimental "${outputFilePath}"`;

// Execute the FFmpeg command
exec(ffmpegCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }

  console.log(`Conversion completed:\n${stdout}`);
});








// import ffmpeg from 'fluent-ffmpeg';
// import { join } from 'path';
// import { homedir } from 'os';

// const inputVideoPath = join(homedir(), 'Desktop', 'Test.mov');
// const desktopPath = join(homedir(), 'Desktop');
// const outputFileName = 'output.mov';
// const outputVideoPath = join(desktopPath, outputFileName);

// ffmpeg()
//   .input(inputVideoPath)
//   .output(outputVideoPath)
//   .addOption('-c:v', 'avc1') // Video codec (AVC1)
//   .addOption('-c:a', 'mp4a') // Audio codec (MP4A)
//   .addOption('-r', '122.652') // Frame rate
//   .size('720x1280') // Video dimensions
//   .addOption('-pix_fmt', 'yuv420p') // Chroma subsampling
//   .addOption('-b:v', '9355k') // Bitrate
//   .addOption('-ar', '48000') // Audio sampling rate
//   .addOption('-ac', '1') // Audio channels (Mono)
//   .on('end', () => {
//     console.log('Video processing finished.');
//   })
//   .on('error', (err) => {
//     console.error('Error:', err);
//   })
//   .run();