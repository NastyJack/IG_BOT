const nodemailer = require("nodemailer");
const fs = require("fs");
let transport = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PWD,
  },
});

function setEmailPayload(error, sub) {
  return (mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: process.env.EMAIL_RECIPIENT,
    subject: "IG_BOT",
    text: "",
    html:
      "<span> " +
      (error ? error : "No Errors") +
      " - " +
      (sub ? sub : "") +
      "</span>",
  });
}
module.exports = {
  Mail: function (error, sub = null) {
    let mailOptions = setEmailPayload(error, sub);
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("E-Mail sent: ", info.messageId);
    });
  },
};
