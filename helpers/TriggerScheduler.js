let Email = require("./Email");
let axios = require("axios").default;
let now = new Date(),
  today = 0,
  triggerFactor = 3,
  timeCaptured = [],
  currentPointer = 0,
  triggerHours = [],
  triggerMinutes = [];

function generateTimeTrigger() {
  if (currentPointer + triggerFactor > timeCaptured.length) generateHourArray();
  triggerHours = timeCaptured.slice(
    currentPointer,
    triggerFactor + currentPointer
  );
  triggerHours.sort(function (a, b) {
    return a - b;
  }); //ascending order sort
  triggerMinutes = [];
  for (i = 0; i < 3; i++)
    triggerMinutes.push(Math.floor(Math.random() * (59 - 10 + 1) + 10));
  // console.log("triggerHours",triggerHours,"triggerMinutes",triggerMinutes)
  currentPointer = currentPointer + triggerFactor;
}

function generateHourArray() {
  currentPointer = 0;
  timeCaptured = [];

  for (i = 1; i < 22; i++) timeCaptured.push(i);
  timeCaptured = shuffle(timeCaptured);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}

//=====================
generateTimeTrigger();
schedulePost();

setInterval(function () {
  ContinuePointer();
}, 3600000);

function schedulePost() {
  let skip = false;
  for (i = 0; i < triggerFactor; i++) {
    today = now.getDate();
    let millisTillTime =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        triggerHours[i],
        triggerMinutes[i],
        0,
        0
      ) - now;
    if (millisTillTime < 0) {
      skip = true;
      console.log(`Skipped Trigger`);
    } else
      console.log(
        `Set to make a post @
        ${triggerHours[i]}:${triggerMinutes[i]}
        `
      );
    if (!skip) setTimeout(makethisapost, millisTillTime);
  }
}

function ContinuePointer() {
  now = new Date();
  if (today !== now.getDate()) {
    today = now.getDate();
    let millisTillTime =
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 30, 0, 0) -
      now;
    if (millisTillTime < 0) {
      millisTillTime += 86400000;
    }
    console.log("CPMS", millisTillTime);
    setTimeout(generateTimeTrigger, millisTillTime);
    schedulePost();
  }
}

function makethisapost() {
  try {
    axios.post(`http://localhost:8080/api/findAndPostToIG/makepost`, {
      passCode: process.env.passCode,
    });
  } catch (e) {
    console.log("Error occured at calling makePost", e);
    Email.Mail(e);
  }
}

module.exports = function returnTriggerVal() {
  return { triggerHours: triggerHours, triggerMinutes: triggerMinutes };
};
