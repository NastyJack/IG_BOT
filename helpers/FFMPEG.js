const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
const config = require("../config/Config");

const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const ffmpegGIF = require("fluent-ffmpeg")().setFfmpegPath(
  ffmpegInstaller.path
);

const fs = require("fs");

const { default: axios } = require("axios");
const OutputVideoPath =
  process.platform === "win32"
    ? `${__dirname.replace(`\\helpers`, ``)}\\localDb\\RedditMedia.mp4`
    : `${__dirname.replace(`/helpers`, ``)}/localDb/RedditMedia.mp4`;
const OutputGIFPath = OutputVideoPath.replace(".mp4", ".gif");

ffmpeg.setFfmpegPath(ffmpegPath);
let FFMPEG = {};

FFMPEG.combineAudioVideo = async function (url) {
  try {
    let fetchedAudio;
    //  console.log(`\n> URL : ${url}`);
    console.log("Downloading Video, Please Wait ...");
    url = url.replace("DASH_1080", "DASH_720");
    return await scrape(url);

    async function scrape(url) {
      let proc = new ffmpeg(["-preset ultrafast -threads 0"]);

      return new Promise(async (resolve, reject) => {
        let mediaId;
        proc
          .addInput(String(url))
          .size("1200x?")
          .aspect("4:5")
          .autopad()
          .output(OutputVideoPath)
          .on("error", (err) => {
            console.log("Error: " + err);
            return reject(new Error(err));
          })
          .on("end", () => {
            console.log(
              "\n> Media Ready, posting...",
              `${config.base_url}/RedditMedia`
            );
            return resolve(`${config.base_url}/RedditMedia`);
          });
        mediaId = url.replace(`https://v.redd.it/`, "");
        mediaId = mediaId.split("/")[0];

        if (!url.includes("imgur"))
          url = `https://v.redd.it/${mediaId}/DASH_audio.mp4`;

        fetchedAudio = await axios.get(url).catch((error) => {});

        if (
          fetchedAudio &&
          fetchedAudio.status === 200 &&
          !url.includes("imgur")
        ) {
          console.log("Found audio track...");
          proc.addInput(url);
        } else {
          console.log("No audio track");
        }
        console.log("Downloading and converting...");

        proc.run();
      });
    }
  } catch (e) {
    console.log("Error at FFMPEG combineAudioVideo", e);
    return { error: e };
  }
};

FFMPEG.GIFtoVideo = async function (url) {
  try {
    let GIF;

    console.log("Downloading GIF...");
    didConvert = await axios
      .get(url, { responseType: "stream" })
      .then((response) => {
        return new Promise((resolve, reject) => {
          let writeFileEvent = response.data.pipe(
            fs.createWriteStream(OutputGIFPath)
          );
          writeFileEvent.on("error", reject).on("close", resolve);
        });
      });

    console.log("GIF saved..");

    GIF = await ConvertGIF();
    if (GIF && GIF.error) throw GIF.error;
    return true;
  } catch (error) {
    console.error("Failure at saving gif", error.message, error);
    return { error: error };
  }
};

async function ConvertGIF() {
  try {
    return new Promise(async (resolve, reject) => {
      console.log("Converting GIF, Please Wait ...");
      console.log("gif to convert path ", OutputGIFPath);
      ffmpegGIF
        .input(OutputGIFPath)
        .outputOptions(["-movflags", "faststart", "-pix_fmt", "yuv420p"])
        .size("1200x?")
        .aspect("4:5")
        .autopad()
        .noAudio()
        .output(OutputVideoPath)
        .on("end", () => {
          console.log("GIF conversion complete!");
          resolve(`${config.base_url}/RedditMedia`);
        })
        .on("error", (e) => {
          console.log(e);
          return reject(new Error(err));
        });

      ffmpegGIF.run();
    });
  } catch (e) {
    console.log("Error at FFMPEG GIFtoVideo", e);
    return { error: e };
  }
}

module.exports = FFMPEG;
