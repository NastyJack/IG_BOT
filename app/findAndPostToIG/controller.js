const fs = require("fs");
let { IG_Script } = require("../../app/IG_Script");
let Reddit = require("../../app/Reddit");
let config = require("../../config/Config");
let subredditArray = config.Subreddits,
  isLoggedIn = false,
  fetchedLocalDb,
  findAndPostToIG = {},
  localDbPath =
    process.platform === "win32"
      ? `${__dirname.replace(
          `app\\findAndPostToIG`,
          ``
        )}\\localDb\\LocalDb.json`
      : `${__dirname.replace(`/app/findAndPostToIG`, ``)}/localDb/LocalDb.json`;

findAndPostToIG.makePost = async (req, res, next) => {
  try {
    if (process.env.passCode !== req.body.passCode) throw 400;

    if (!isLoggedIn && process.env.NODE_ENV.trim() === "PRODUCTION") {
      await IG_Script.performLogin();
      isLoggedIn = true;
    }

    let EligiblePost, accessToken;

    accessToken = await Reddit.GenerateAccessToken();
    if (accessToken.error) throw accessToken;

    EligiblePost = await Reddit.fetchPostFromSubReddit(
      accessToken.accessToken,
      subredditArray
    );

    if (accessToken.error) throw accessToken;
    if (EligiblePost.error && EligiblePost.message)
      if (EligiblePost.error === `No suitable posts found`)
        throw EligiblePost.error;
      else throw `Unexpected error EligiblePost: ${EligiblePost}`;

    console.log("Got processed EligiblePost", EligiblePost);

    if (process.env.NODE_ENV.trim() === "PRODUCTION") {
      await IG_Script.performUpload(EligiblePost);

      res.status(200).send("Post is up on IG!");
    } else return res.status(200).send("Please view console for debugging.");
  } catch (e) {
    if (e === 400)
      return res.status(400).send({
        error: "Bad Request",
        message: "Bad Request at findAndPostToIG",
      });
    else {
      console.log("Error at making IG post ", e);
      return res.status(500).send({ error: "Internal error", message: e });
    }
  }
};

findAndPostToIG.viewDb = async (req, res, next) => {
  try {
    if (process.env.passCode !== req.body.passCode) throw 400;
    fetchedLocalDb = JSON.parse(fs.readFileSync(localDbPath, "utf8"));
    res.status(200).send({ LocalDb: fetchedLocalDb });
  } catch (e) {
    if (e === 400)
      return res.status(400).send({
        error: "Bad Request",
        message: "Bad Request at viewDb",
      });
    else {
      console.log("Error at clearing viewDb ", e);
      return res.status(500).send({ error: "Internal error", message: e });
    }
  }
};

findAndPostToIG.clearLocalDb = async (req, res, next) => {
  try {
    if (process.env.passCode !== req.body.passCode) throw 400;

    let dateObj = new Date(),
      today = dateObj.getDate();
    fetchedLocalDb = JSON.parse(fs.readFileSync(localDbPath, "utf8"));
    console.log("Before wipe : ", fetchedLocalDb);

    fs.writeFileSync(
      localDbPath,
      JSON.stringify({
        date: today - 1,
        postDataArray: [],
      }),
      "utf8"
    );

    fetchedLocalDb = JSON.parse(fs.readFileSync(localDbPath, "utf8"));
    console.log("After wipe : ", fetchedLocalDb);
    res.status(200).send("LocalDb wiped successfully!");
  } catch (e) {
    if (e === 400)
      return res.status(400).send({
        error: "Bad Request",
        message: "Bad Request at clearing localDb",
      });
    else {
      console.log("Error at clearing localDb ", e);
      return res.status(500).send({ error: "Internal error", message: e });
    }
  }
};

findAndPostToIG.isPosted = async (req, res, next) => {
  try {
    let foundPostFile;
    if (process.env.passCode !== req.body.passCode) throw 400;

    fetchedLocalDb = JSON.parse(fs.readFileSync(localDbPath, "utf8"));
    for (postFile of fetchedLocalDb.postDataArray.postFile) {
      console.log("Array item=", postFile);
      if (postFile.includes(req.body.postFile)) {
        foundPostFile = true;
        break;
      }
    }

    if (foundPostFile) res.status(200).send("Post is up and ready!");
    else res.status(500).send("Failed to find post in localDb");
  } catch (e) {
    if (e === 400)
      return res.status(400).send({
        error: "Bad Request",
        message: "Bad Request at isPosted",
      });
    else {
      console.log("Error at isPosted ", e);
      return res.status(500).send({ error: "Internal error", message: e });
    }
  }
};

findAndPostToIG.setPuppeteerContext = async () => {
  await IG_Script.performSetup();
};

module.exports = findAndPostToIG;
