const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36';
const solver = require("./solver.js");

const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
const randomUseragent = require('random-useragent');
let path = require("path");
var name;
var nextPage;

// const extPath = path.join(__dirname, "dknlfmjaanfblgfdfebhijalfmhmjjjo");
// args: [
//     `--load-extension=${extPath}`,
//       ]

module.exports.download = async function (userinput) {
  const userAgent = randomUseragent.getRandom();
  const UA = userAgent || USER_AGENT;


  // executablePath: '/usr/bin/google-chrome'
  name = userinput.trim();
  return new Promise(async (resolve, reject) => {
    const browser = await puppeteer.launch({
      headless: true
    });


    const page = await browser.newPage();




    await page.goto('https://www.nmc.org.uk/registration/search-the-register/');


    await page.focus('#PinNumber')

    await page.keyboard.type(name);
    await page.waitForTimeout(1000);

    await page.$eval('#searchRegisterButton', form => form.click());

    await page.waitForTimeout(1000);

    try {
      // try without captcha
      nextPage = await page.$eval('.more-link', anchor => anchor.getAttribute('href'));
    } catch (error) {
      // dealing with iframe  captcha
      await page.waitForSelector('iframe');
      const elementHandle = await page.$(
        'iframe[title="recaptcha challenge expires in two minutes"]',
      );
      await page.waitForTimeout(3000);    // wait for captcha to load

      const frame = await elementHandle.contentFrame();

      await frame.$eval('#recaptcha-audio-button', form => form.click());
      await page.waitForTimeout(5000);

      var text;
      try {
        text = await frame.$eval('.rc-audiochallenge-tdownload-link', anchor => anchor.getAttribute('href'));
      } catch (error) {
        return reject({
          err: true,
          msg: "Captcha ByPass Limit Reached. You have to wait some time so that Google unban you. For more info, contact bot developer."
        });
      }



      console.log("Captcha Audio Link:" + text);

      try {
        let solved = await solver.solver(text);

        console.log("Captcha Solved:" + solved);

        await frame.focus('#audio-response')
        await page.keyboard.type(solved);

        await page.waitForTimeout(4000);

        await frame.$eval('#recaptcha-verify-button', form => form.click());
        await page.waitForTimeout(3000);

        try {
          nextPage = await page.$eval('.more-link', anchor => anchor.getAttribute('href'));
          console.log(nextPage);
        } catch (error) {
          return reject({
            err: true,
            msg: "Captcha was bypassed successfully! But the key you provided is not valid. Please put the valid pin Key."
          });
        }


      } catch (error) {
        console.log('ERROR WHILE SOLVING CAPTCHA')
        return reject({
          err: true,
          msg: "ERROR WHILE SOLVING CAPTCHA"
        });
      }




      // await page.waitForTimeout(3000);
    }






    var download = nextPage;
    download = download.split('?')[0] + "?pdf=1";
    download = "https://www.nmc.org.uk" + download;
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
