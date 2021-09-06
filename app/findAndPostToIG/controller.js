let { CreatorStudio } = require("../../app/IGCreatorStudio");
let Reddit = require("../../app/Reddit");
let config = require("../../config/Config");
let subredditArray = config.Subreddits,
  findAndPostToIG = {};

findAndPostToIG.makePost = async (req, res, next) => {
  try {
    console.log(
      "path at heroku -",
      `${__dirname.replace(`/app`, ``)}/localDb/LocalDb.json`
    );

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

module.exports = findAndPostToIG;
