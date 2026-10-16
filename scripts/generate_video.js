const puppeteer = require('puppeteer-core');
const { execSync } = require('child_process');
const path = require('path');

async function main() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const page = await browser.newPage();
  
  // Set viewport to the exact size of the video
  await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 1 });
  
  const htmlPath = path.resolve(__dirname, '../posts/video-overlay.html');
  const fileUrl = 'file://' + htmlPath;
  console.log(`Navigating to ${fileUrl}`);
  
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  
  // CRITICAL FIX: Wait for custom fonts to load so text dimensions are accurate and do not overlap
  await page.evaluateHandle('document.fonts.ready');  
  const overlayPath = path.resolve(__dirname, '../posts/overlay.png');
  console.log(`Taking screenshot to ${overlayPath}...`);
  await page.screenshot({ path: overlayPath, omitBackground: true });
  
  await browser.close();
  console.log('Browser closed.');

  const videoPath = path.resolve(__dirname, '../posts/Self-Help EBook Cover Instagram Post in Olive Green Beige Soft Minimalist (1).mp4');
  const outputPath = path.resolve(__dirname, '../posts/final_mentorship_video.mp4');

  console.log('Running FFMPEG...');
  // -y overwrites without asking
  // overlay=0:0 composites the image at the top left
  // -c:a copy preserves the audio
  const ffmpegCmd = `ffmpeg -y -i "${videoPath}" -i "${overlayPath}" -filter_complex "[0:v][1:v]overlay=0:0" -c:a copy "${outputPath}"`;
  
  console.log(`Executing: ${ffmpegCmd}`);
  try {
    execSync(ffmpegCmd, { stdio: 'inherit' });
    console.log('✅ Video generated successfully at:', outputPath);
  } catch (error) {
    console.error('❌ Error generating video:', error);
  }
}

main().catch(console.error);
