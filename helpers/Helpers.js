let Helpers = {};

Helpers.ClickButton = async function (page, xPath) {
  try {
    let [button] = await page.$x(xPath);
    if (button) await button.click();
  } catch (e) {
    if (
      xPath === `/html/body/div[5]/div/div/div/div[3]/button[2]` ||
      xPath === `/html/body/div[1]/section/main/div/div/div/div`
    )
      console.log("Prompts did not appear. Resuming...");
    else console.log("Failed to click button @", xPath);
  }
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
