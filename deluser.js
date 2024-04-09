const puppeteer = require('puppeteer');
const cron = require('node-cron');

const FirstButtonClick=async(page)=> {
    try {
        await page.waitForSelector('button._a9--._ap36._a9_0', { visible: true, timeout: 5000 }); // Adjust timeout as needed
        await page.click('button._a9--._ap36._a9_0');
        console.log('Clicked on search button');
      } catch (error) {
        console.log('search button not found or not clicked:', error);
      }
}
const loginToInstagram = async (page) => {
  await page.waitForSelector('input[name="username"]', { visible: true });
  await page.type('input[name="username"]', 'EB_SocialMedia'); // Replace YOUR_USERNAME
  await page.waitForSelector('input[name="password"]', { visible: true });
  await page.type('input[name="password"]', 'hagit346519'); // Replace YOUR_PASSWORD
  await page.waitForSelector('button[type="submit"]', { visible: true, timeout: 5000 });
  await page.click('button[type="submit"]',{ timeout: 5000});
  console.log('Login attempt made');
  console.log('Next to click function');

//   FirstButtonClick(page)

  setTimeout(async () => {
    await clickOnProfile(page);
    // You may want to close the browser after all actions are completed
    // await browser.close();
  }, 20000);

};

const FollowersClick = async (page) => {
    await page.waitForSelector(followersLinkSelector, { visible: true });
    await page.click(followersLinkSelector);
    console.log('Followers link clicked'); // 15000 milliseconds = 15 seconds
}
const likeAndScroll = async (page) => {
  try {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.7));
    await page.waitForSelector('svg[aria-label="לייק"]', { visible: true, timeout: 5000 });
    await page.click('svg[aria-label="לייק"]:first-of-type');
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.2));
    await page.waitForSelector('svg[aria-label="לייק"]', { visible: true, timeout: 5000 });
    await page.click('svg[aria-label="לייק"]:first-of-type');
  } catch (error) {
    console.error('Error performing like and scroll:', error);
  }
};
const selector = 'div.x9f619.x3nfvp2.xr9ek0c.xjpr12u.xo237n4.x6pnmvc.x7nr27j.x12dmmrz.xz9dl7a.xn6708d.xsag5q8.x1ye3gou.x80pfx3.x159b3zp.x1dn74xm.xif99yt.x172qv1o.x10djquj.x1lhsz42.xzauu7c.xdoji71.x1dejxi8.x9k3k5o.xs3sg5q.x11hdxyr.x12ldp4w.x1wj20lx.x1lq5wgf.xgqcy7u.x30kzoy.x9jhf4c';
const Profileselector = '.x1lliihq.x193iq5w.x6ikm8r.x10wlt62.xlyipyv.xuxw1ft';
const followersLinkSelector = 'a.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz';
const searchHashTag= async (page) => {
    try{
  // Wait for the search icon to be loaded on the page
  await page.waitForSelector(selector, {visible: true});
  
  // Click the search icon to possibly activate/focus on the search input
  await page.click(selector);

  // Wait for the search input field to be available for text entry
  await page.waitForSelector(selector, {visible: true});

  // Type the search query into the search input field
  await page.type(selector, 'אומנות ישראלית');
  console.log('search Hashtag');
    // Press Enter to submit the search query
    await page.keyboard.press('Enter');
    }catch (error) {
        console.error('Error click on search field :', error);
      }
};
const clickOnProfile = async (page) => {
    try {
        await page.waitForSelector(Profileselector, { visible: true, timeout: 5000 });
        await page.click(Profileselector);
        // await page.goto('https://www.instagram.com/eb_socialmedia/?next=%2F') // 15 seconds in milliseconds
        console.log('Profileselector clicked');
        FollowersClick(page)
    } catch (error) {
      console.error('Error clicking button:', error);
    }
}
const clickOnImage = async (page) => {
  try {
    await page.waitForSelector('img[src*="scontent.cdninstagram.com"]', { visible: true });
    await page.click('img[src*="scontent.cdninstagram.com"]');
    console.log('Image clicked');
  } catch (error) {
    console.error('Error clicking on image:', error);
  }
};

// const scrollToHalfAndMore = async (page) => {
//   await page.evaluate(() => {
//     const scrollHeight = document.body.scrollHeight;
//     window.scrollTo(0, scrollHeight *0.1);
//   });
//   setTimeout(() => {
//     console.log('Running action after 30 seconds: Scroll & Like');
//     likeAndScroll(page);
//   }, 30000);
// };

// const runSequence = async (page) => {
//   const actions = [
//     { delay: '*/1 * * * *', action: () => {
//         clickOnProfile(page)
//         scrollToHalfAndMore(page)
//         likeAndScroll(page) 
//         console.log('Running scheduled action 1 Min: Scroll & Like');
//         scrollToHalfAndMore(page)
//     }},
//     { delay: '*/5 * * * *', action: () => {
//         scrollToHalfAndMore(page)
//       console.log('Running scheduled action 5 Min: Scroll & Like & Search');
//       likeAndScroll(page);
//       searchHashTag(page);
//     //   clickOnImage(page);
//     }},
//     { delay: '*/7 * * * *', action: () =>{ likeAndScroll(page)
//         likeAndScroll(page) 
//         console.log('Running scheduled action 7 Min: Scroll & Like');
//     } },
//     { delay: '0 */2 * * *', action: () => {likeAndScroll(page)
//         likeAndScroll(page) 
//         console.log('Running scheduled action 120 Min: Scroll & Like');
//     } }
//   ];

//   actions.forEach(({ delay, action }) => {
//     cron.schedule(delay, action);
//   });
// };

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });
  const page = await browser.newPage();

  await page.goto('https://www.instagram.com/');
  console.log('Page loaded');

  await loginToInstagram(page);
  // After the loginToInstagram function in your existing code
  
  
  
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

//   await scrollToHalfAndMore(page);
//   await runSequence(page);
})();