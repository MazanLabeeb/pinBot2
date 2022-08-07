const puppeteer = require('puppeteer');
const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
var useragent = require('user-agents');
var userAgent = new useragent();

var name;

module.exports.download = async function (userinput) {
  name = userinput.trim();
  return new Promise(async (resolve, reject) => {
    const browser = await puppeteer.launch({
      headless: true
    });


    const page = await browser.newPage();

    page.setUserAgent(userAgent.toString())


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
          var nextPage =  morelink[0].href;
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
