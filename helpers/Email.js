const nodemailer = require("nodemailer");
const fs = require("fs");
let screenshotPath =
    process.platform === "win32"
      ? `${__dirname.replace(`\\helpers`, ``)}\\screenshots\\Error.png`
      : `${__dirname.replace(`/helpers`, ``)}/screenshots/Error.png`,
  transport = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PWD,
    },
  });

function setEmailPayload(error) {
  return (mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: process.env.EMAIL_RECIPIENT,
    subject: "IG_BOT Screenshot",
    text: "",
    html: "<span> " + (error ? error : "No Errors") + "</span>",
    attachments: [
      {
        // stream as an attachment
        filename: "Error.png",
        content: fs.createReadStream(screenshotPath),
      },
    ],
  });
}
module.exports = {
  Mail: function (error) {
    let mailOptions = setEmailPayload(error);
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("E-Mail sent: ", info.messageId);
    });
  },
};
