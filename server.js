const puppeteer = require('puppeteer');
const cron = require('node-cron');

const loginToInstagram = async (page) => {
  // Wait for the username input field and fill it
  await page.waitForSelector('input[name="username"]', { visible: true });
  await page.type('input[name="username"]', 'EB_SocialMedia');

  // Wait for the password input field and fill it
  await page.waitForSelector('input[name="password"]', { visible: true });
  await page.type('input[name="password"]', 'hagit346519');

  // Click the login button
  await page.waitForSelector('button[type="submit"]', { visible: true });
  await page.click('button[type="submit"]');

  console.log('Login attempt made');
};

const scrollToHalfAndMore = async (page) => {
  // Initial scroll to 50% of the page
  await page.evaluate(() => {
    const scrollHeight = document.body.scrollHeight;
    window.scrollTo(0, scrollHeight / 2);
  });

  // Further scroll after 30 seconds
  setTimeout(async () => {
    console.log('Running action after 30 seconds: Scroll');
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
  }, 30000); // 30 seconds delay
};

const runSequence = async (page) => {
  const actions = [
    // Starting from 1 minute intervals as per the original setup
    { delay: '0 */1 * * *', action: 'Scroll' },
    { delay: '0 */3 * * *', action: 'Scroll' },
    { delay: '0 */7 * * *', action: 'Scroll' },
    { delay: '0 */30 * * *', action: 'Scroll' },
    { delay: '0 */60 * * *', action: 'Scroll' },
    { delay: '0 */120 * * *', action: 'Scroll' },
    { delay: '0 */300 * * *', action: 'Scroll' }
  ];

  actions.forEach(({ delay, action }) => {
    cron.schedule(delay, async () => {
      console.log(`Running scheduled action: ${action}`);
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });
    });
  });
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // Set to false to see the browser UI
    defaultViewport: null,
    args: ['--start-maximized']
  });
  const page = await browser.newPage();

  await page.goto('https://www.instagram.com/');
  console.log('Page loaded');

  // Perform login
  await loginToInstagram(page);

  // Wait for navigation after login (optional, adjust based on observed behavior)
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  // Scroll to 50% of the page initially and then after 30 seconds
  await scrollToHalfAndMore(page);

  // Then, start the cron sequence for further scrolling
  await runSequence(page);
})();
