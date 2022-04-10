const { default: axios } = require("axios");
const fs = require("fs");
const fsp = require("fs").promises;
const qs = require("qs");
const formData = require("form-data");
const path = require("path");

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

Helpers.createPost = async function (sessionId, EligiblePost) {
  try {
    const form = new formData();
    form.append("sessionid", sessionId);
    form.append("caption", EligiblePost.title);
    form.append(
      "file",
      fs.createReadStream(
        path.resolve(
          __dirname.replace(`\\helpers`, ``) + "/localDb/RedditMedia.mp4"
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

module.exports = Helpers;
