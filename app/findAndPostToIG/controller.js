let { CreatorStudio } = require("../../app/IGCreatorStudio");
let Reddit = require("../../app/Reddit");
let config = require("../../config/Config");
let Helpers = require("../../helpers/Helpers");

let sessionId,
  subredditArray = config.Subreddits,
  findAndPostToIG = {};

findAndPostToIG.makePost = async (req, res, next) => {
  try {
    if (process.env.passCode !== req.body.passCode) throw 400;

    let EligiblePost, accessToken;

    if (!sessionId) await fetchSessionId();

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

    sessionId = await Helpers.fetchSessionId();
    if (sessionId.error) throw sessionId.error;

    return res.status(200).send("IG Post made succesfully!");
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
