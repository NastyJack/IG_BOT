require("dotenv").config({ path: "credentials.env" });
const express = require("express");
const app = express();
const config = require("./config/Config");
const FFMPEG = require("./helpers/FFMPEG");
const findAndPostToIG = require("./app/findAndPostToIG/routes");
const { json } = require("express");

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/findAndPostToIG", findAndPostToIG);

app.get("/RedditMedia", function (req, res) {
  const file = `${__dirname.replace(`app`, "")}/localDb/RedditMedia.mp4`;
  res.sendFile(file);
});

app.listen(process.env.PORT, () => {
  console.log(
    `\n\n IG_BOT is listening at port ${process.env.PORT} @ ${process.env.NODE_ENV}`
  );
});

module.exports = app;
