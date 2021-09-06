const puppeteer = require("puppeteer-core");
const Helpers = require("../helpers/Helpers");

let page,
  popup,
  newPagePromise,
  redditMediaPath = `${__dirname.replace(`app`, ``)}\\localDb\\RedditMedia.mp4`,
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

        const browser = await puppeteer.launch({
          args: ["--no-sandbox"],
          headless: true,
          // executablePath:
          //   "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        });
        page = await browser.newPage();
        await page.goto(`https://business.facebook.com/creatorstudio/home 
      `);

        await page.setViewport({
          width: 1280,
          height: 720,
        });
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
        await popup.waitForSelector('input[name="username"]');
        usernameInput = await popup.$('input[name="username"]');
        passwordInput = await popup.$('input[name="password"]');
        await usernameInput.type(username, { delay: 100 });
        await passwordInput.type(password, { delay: 100 });
        await Helpers.ClickButton(
          popup,
          `//*[@id="loginForm"]/div/div[3]/button`
        );

        await popup.waitForNavigation({ waitUntil: "networkidle2" });
        currentUrl = await popup.evaluate(() => location.href);
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
      } catch (e) {
        console.log("Error occured at CreatorStudio", e);
      }
    },
  };

module.exports = { CreatorStudio };
