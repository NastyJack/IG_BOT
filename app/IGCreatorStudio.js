const puppeteer = require("puppeteer");
const Helpers = require("../helpers/Helpers");
//const StealthPlugin = require("puppeteer-extra-plugin-stealth");
//puppeteer.use(StealthPlugin());

let page,
  popup,
  newPagePromise,
  redditMediaPath =
    process.platform === "win32"
      ? `${__dirname.replace(`app`, ``)}\\localDb\\RedditMedia.mp4`
      : `${__dirname.replace(`app`, ``)}localDb/RedditMedia.mp4`,
  CreatorStudio = {
    RunScript: async function RunBot(postThis) {
      let username,
        password,
        usernameInput,
        passwordInput,
        currentUrl,
        fileChoser,
        uploadPost,
        uploadProgress,
        uploadProgressValue,
        tries = 0;
      try {
        username = process.env.IG_USERNAME;
        password = process.env.IG_PASSWORD;
        console.log("Running Puppeteer..");

        const browser =
          process.platform === "win32"
            ? await puppeteer.launch({
                args: [
                  //   "--window-size=1920,1080",
                  '--user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"',
                ],
                headless: true,
                executablePath:
                  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
              })
            : await puppeteer.launch({
                // args: ["--single-process", "--no-zygote", "--no-sandbox"],
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
                //"/usr/bin/firefox",
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

        await page.goto(`https://business.facebook.com/creatorstudio/home`);

        await Helpers.ClickButton(
          page,
          `/html/body/div/div[1]/div[1]/div/div[1]/div[2]`
        );
        await Helpers.ClickButton(
          page,
          `/html/body/div/div[1]/div[2]/div/div[2]/div/div/div/div[2]/div/div/span/div/div`
        );

        newPagePromise = new Promise((x) =>
          browser.once("targetcreated", (target) => x(target.page()))
        );
        popup = await newPagePromise;

        currentUrl = await popup.evaluate(() => location.href);
        console.log("currentUrl =", currentUrl);
        await popup.screenshot({
          path: "Login 1.png",
        });

        //  await popup.waitForSelector('input[name="username"]');
        // usernameInput = await popup.$('input[name="username"]');
        await popup.waitForTimeout(3000);

        // await Helpers.ClickButton(
        //   popup,
        //   "/html/body/div[1]/section/main/div/div/div/div/form/div/div[1]/div"
        // );
        // await popup.keyboard.type(username, { delay: 80 });
        // await Helpers.ClickButton(
        //   popup,
        //   "/html/body/div[1]/section/main/div/div/div/div/form/div/div[2]/div"
        // );
        // await popup.keyboard.type(password, { delay: 80 });

        let selector2 = 'input[name="username"]';
        let selector1 = 'input[name="password"]';
        // await popup.evaluate(
        //   (selector2) => document.querySelector(selector2).click(),
        //   selector2
        // );
        currentUrl = await popup.evaluate(() => location.href);
        console.log("currentUrl before entering username =", currentUrl);
        // await popup.keyboard.press("Escape");
        // await popup.keyboard.press("Escape");
        await popup.keyboard.type(username, { delay: 80 });
        // await popup.evaluate(
        //   (selector1) => document.querySelector(selector1).click(),
        //   selector1
        // );
        await popup.keyboard.press("Tab");
        await popup.keyboard.type(password, { delay: 80 });
        await popup.screenshot({
          path: "Login 2.png",
        });
        console.log("RedditMediaPath", redditMediaPath);
        process.exit(0);
        await popup.keyboard.press("Enter");
        await popup.screenshot({
          path: "Login 3.png",
        });
        console.log("currentUrl after entering credentials =", currentUrl);

        // usernameInput = await popup.$('');
        //  passwordInput = await popup.$('input[name="password"]');
        //  await usernameInput.type(username, { delay: 100 });
        //   await passwordInput.type(password, { delay: 100 });

        // await Helpers.ClickButton(
        //   popup,
        //   `//*[@id="loginForm"]/div/div[3]/button`
        // );

        await popup.waitForNavigation({ waitUntil: "networkidle2" });

        await popup.screenshot({
          path: "Login 4.png",
        });
        currentUrl = await popup.evaluate(() => location.href);
        console.log(
          "currentUrl after pressing enter and waiting for login finish =",
          currentUrl
        );

        if (currentUrl.includes(`https://www.instagram.com/accounts/onetap/`))
          await Helpers.ClickButton(
            popup,
            `//*[@id="react-root"]/section/main/div/div/div/div/button`
          );
        else throw "Failed to bypassOneTap @ Authorization";

        await page.waitForNavigation({ waitUntil: "networkidle2" });
        currentUrl = await page.evaluate(() => location.href);
        //Login to landing page
        if (
          currentUrl ===
          `https://business.facebook.com/creatorstudio/instagram_content_posts`
        ) {
          //Click on Add a new post
          await Helpers.ClickButton(
            page,
            `/html/body/div[1]/div[1]/div/div[2]/div/div/div[2]/div[1]/div[1]/div[1]/div/div/div`
          );
        } else throw "Failed to open landing page";

        //Clik on Add to Feed
        await Helpers.ClickButton(
          page,
          `/html/body/div[3]/div[1]/div[1]/div/div/div[1]/div[2]/div/div[1]/div/div/div/div`
        );

        await page.waitForTimeout(4000);
        await Helpers.ClickButton(
          page,
          `/html/body/div[4]/div/div/div/div[2]/div[1]/div/div[5]/div/div/div`
        );
        fileChoser = await page.$("input[type=file]");
        await fileChoser.uploadFile(redditMediaPath);

        uploadPost = await page.$x(
          "/html/body/div[4]/div/div/div/div[3]/div[1]/div[3]/div/div"
        );

        do {
          tries++;
          uploadProgress = await uploadPost[0].getProperty("textContent");
          uploadProgressValue = uploadProgress._remoteObject.value;
          console.log("Waiting for upload ", uploadProgressValue);
          if (tries > 60) throw "Failure at post upload";
          await page.waitForTimeout(1000);
        } while (uploadProgressValue !== "100%");

        console.log("Post upload complete...", uploadProgressValue);

        await Helpers.ClickButton(
          page,
          `/html/body/div[4]/div/div/div/div[2]/div[1]/div/div[2]/div[1]`
        );
        await page.keyboard.type(postThis.title, { delay: 80 });

        await Helpers.ClickButton(
          page,
          `/html/body/div[4]/div/div/div/div[3]/div[2]/button`
        );
        await page.waitForTimeout(5000);
        await browser.close();
        return;
      } catch (e) {
        console.log("Error occured at CreatorStudio", e);
      }
    },
  };

module.exports = { CreatorStudio };
