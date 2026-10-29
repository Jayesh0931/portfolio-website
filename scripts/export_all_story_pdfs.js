import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const EXPORT_DIR = path.resolve('public/exports');

if (!fs.existsSync(EXPORT_DIR)) {
  fs.mkdirSync(EXPORT_DIR, { recursive: true });
}

const STORIES = [
  {
    name: 'Allyra',
    path: 'allyra-story',
    filename: 'Allyra_Story_Visual.pdf',
    slidesFilename: 'Allyra_Story_Slides.pdf',
  },
  {
    name: 'Campaign OS',
    path: 'campaign-os-story',
    filename: 'Campaign_OS_Story_Visual.pdf',
    slidesFilename: 'Campaign_OS_Story_Slides.pdf',
  },
  {
    name: 'VousVous',
    path: 'vousvous-story',
    filename: 'VousVous_Story_Visual.pdf',
    slidesFilename: 'VousVous_Story_Slides.pdf',
  },
];

async function generatePDFs() {
  console.log('🚀 Launching Google Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--font-render-hinting=max',
    ],
  });

  for (const story of STORIES) {
    console.log(`\n📄 Processing ${story.name} (${story.path})...`);
    const page = await browser.newPage();
    
    // Set 1440px desktop viewport
    await page.setViewport({
      width: 1440,
      height: 900,
      deviceScaleFactor: 2,
    });

    const targetUrl = `http://localhost:5173/${story.path}?pdf=1`;
    console.log(`  Navigating to ${targetUrl}`);
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait for the article component to mount
    await page.waitForSelector('article', { timeout: 15000 });

    // Scroll down to trigger any IntersectionObservers or image loads
    console.log('  Hydrating canvas & preloading assets...');
    await page.evaluate(async () => {
      await document.fonts.ready;
      const totalH = document.documentElement.scrollHeight;
      for (let y = 0; y < totalH; y += 1200) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });

    // Brief pause to allow rendering to settle
    await new Promise(r => setTimeout(r, 1500));

    // Injected styles to ensure pristine print/PDF output
    await page.addStyleTag({
      content: `
        @page {
          margin: 0;
          size: 1440px auto;
        }
        body {
          margin: 0 !important;
          padding: 0 !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .sound-toggle-btn,
        .target-cursor-wrapper,
        #ice-freeze-overlay,
        button[aria-label="Scroll to top"] {
          display: none !important;
        }
      `,
    });

    // Get total scroll height of the story canvas
    const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    console.log(`  Story Canvas Dimensions: 1440px × ${scrollHeight}px`);

    // 1. Export Full Continuous Visual Canvas PDF
    const fullPdfPath = path.join(EXPORT_DIR, story.filename);
    console.log(`  Rendering continuous PDF: ${story.filename}...`);
    await page.pdf({
      path: fullPdfPath,
      width: '1440px',
      height: `${scrollHeight}px`,
      printBackground: true,
      pageRanges: '1',
      preferCSSPageSize: false,
    });
    const fullSizeMB = (fs.statSync(fullPdfPath).size / 1024 / 1024).toFixed(2);
    console.log(`  ✅ Continuous PDF created: ${story.filename} (${fullSizeMB} MB)`);

    // 2. Export 16:9 Paginated Slide Presentation PDF
    const slidesPdfPath = path.join(EXPORT_DIR, story.slidesFilename);
    console.log(`  Rendering paginated slides PDF: ${story.slidesFilename}...`);
    await page.pdf({
      path: slidesPdfPath,
      width: '1440px',
      height: '900px',
      printBackground: true,
      preferCSSPageSize: false,
    });
    const slidesSizeMB = (fs.statSync(slidesPdfPath).size / 1024 / 1024).toFixed(2);
    console.log(`  ✅ Slides PDF created: ${story.slidesFilename} (${slidesSizeMB} MB)`);

    await page.close();
  }

  await browser.close();
  console.log('\n🎉 All PDFs successfully generated in public/exports/!');
}

generatePDFs().catch(err => {
  console.error('Export failed:', err);
  process.exit(1);
});
