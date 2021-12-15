const puppeteer = require("puppeteer");
const Xvfb = require('xvfb');
const Helpers = require("../helpers/Helpers");
const Email = require("../helpers/Email");

let xvfb = new Xvfb({
  reuse:true,
  silent: false,
  xvfb_args: ["-screen", "0", '1280x720x24', "-ac"],
});

let browser,
  page,
  redditMediaPath =
    process.platform === "win32"
      ? `${__dirname.replace(`app`, ``)}\\localDb\\RedditMedia.mp4`
      : `${__dirname.replace(`app`, ``)}localDb/RedditMedia.mp4`,
  screenshotPath =
    process.platform === "win32"
      ? `${__dirname.replace(`app`, ``)}\\screenshots\\Error.png`
      : `${__dirname.replace(`app`, ``)}screenshots/Error.png`,
  IG_Script = {
    performSetup: async function () {
      try {

      if(process.platform !== "win32")  xvfb.start((err)=>{if (err) console.error(err)})

        browser =
        process.platform === "win32"
        ? await puppeteer.launch({
            args: [
              '--user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"',
            ],
            headless: false,
            executablePath:
              "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
          })
            : await puppeteer.launch({
                args: [
              //    "--no-sandbox",
                //  "--disable-setuid-sandbox",
                  '--start-fullscreen', '--display='+xvfb._display,
               //   "--disable-dev-shm-usage",
                  "--load-extension=" + __dirname.replace("app","")+"/extensions/Inssist/",
                  "--disable-extensions-except=" +
                  __dirname.replace("app","")+"/extensions/Inssist/",
                 // '--disable-accelerated-2d-canvas',
                 // '--disable-gpu',
                 // '--ignore-certificate-errors',
                ],
                headless: false,
                //executablePath: "/usr/bin/chromium-browser",
              });

          //    const context = await browser.createIncognitoBrowserContext();
              

        console.log("Preparing pupetteer");
        page = await browser.newPage();
        //page = await context.newPage();
        console.log("Setting headers");
        await page.setExtraHTTPHeaders({
          "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        });
        console.log("Setting User agent");
        await page.setUserAgent(
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
        );
        console.log("Setting view port");

        await page.setViewport({
          width: 1280,
          height: 720,
        });
        console.log("Setting URL");

        await page.goto(`chrome-extension://bcocdbombenodlegijagbhdjbifpiijp/inssist.html#instagram.com/accounts/login/`);
        await page.waitForNavigation({ waitUntil: "networkidle2" });
        await page.screenshot({
          path: screenshotPath,
        });
        Email.Mail(e, "performSetup");
        await page.waitForTimeout(3000);
        await page.screenshot({
          path: screenshotPath,
        });
        Email.Mail(e, "performSetup");
      } catch (e) {
        if(process.platform !== "win32")  xvfb.stop()
        await page.screenshot({
          path: screenshotPath,
        });
        Email.Mail(e, "performSetup");
        console.log("Error occured at performSetup", e);
        browser.close();
        return null;
      }
    },

    performLogin: async function () {
      // let username = process.env.IG_USERNAME,
      //   password = process.env.IG_PASSWORD;
      // try {
      //   console.log("\n\n Logging In...");

      //   await page.type("input[name=username]", username, { delay: 80 });
      //   await page.type("input[name=password]", password, { delay: 80 });
      //   await page.keyboard.press("Enter");
      //   await page.waitForNavigation({ waitUntil: "networkidle2" });
      //   await page.waitForTimeout(1000);

      //   await Helpers.ClickButton(
      //     page,
      //     `/html/body/div[1]/section/main/div/div/div/div`
      //   ).catch();

      //   await page.waitForTimeout(5000);

      //   let [notNow] = await page.$x("//button[contains(., 'Not Now')]");
      //   if (notNow) notNow.click();

      //   console.log("Logged In, Ready to Go!");
      //   return page;
      // } catch (e) {
        //if(process.platform !== "win32")  xvfb.stop()
      //   await page.screenshot({
      //     path: screenshotPath,
      //   });
      //   Email.Mail(e, "performLogin");
      //   console.log("Error occured at performLogin", e);
      // }
    },
    performUpload: async function (postThis) {
      // try {
      //   console.log("Running upload script...");

      //   await Helpers.ClickButton(
      //     page,
      //     `/html/body/div[1]/section/main/div/div/div/div`
      //   ).catch();

      //   //Click Not Now if propmt re-appears
      //   let [notNow] = await page.$x("//button[contains(., 'Not Now')]");
      //   if (notNow) notNow.click();

      //   //Click + button.
      //   await Helpers.ClickButton(
      //     page,
      //     `/html/body/div[1]/div/div/section/nav/div[2]/div/div/div[3]/div/div[3]/div/button`
      //   );

      //   await page.waitForTimeout(4000);
      //   console.log("clicking upload");

      //   let [uploadButton] = await page.$x(
      //     "//button[contains(., 'Select From Computer')]"
      //   );

      //   if (uploadButton) {
      //     const [fileChooser] = await Promise.all([
      //       page.waitForFileChooser(),
      //       uploadButton.click(),
      //     ]);
      //     await fileChooser.accept([redditMediaPath]);
      //     await page.waitForNavigation({ waitUntil: "networkidle2" });
      //   } else throw "Failed to click upload file";

      //   await page.waitForTimeout(2000);

      //   //click crop
      //   Helpers.ClickButton(
      //     page,
      //     `/html/body/div[6]/div[2]/div/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[2]/div/button`
      //   );
      //   await page.waitForTimeout(1200);

      //   //click Original crop
      //   Helpers.ClickButton(
      //     page,
      //     `/html/body/div[6]/div[2]/div/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[1]/div/button[1]`
      //   );
      //   await page.waitForTimeout(1200);

      //   //click Next
      //   Helpers.ClickButton(
      //     page,
      //     `/html/body/div[6]/div[2]/div/div/div/div[1]/div/div/div[2]/div/button`
      //   );
      //   await page.waitForTimeout(1200);

      //   //click Next again
      //   Helpers.ClickButton(
      //     page,
      //     `/html/body/div[6]/div[2]/div/div/div/div[1]/div/div/div[2]/div/button`
      //   );
      //   await page.waitForTimeout(1200);

      //   //click Text area
      //   Helpers.ClickButton(
      //     page,
      //     `/html/body/div[6]/div[2]/div/div/div/div[2]/div[2]/div/div/div/div[2]/div[1]/textarea`
      //   );
      //   await page.waitForTimeout(1200);

      //   //Type Post title
      //   await page.keyboard.type(postThis.title, { delay: 80 });

      //   await page.waitForTimeout(1200);
      //   //click Share
      //   Helpers.ClickButton(
      //     page,
      //     `/html/body/div[6]/div[2]/div/div/div/div[1]/div/div/div[2]/div/button`
      //   );

      //   console.log("Waiting for post to be shared");

      //   await page.waitForXPath(
      //     `/html/body/div[6]/div[2]/div/div/div/div[2]/div[1]/div/div/div/h2`,
      //     { timeout: 120000 }
      //   );

      //   //attempt to close login save prompt
      //   await Helpers.ClickButton(
      //     page,
      //     `/html/body/div[5]/div/div/div/div[3]/button[2]`
      //   ).catch((e) => {});

      //   console.log("Post has been shared!");
      //   console.log("Waiting for next request.");

      //   //click close modal
      //   Helpers.ClickButton(page, `/html/body/div[6]/div[1]/button`);
      //    browser.close();
      //   return;
      // } catch (e) {
//        if(process.platform !== "win32")  xvfb.stop()

      //   await page.screenshot({
      //     path: screenshotPath,
      //   });
      //   Email.Mail(e, "performUpload");
      //   browser.close();
      //   console.log("Error occured at performUpload", e);
      // }
    },
  };

module.exports = { IG_Script };
