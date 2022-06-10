let fs = require("fs");
let axios = require("axios").default;
let Email = require("./Email");
let now = new Date(),
  today = 0,
  defaultTriggerFactor = 3,
  triggerFactor = defaultTriggerFactor,
  timeCaptured = [],
  currentPointer = 0,
  triggerHours = [],
  triggerMinutes = [],
  isTodaysFirstRun = true,
  maxMin = 59,
  minMin = 10,
  fetchedLocalDb,
  localDbPath =
    process.platform === "win32"
      ? `${__dirname.replace(`helpers`, ``)}\\localDb\\LocalDb.json`
      : `${__dirname.replace(`/helpers`, ``)}/localDb/LocalDb.json`;

function generateTimeTrigger() {
  //This section restricts posts to limit of triggerfactor.
  //Comment this snippet to allow unlimited posts.
    fetchedLocalDb = JSON.parse(fs.readFileSync(localDbPath, "utf8")); 
if (isTodaysFirstRun&&fetchedLocalDb.date===now.getDate()) {
    triggerFactor = triggerFactor - fetchedLocalDb.postDataArray.length;
    if (triggerFactor < 0) triggerFactor = 0;
  } else triggerFactor = defaultTriggerFactor;

  //continue iterating over the hour for the day as usual, this goes through when script runtime has surpassed midnight.
  if (currentPointer + triggerFactor > timeCaptured.length || isTodaysFirstRun)
    generateHourArray();

  triggerHours = timeCaptured.slice(
    currentPointer,
    triggerFactor + currentPointer
  );
  triggerHours.sort(function (a, b) {
    return a - b;
  }); //ascending order sort
  triggerMinutes = [];

  for (let i = 0; i < triggerFactor; i++) {
    if (isTodaysFirstRun && now.getMinutes() > 10 && now.getMinutes() <= 52) {
      minMin = now.getMinutes() + 5;
      isTodaysFirstRun = false;
    } else minMin = 10;
    triggerMinutes.push(
      Math.floor(Math.random() * (maxMin - minMin + 1) + minMin)
    );
  }
  // console.log("triggerHours",triggerHours,"triggerMinutes",triggerMinutes,triggerFactor)
  currentPointer = currentPointer + triggerFactor;
}

function generateHourArray() {
  let i;
  currentPointer = 0;
  timeCaptured = [];
  //Start trigger hours from current hour ex 05:00 PM till midnight. Otherwise start from 00:00 AM
  if (isTodaysFirstRun && now.getHours() <= 22) {
    i = now.getHours();
  } else i = 0;

  for (; i <= 22; i++) timeCaptured.push(i);
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
//This section is responsible for starting and infinitely running the script.

if(isTodaysFirstRun&&now.getHours>=23&&now.getMinutes()>=5){
let tempMillisTillTime =new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 0, 05, 0, 0) - new Date()
    console.log("CPMS 00:05",tempMillisTillTime);
    setTimeout(generateTimeTrigger, tempMillisTillTime);
    schedulePost();
}
else{
generateTimeTrigger();
schedulePost();
}
//Call this function every hour to check if current date != today. Setup new triggers if condition is true.
setInterval(function () {
  ContinuePointer();
}, 3600000);
//=====================

function schedulePost() {
  let skip = false;
  for (let i = 0; i < triggerFactor; i++) {
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
    if (millisTillTime < 0 || !triggerHours[i]) {
      skip = true;
      console.log(`Skipped Trigger, `, triggerHours[i], ":", triggerMinutes[i]);
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
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 05, 0, 0) -
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
