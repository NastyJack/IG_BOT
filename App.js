require("dotenv").config({ path: "credentials.env" });
const express = require("express");
const app = express();
const config = require("./config/Config");
const FFMPEG = require("./helpers/FFMPEG");
const findAndPostToIG = require("./app/findAndPostToIG/routes");
const { json } = require("express");
let IGCreatorStudio = require("./app/IGCreatorStudio");
const fs = require("fs");
let fetchedLocalDb,
  localDbPath =
    process.platform === "win32"
      ? `${__dirname.replace(`app\\`, ``)}\\localDb\\LocalDb.json`
      : `${__dirname.replace(`/app`, ``)}/localDb/LocalDb.json`;

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/findAndPostToIG", findAndPostToIG);

app.get("/api/RedditMedia", function (req, res) {
  const file = `${__dirname.replace(`app`, "")}/localDb/RedditMedia.mp4`;
  res.sendFile(file);
});

app.get("/api/RedditMediaTitle", function (req, res) {
  const file = `${__dirname.replace(`app`, "")}/localDb/RedditMedia.mp4`;

  fetchedLocalDb = JSON.parse(fs.readFileSync(localDbPath, "utf8"));
  res.send(
    fetchedLocalDb.postDataArray[fetchedLocalDb.postDataArray.length - 1]
      .postTitle
  );
});

app.get("/", function (req, res) {
  res.send("Hi there!");
});

app.listen(process.env.PORT, () => {
  console.log(
    `\n\n IG_BOT is listening at port ${process.env.PORT} @ ${process.env.NODE_ENV}`
  );
});

module.exports = app;
