require("dotenv").config({ path: "credentials.env" });
const express = require("express");
const app = express();
const findAndPostToIG = require("./app/findAndPostToIG/routes");
const findAndPostToIGController = require("./app/findAndPostToIG/controller");
const fs = require("fs");
const axios = require('axios').default;
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
  fetchedLocalDb = JSON.parse(fs.readFileSync(localDbPath, "utf8"));
  res.send(
    fetchedLocalDb.postDataArray[fetchedLocalDb.postDataArray.length - 1]
      .postTitle
  );
});

app.get("/", function (req, res) {
  res.send("Hi there!");
});

app.listen(process.env.PORT, async () => {
  try {
    console.log("\n\n Preparing bot, please wait...");
    //await findAndPostToIGController.setPuppeteerContext();

   //60000
    console.log(
      `\n IG_BOT is listening at port ${process.env.PORT} @ ${process.env.NODE_ENV}`
    );
  } catch (e) {
    console.log("\n ERROR: Failed to login and set up puppeteer",e);
  }
});



let now= new Date(),today=now.getDate(),triggerFactor=3,timeCaptured=[],currentPointer=0,triggerHours=[],triggerMinutes=[],postIndex=0;

function generateTimeTrigger(){

  
  if(currentPointer+triggerFactor>timeCaptured.length)
  generateHourArray()

  triggerHours=timeCaptured.slice(currentPointer,triggerFactor+currentPointer)
  triggerHours.sort(function (a, b) {  return a - b;  }) //ascending order sort
  
 
  triggerMinutes=[]
  for(i=0;i<3;i++)
  triggerMinutes.push(Math.floor(Math.random() * (59 - 0 + 1) + 0))
  postIndex=0

 // console.log("triggerHours",triggerHours,"triggerMinutes",triggerMinutes)
  currentPointer=currentPointer+triggerFactor  
 }
 


function generateHourArray(){
 currentPointer=0;
 timeCaptured=[];


 for(i=1;i<22;i++)
 timeCaptured.push(i)
 timeCaptured=shuffle(timeCaptured)


 function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
  
   // Pick a remaining element...
   randomIndex = Math.floor(Math.random() * currentIndex);
   currentIndex--;
  
   // And swap it with the current element.
   [array[currentIndex], array[randomIndex]] = [
     array[randomIndex], array[currentIndex]];
  }
  
  return array;
  }

}


// setInterval(function() {
//   generateTimeTrigger()
//   // your code goes here...
// }, 60 * 100); // 60 * 1000 milsec




//=====================
generateTimeTrigger()
schedulePost()

setInterval(function() {  
  ContinuePointer();
  // your code goes here...
}, 3600000 ); // one hour polling


function schedulePost(){
  let skip=false;
  for(i=0;i<triggerFactor;i++){
  today = now.getDate()
  let millisTillTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), triggerHours[i], triggerMinutes[i], 0, 0) - now;
  if (millisTillTime < 0) {
    skip=true
    console.log("Skipped Trigger")
  } else console.log(`Set to make a post at ${triggerHours[i]}:${triggerMinutes[i]}`)
  if(!skip) setTimeout(makethisapost, millisTillTime);
  }

}


function ContinuePointer(){
now = new Date();
if(today!==now.getDate()){
today = now.getDate()
let millisTillTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 30, 0, 0) - now;
if (millisTillTime < 0) {
  millisTillTime += 86400000; 
}
console.log("CPMS",millisTillTime)
setTimeout(generateTimeTrigger, millisTillTime);
schedulePost();
}}


function makethisapost(){
    //axios.post(`http://localhost:8080/api/findAndPostToIG/makepost`,{passcode:process.env.passCode})
 
  let currentdate = new Date(); 
  let datetime = "I posted at" + currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear() + " @ "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();
  console.log("dateTime!!!",datetime)     
}

module.exports = app;
