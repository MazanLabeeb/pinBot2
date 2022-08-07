const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36';


const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
const randomUseragent = require('random-useragent');
var name;

module.exports.download = async function (userinput) {
  const userAgent = randomUseragent.getRandom();
  const UA = userAgent || USER_AGENT;



  name = userinput.trim();
  return new Promise(async (resolve, reject) => {
    const browser = await puppeteer.launch({
      headless: true
    });


    const page = await browser.newPage();

    //Randomize viewport size
    await page.setViewport({
      width: 1920 + Math.floor(Math.random() * 100),
      height: 3000 + Math.floor(Math.random() * 100),
      deviceScaleFactor: 1,
      hasTouch: false,
      isLandscape: false,
      isMobile: false,
    });

    await page.setUserAgent(UA);
    await page.setJavaScriptEnabled(true);
    await page.setDefaultNavigationTimeout(0);

    //Skip images/styles/fonts loading for performance
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') {
            req.abort();
        } else {
            req.continue();
        }
    });

    await page.evaluateOnNewDocument(() => {
        // Pass webdriver check
        Object.defineProperty(navigator, 'webdriver', {
            get: () => false,
        });
    });

    await page.evaluateOnNewDocument(() => {
        // Pass chrome check
        window.chrome = {
            runtime: {},
            // etc.
        };
    });

    await page.evaluateOnNewDocument(() => {
        //Pass notifications check
        const originalQuery = window.navigator.permissions.query;
        return window.navigator.permissions.query = (parameters) => (
            parameters.name === 'notifications' ?
                Promise.resolve({ state: Notification.permission }) :
                originalQuery(parameters)
        );
    });

    await page.evaluateOnNewDocument(() => {
        // Overwrite the `plugins` property to use a custom getter.
        Object.defineProperty(navigator, 'plugins', {
            // This just needs to have `length > 0` for the current test,
            // but we could mock the plugins too if necessary.
            get: () => [1, 2, 3, 4, 5],
        });
    });

    await page.evaluateOnNewDocument(() => {
        // Overwrite the `languages` property to use a custom getter.
        Object.defineProperty(navigator, 'languages', {
            get: () => ['en-US', 'en'],
        });
    });
    await page.goto('https://www.nmc.org.uk/registration/search-the-register/');

    const data = await page.evaluate(async (name) => {

      function delay(time) {
        return new Promise(function (resolve) {
          setTimeout(resolve, time)
        });
      }
      var input = document.getElementById("PinNumber");
      input.value = name;
      var btn = document.getElementById("searchRegisterButton");
      await delay(3000);
      btn.click();
      await delay(10000);

      var morelink = document.querySelectorAll(".more-link");



      try {
        var test = document.getElementById("PinNumber-error");
        console.log("Debug" + test.innerHTML);
        return {
          err: true,
          msg: "Invalid Key"
        };
      } catch (error) {


      }

      try {
        var nextPage = morelink[0].href;
      } catch (error) {
        return {
          err: true,
          msg: "Captcha Failed!"
        };
      }







      return nextPage;
    }, name);
    if (data.err == true) {
      await browser.close();
      return reject(data);
    }
    var download = data;
    download = download.split('?')[0] + "?pdf=1";
    console.log("Link: " + download);


    const file = fs.createWriteStream("./public/" + name + ".pdf");
    const request = http.get(download, function (response) {
      response.pipe(file);

      // after download completed close filestream
      file.on("finish", () => {
        file.close();
        console.log("Download Completed");
        resolve();
      });
    });

    await browser.close();

  })
};
