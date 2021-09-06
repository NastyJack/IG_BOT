const fs = require("fs");
let { CreatorStudio } = require("../../app/IGCreatorStudio");
let Reddit = require("../../app/Reddit");
let config = require("../../config/Config");
let subredditArray = config.Subreddits,
  findAndPostToIG = {},
  localDbPath = process.env.ON_HEROKU
    ? `${__dirname.replace(`/app/findAndPostToIG`, ``)}/localDb/LocalDb.json`
    : `${__dirname.replace(`app\\findAndPostToIG`, ``)}\\localDb\\LocalDb.json`;

findAndPostToIG.makePost = async (req, res, next) => {
  try {
    if (process.env.passCode !== req.body.passCode) throw 400;

    let EligiblePost, accessToken;

    accessToken = await Reddit.GenerateAccessToken();
    if (accessToken.error) throw accessToken;

    EligiblePost = await Reddit.fetchPostFromSubReddit(
      accessToken.accessToken,
      subredditArray
    );

    if (EligiblePost.error && EligiblePost.message)
      if (EligiblePost.error === `No suitable posts found`)
        throw EligiblePost.error;
      else throw `Unexpected error EligiblePost: ${EligiblePost}`;

    console.log("Got processed EligiblePost", EligiblePost);

    if (process.env.NODE_ENV === "PRODUCTION") {
      await CreatorStudio.RunScript(EligiblePost);

      return res.status(200).send("IG Post made succesfully!");
    } else return res.status(200).send("Reddit post filtered succesfully!");
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

findAndPostToIG.clearLocalDb = async (req, res, next) => {
  try {
    console.log("heroku path ", `${__dirname} <and> /localDb/LocalDb.json`);

    if (process.env.passCode !== req.body.passCode) throw 400;

    let fetchedLocalDb,
      dateObj = new Date(),
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
        message: "Bad Request at findAndPostToIG",
      });
    else {
      console.log("Error at clearing localDb ", e);
      return res.status(500).send({ error: "Internal error", message: e });
    }
  }
};

module.exports = findAndPostToIG;
