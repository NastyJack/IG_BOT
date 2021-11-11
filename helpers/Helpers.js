let Helpers = {};

Helpers.ClickButton = async function (page, xPath) {
  let [button] = await page.$x(xPath);
  if (button) await button.click();
  else if (xPath === `/html/body/div[5]/div/div/div/div[3]/button[2]`)
    console.log("Notification prompt did not appear. Resuming...");
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

module.exports = Helpers;
