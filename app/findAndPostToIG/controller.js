const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");
let returnTriggerVal = require("../../helpers/TriggerScheduler");
let Reddit = require("../../app/Reddit");
let Email = require("../../helpers/Email");
let config = require("../../config/Config");
const Helpers = require("../../helpers/Helpers");

let sessionId,
  subredditArray = config.Subreddits,
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

    let EligiblePost,
      accessToken,
      sessionIdIsValid = false,
      isPosted = false,
      hashtags;

    console.log("\n> Fetching sessionId...");

    //Fetch old seessionId
    sessionId = await fsp
      .readFile(
        path.resolve(
          __dirname.replace(`\\app\\findAndPostToIG`, ``) + "/localDb/sessionId"
        ),
        "utf8"
      )
      .catch((e) => {
        return "createNew";
      });

    hashtags = Helpers.generateHashTags();

    //Verify if old sessionId is still valid
    if (sessionId !== "null" && sessionId.length > 20)
      sessionIdIsValid = await Helpers.getTimeLineFeed(sessionId);

    if(sessionIdIsValid)
    console.log("\n> sessionId Verified");
    //Generate new sessionId if old sessionId is not valid or not found
    if (
      process.env.NODE_ENV.trim() === "PRODUCTION" &&
      (sessionId === "createNew" || !sessionIdIsValid)
    ) {
      console.log("\n> Regenerating sessionId...");
      sessionId = await Helpers.fetchSessionId();

      if (sessionId === "null") {
        throw "sessionId is halted for login";
      }
    }

    //Generate Post from Reddit
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

    console.log("\n> Got processed EligiblePost", EligiblePost);

    //Create Post
    if (process.env.NODE_ENV.trim() === "PRODUCTION") {
      isPosted = Helpers.createPost(sessionId, EligiblePost, hashtags);
      console.log(
        isPosted ? "\n> Content Posted!" : "\n> Post creation failed!"
      );
      return isPosted
        ? res.status(200).send("Post is up on IG!")
        : res.status(500).send("Failed to Post");
    } else return res.status(200).send("Please view console for debugging.");
  } catch (e) {
    if (e === 400)
      return res.status(400).send({
        error: "Bad Request",
        message: "Bad Request at findAndPostToIG",
      });
    else {
      Email.Mail(e);
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
      Email.Mail(e);
      console.log("Error at isPosted ", e);
      return res.status(500).send({ error: "Internal error", message: e });
    }
  }
};

findAndPostToIG.returnTriggerVal = async (req, res, next) => {
  try {
    let timeArray = [],
      TriggerVal = returnTriggerVal();
    console.log("TriggerVal", TriggerVal);
    if (process.env.passCode !== req.body.passCode) throw 400;
    if (
      TriggerVal.triggerHours.length > 0 &&
      TriggerVal.triggerMinutes.length > 0
    )
      for (let i = 0; i < 3; i++)
        timeArray.push(
          `${TriggerVal.triggerHours[i]}.${TriggerVal.triggerMinutes[i]}`
        );
    else timeArray = [0.0, 0.0, 0.0];

    res.status(200).send({ timeArray: timeArray });
  } catch (e) {
    if (e === 400)
      return res.status(400).send({
        error: "Bad Request",
        message: "Bad Request at returnTriggerVal",
      });
    else {
      console.log("Error at returnTruggerVal ", e);
      return res.status(500).send({ error: "Internal error", message: e });
    }
  }
};

findAndPostToIG.sendMail = async (req, res, next) => {
  try {
    if (process.env.passCode !== req.body.passCode) throw 400;
    console.log("Sending Mail");
    Email.Mail(null);

    return res.status(200).send("Email has been sent.");
  } catch (e) {
    if (e === 400)
      return res.status(400).send({
        error: "Bad Request",
        message: "Bad Request at isPosted",
      });
    else {
      console.log("Error at sendDebugMail", e);
      return res.status(500).send({ error: "Internal error", message: e });
    }
  }
};

module.exports = findAndPostToIG;
