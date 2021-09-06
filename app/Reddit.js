const { default: axios } = require("axios");
const fs = require("fs");
const FFMPEG = require("../helpers/FFMPEG");

let Reddit = {},
  dateObj = new Date(),
  today = dateObj.getDate(),
  localDbPath = `${__dirname.replace(`//app`, ``)}\\localDb\\LocalDb.json`;
console.log(
  "path at heroku -",
  `${__dirname} <== and path ==> \\localDb\\LocalDb.json`
);
Reddit.GenerateAccessToken = async function () {
  try {
    let url,
      headers,
      basicAuth,
      accessToken,
      payload = new URLSearchParams();

    if (process.env.ClientId && process.env.ClientSecret)
      basicAuth = Buffer.from(
        `${process.env.ClientId}:${process.env.ClientSecret}`
      ).toString("base64");
    else throw "Invalid Id Or Secret";

    headers = {
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    url = `https://www.reddit.com/api/v1/access_token`;

    payload.append(`grant_type`, `password`);
    payload.append(`username`, process.env.RedditUsername);
    payload.append(`password`, process.env.RedditPassword);
    accessToken = await axios.post(url, payload, headers);

    if (
      accessToken.status === 200 &&
      accessToken.data &&
      accessToken.data.access_token
    )
      accessToken = accessToken.data.access_token;
    else throw "Failure at fetching AccessToken";
    return { accessToken: accessToken };
  } catch (e) {
    console.log("Error occured at GenerateAccessToken", e);
    return { error: e, message: `Error occured at GenerateAccessToken` };
  }
};

Reddit.fetchPostFromSubReddit = async function (accessToken, subredditArray) {
  let url,
    fetchedLocalDb,
    newTitle,
    newScore,
    skip,
    fileExtension,
    redditPosts,
    postDataArray = [],
    eligiblePost = null;

  try {
    headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    subredditArray = shuffleSubredditArray(subredditArray);
    //Fetch already posted data from LocalDb
    fetchedLocalDb = JSON.parse(fs.readFileSync(localDbPath, "utf8"));

    for (let subreddit of subredditArray) {
      url = `https://oauth.reddit.com/r/${subreddit}/top.json?count=50`;
      redditPosts = await axios.get(url, headers).catch((e) => {
        skip = true;
      });
      if (skip) {
        skip = false;
        continue;
      }
      if (redditPosts.status !== 200) throw redditPosts.data || redditPosts;

      redditPosts = redditPosts.data.data.children;
      for (let post of redditPosts) {
        post = post.data;
        if (
          post.crosspost_parent_list &&
          post.crosspost_parent_list.length > 0
        ) {
          newTitle = post.title;
          newScore = post.score;
          post = post.crosspost_parent_list[0];
          post.title = newTitle;
          post.score = newScore;
        }

        switch (subreddit) {
          case "whatcouldgowrong":
            post.title = post.title.replace("WCGW", "What could go wrong");
            break;
          case "holdmybeer":
            post.title = post.title.replace("HMB", "Hold my beer");
            break;
        }

        if (fetchedLocalDb.date === today)
          for (let item of fetchedLocalDb.postDataArray) {
            if (item.postTitle === post.title) {
              skip = true;
              break;
            }
          }

        if (skip) {
          skip = false;
          continue;
        }

        fileExtension = post.url.slice(post.url.length - 4);

        if (
          (!post.stickied &&
            !post.over_18 &&
            !post.removed_by_category &&
            post.score > 1350 &&
            fileExtension === `.gif`) ||
          fileExtension === `gifv` ||
          (post.is_video === true && post.media.reddit_video.duration <= 60)
        ) {
          if (fileExtension === `gifv`) {
            post.url = post.url.replace(".gifv", ".mp4");
            await FFMPEG.combineAudioVideo(post.url);
          }

          if (post.is_video) {
            post.url = post.media.reddit_video.fallback_url.split("?")[0];
            await FFMPEG.combineAudioVideo(post.url);
          } else if (fileExtension === `.gif`) {
            await FFMPEG.GIFtoVideo(post.url);
          }

          if (post.url && post.url.error) throw post.url.error;
          // console.log("post.url=", post.is_video, post.url);
          eligiblePost = { title: post.title, file: post.url };
          //  console.log("PostThis", eligiblePost);

          postDataArray.push({
            postTitle: post.title,
            postLink: `https://www.reddit.com${post.permalink}`,
            postFile: post.url,
          });
          break;
        } else console.log("Invalid post");
      }

      if (eligiblePost) {
        // console.log("Found eligiblePost", eligiblePost);
        break;
      }
    }

    if (!eligiblePost) throw "No suitable posts found";

    if (fetchedLocalDb.date === today) {
      postDataArray = fetchedLocalDb.postDataArray.concat(postDataArray);
    }

    fs.writeFileSync(
      localDbPath,
      JSON.stringify({
        date: today,
        postDataArray: postDataArray,
      }),
      "utf8"
    );

    return eligiblePost;
  } catch (e) {
    console.log("Error occured at fetchpostFromSubreddit", e);
    return { error: e, message: "Error occured at fetchpostFromSubreddit" };
  }
};

function shuffleSubredditArray(array) {
  let m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

module.exports = Reddit;
