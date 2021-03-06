const { default: axios } = require("axios");
const fs = require("fs");
const fsp = require("fs").promises;
const qs = require("qs");
const formData = require("form-data");
const path = require("path");
const config = require("../config/Config");
const { hashtags } = require("../config/Config");

let Helpers = {};

Helpers.fetchSessionId = async function () {
  let sessionId;
  try {
    console.log("fetching sessionId...");

    //Perform IG login and fetch session Id
    sessionId = await axios.post(
      `http://localhost:8081/auth/login`,
      qs.stringify({
        username: process.env.IG_USERNAME,
        password: process.env.IG_PASSWORD,
        locale: "en",
      })
    );

    if (sessionId.status !== 200) throw sessionId;
    sessionId = sessionId.data;
    await fsp.writeFile(`./localDb/sessionId`, sessionId);
    return sessionId;
  } catch (e) {
    console.log(`Caught error at fetchSessionId ${e}`);
    await fsp.writeFile(`./localDb/sessionId`, "null");
  }
};

Helpers.getTimeLineFeed = async function (sessionId) {
  try {
    let timeLineFeed = await axios.get(
      `http://localhost:8081/auth/timeline_feed?sessionid=${sessionId}`
    );

    return timeLineFeed.status === 200 ? true : false;
  } catch (e) {
    console.log(`Caught error at getTimelineFeed ${e}`);
    return false;
  }
};

Helpers.createPost = async function (sessionId, EligiblePost, hashtags) {
  try {
    EligiblePost.title =
      EligiblePost.title + `\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.` + hashtags.join();

    const form = new formData();
    form.append("sessionid", sessionId);
    form.append("caption", EligiblePost.title);
    form.append(
      "file",
      fs.createReadStream(
        path.resolve(
          process.platform === "win32" ?
          __dirname.replace(`\\helpers`, ``) + "/localDb/RedditMedia.mp4"
          : __dirname.replace(`/helpers`, ``) + "/localDb/RedditMedia.mp4"
        )
      )
    );

    axios.post("http://localhost:8081/clip/upload", form, {
      headers: form.getHeaders(),
    });

    return true;
  } catch (e) {
    console.log(`Caught error at createPost ${e}`);
    return false;
  }
};

Helpers.generateHashTags = function () {
  let min = 15,
    max = 25,
    hashtags = config.hashtags
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

  hashtags.length = Math.floor(Math.random() * (max - min + 1) + min);
  hashtags = hashtags.map((i) => "#" + i);
  return hashtags;
};

module.exports = Helpers;
