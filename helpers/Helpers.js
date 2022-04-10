let { default: axios } = require("axios");
let qs = require("qs");

let Helpers = {};

Helpers.ClickButton = async function (page, xPath) {
  let [button] = await page.$x(xPath);
  if (button) await button.click();
  else console.log("Failed to click button @", xPath);
};

Helpers.BypassPrompt = async function (
  page,
  currentUrl,
  promptType,
  urlString
) {
  try {
    let ButtonText;
    switch (promptType) {
      case `SaveToHomescreen`:
        ButtonText = `Cancel`;
        break;
      default:
        ButtonText = `Not Now`;
    }
    if (currentUrl.includes(urlString)) {
      console.log(`Checking for ${promptType} page`);
      await Helpers.ClickButton(page, ButtonText);
      if (promptType !== `SaveToHomescreen`)
        await page.waitForNavigation({
          waitUntil: "networkidle2",
          timeout: 10000,
        });
      return;
    } else {
      console.log(`No ${promptType} detected`);
    }
  } catch (e) {
    console.log(`Caught error at BypassPrompt for ${promptType} : ${e}`);
  }
};

Helpers.fetchSessionId = async function () {
  try {
    let sessionId;
    //Perform IG login and fetch session Id
    sessionId = await axios.post(
      `http://localhost:8081/auth/login`,
      qs.stringify({
        username: process.env.IG_USERNAME,
        password: process.env.IG_PASSWORD,
        locale: "en",
      })
    );

    return sessionId.data.sessionId;
  } catch (e) {
    console.log(`Caught error at fetchSessioId ${e}`);
    return { error: e };
  }
};

module.exports = Helpers;
