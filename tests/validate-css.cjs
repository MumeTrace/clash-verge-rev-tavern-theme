const { pathToFileURL } = require('node:url');
const { existsSync } = require('node:fs');
const { chromium } = require('playwright');

async function main() {
  const testPage = process.argv[2];
  const chromePath = process.argv[3];

  if (!testPage) {
    throw new Error('Usage: node validate-css.cjs <test-page> [chrome-path]');
  }

  const executablePath = chromePath || process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
  const launchOptions = {
    headless: true,
    args: ['--allow-file-access-from-files'],
  };

  if (executablePath) {
    if (!existsSync(executablePath)) {
      throw new Error(`Chromium executable does not exist: ${executablePath}`);
    }
    launchOptions.executablePath = executablePath;
  }

  const browser = await chromium.launch(launchOptions);

  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(pathToFileURL(testPage).href);
    await page.waitForFunction(() => {
      const result = document.querySelector('#result');
      return result && result.textContent !== 'WAIT';
    });

    const resultText = await page.locator('#result').textContent();
    const result = JSON.parse(resultText);
    console.log(JSON.stringify(result));

    if (result.status !== 'PASS') {
      process.exitCode = 1;
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
