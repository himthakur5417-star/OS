const puppeteer = require('puppeteer-core');
const path = require('path');

async function main() {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 1 });
  
  const htmlPath = path.resolve(__dirname, '../posts/video-overlay.html');
  const fileUrl = 'file://' + htmlPath;
  
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  
  const layout = await page.evaluate(() => {
    const poster = document.querySelector('.poster');
    const title = document.querySelector('.title-container');
    const branches = document.querySelector('.branches-container');
    const footer = document.querySelector('.footer');
    
    return {
      windowInnerHeight: window.innerHeight,
      posterScrollHeight: poster.scrollHeight,
      posterBoundingBox: poster.getBoundingClientRect().toJSON(),
      titleBoundingBox: title.getBoundingClientRect().toJSON(),
      branchesBoundingBox: branches.getBoundingClientRect().toJSON(),
      footerBoundingBox: footer.getBoundingClientRect().toJSON(),
      logoBoundingBox: document.querySelector('.logo-container').getBoundingClientRect().toJSON(),
    };
  });
  
  console.log(JSON.stringify(layout, null, 2));
  
  await browser.close();
}

main().catch(console.error);
