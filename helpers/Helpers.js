// const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');
// const ffmpeg = createFFmpeg({ log: true });
//const fs = require("fs");
// const { createFFmpeg, fetchFile } = require("@ffmpeg/ffmpeg");
// const ffmpeg = createFFmpeg(
//   { log: true },
//   "--experimental-wasm-threads,  --experimental-wasm-bulk-memory"
// );

let Helpers = {};

// Helpers.ClickButton = async function (page, buttonText, filePath = null) {
//   let [button] = buttonText
//     ? await page.$x(`//div/button[contains(., '${buttonText}')]`)
//     : await page.$x(
//         `/html/body/div[1]/section/nav[2]/div/div/div[2]/div/div/div[3]`
//       );

//   if (!buttonText) {
//     const elementHandle = await page.$("input[type=file]");
//     await button.click();
//     await elementHandle.uploadFile(filePath);

// await button.click();
// const [fileChooser] = Promise.all([await page.waitForFileChooser()]);
// await fileChooser.accept([filePath]);
//   } else if (buttonText && button) {
//     await button.click();
//     return true;
//   }
//   //throw
//   else
//     console.log(`Failed to click '${buttonText || `Make a new post`}' Button`);
// };

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

//Helpers.mergeVideo = async function (video, audio) {
// let { createFFmpeg, fetchFile } = FFmpeg;
// let ffmpeg = createFFmpeg();
// await ffmpeg.load();
// ffmpeg.FS("writeFile", "video.mp4", await fetchFile(video));
// ffmpeg.FS("writeFile", "audio.mp4", await fetchFile(audio));
// await ffmpeg.run(
//   "--experimental-wasm-bulk-memory",
//   "-i",
//   "video.mp4",
//   "-i",
//   "audio.mp4",
//   "-c",
//   "copy",
//   "output.mp4"
// );
// let data = await ffmpeg.FS("readFile", "output.mp4");
// console.log("file audio/video mixing complete");

//  return new Uint8Array(data.buffer);
//};

module.exports = Helpers;
