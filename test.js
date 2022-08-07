const puppeteer = require('puppeteer');
var useragent = require('user-agents');
var userAgent = new useragent();

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
   page.setUserAgent(userAgent.toString())
  
  await page.goto('http://localhost:8080/userAgent');
//   await page.screenshot({path: 'example.png'});

//   await browser.close();
})();