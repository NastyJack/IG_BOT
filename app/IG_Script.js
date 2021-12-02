const puppeteer = require("puppeteer");
const Helpers = require("../helpers/Helpers");
const Email = require("../helpers/Email");

let isNewUpload = false,
  browser,
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
                  "--no-sandbox",
                  "--disable-setuid-sandbox",
                  "--disable-dev-shm-usage",
                  "--disable-extensions-except=" +
                    "this.extensionPathBuildPath",
                  "--load-extension=" + "this.extensionPathBuildPath",
                ],
                headless: true,
                executablePath: "/usr/bin/chromium-browser",
              });

        page = await browser.newPage();
        await page.setExtraHTTPHeaders({
          "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        });

        await page.setUserAgent(
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
        );

        await page.setViewport({
          width: 1280,
          height: 720,
        });
        await page.goto(`https://www.instagram.com/`);
        await page.waitForTimeout(3000);
      } catch (e) {
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
      let username = process.env.IG_USERNAME,
        password = process.env.IG_PASSWORD,
        ignoreLogin = false;
      try {
        isNewUpload = false;
        console.log("\n\n Logging In...");

        //click input to start typing
        await Helpers.ClickButton(
          page,
          `/html/body/div[1]/section/main/article/div[2]/div[1]/div/form/div/div[1]/div`
        ).catch((e) => {
          ignoreLogin = true;
        });

        if (ignoreLogin) {
          await page.type("input[name=username]", username, { delay: 80 });
          await page.type("input[name=password]", password, { delay: 80 });
          await page.keyboard.press("Enter");
          await page.waitForNavigation({ waitUntil: "networkidle2" });
          await page.waitForTimeout(1000);

          await Helpers.ClickButton(
            page,
            `/html/body/div[1]/section/main/div/div/div/div`
          ).catch();
        }
        await page.waitForTimeout(5000);

        let [notNow] = await page.$x("//button[contains(., 'Not Now')]");
        if (notNow) notNow.click();

        console.log("Logged In, Ready to Go!");
        isNewUpload = true;
        return page;
      } catch (e) {
        await page.screenshot({
          path: screenshotPath,
        });
        Email.Mail(e, "performLogin");
        console.log("Error occured at performLogin", e);
        //   browser.close();
      }
    },
    performUpload: async function (postThis) {
      try {
        if (!isNewUpload) throw "Not a fresh upload. Skipping upload.";
        console.log("Running upload script...");

        //Click + button.
        await Helpers.ClickButton(
          page,
          `/html/body/div[1]/section/nav/div[2]/div/div/div[3]/div/div[3]/div/button`
        );

        await page.waitForTimeout(4000);
        console.log("clicking upload");

        let [uploadButton] = await page.$x(
          "//button[contains(., 'Select From Computer')]"
        );

        if (uploadButton) {
          const [fileChooser] = await Promise.all([
            page.waitForFileChooser(),
            uploadButton.click(),
          ]);
          await fileChooser.accept([redditMediaPath]);
          await page.waitForNavigation({ waitUntil: "networkidle2" });
        } else throw "Failed to click upload file";

        await page.waitForTimeout(2000);

        //click crop
        Helpers.ClickButton(
          page,
          `/html/body/div[6]/div[2]/div/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[2]/div/button`
        );
        await page.waitForTimeout(1200);

        //click Original crop
        Helpers.ClickButton(
          page,
          `/html/body/div[6]/div[2]/div/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[1]/div/button[1]`
        );
        await page.waitForTimeout(1200);

        //click Next
        Helpers.ClickButton(
          page,
          `/html/body/div[6]/div[2]/div/div/div/div[1]/div/div/div[2]/div/button`
        );
        await page.waitForTimeout(1200);

        //click Next again
        Helpers.ClickButton(
          page,
          `/html/body/div[6]/div[2]/div/div/div/div[1]/div/div/div[2]/div/button`
        );
        await page.waitForTimeout(1200);

        //click Text area
        Helpers.ClickButton(
          page,
          `/html/body/div[6]/div[2]/div/div/div/div[2]/div[2]/div/div/div/div[2]/div[1]/textarea`
        );
        await page.waitForTimeout(1200);

        //Type Post title
        await page.keyboard.type(postThis.title, { delay: 80 });

        //click Share
        Helpers.ClickButton(
          page,
          `/html/body/div[6]/div[2]/div/div/div/div[1]/div/div/div[2]/div/button`
        );

        console.log("Waiting for post to be shared");

        await page.waitForXPath(
          `/html/body/div[6]/div[2]/div/div/div/div[2]/div[1]/div/div/div/h2`,
          { timeout: 120000 }
        );

        //attempt to close login save prompt
        await Helpers.ClickButton(
          page,
          `/html/body/div[5]/div/div/div/div[3]/button[2]`
        ).catch((e) => {});

        console.log("Post has been shared!");
        console.log("Waiting for next request.");

        //click close modal
        Helpers.ClickButton(page, `/html/body/div[6]/div[1]/button`);
        return;
      } catch (e) {
        await page.screenshot({
          path: screenshotPath,
        });
        Email.Mail(e, "performUpload");

        console.log("Error occured at performUpload", e);
      }
    },
  };

module.exports = { IG_Script };
