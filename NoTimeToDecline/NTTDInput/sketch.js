            ////////////////////////INPUT SKETCH/////////////
let inputBox, subButton, question, skipButton;
var fade;
var fadeAmount = 1
let qArr =[];
let randQ;
let fadedPiece;
let called;
let dataServer;
let pubKey = 'pub-c-160faaa8-8907-4de0-9e35-d3242da8c024';
let subKey = 'sub-c-1dcde6a8-6089-11ea-9c0b-5aef0d0da10f';
let qHTML;
let channelName = "Answers";

let incomingText = ""; //variable that will hold the incoming message text
//////////////////////////////PRELOAD////////////////////////////////////
function preload() {
    //load questions
  table = loadTable('questions.csv','csv','header');
}

//////////////////////////////SETUP////////////////////////////////////


function setup() {

  cnv = createCanvas(windowWidth, windowHeight/1.5); 
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);       /////center the vanvas

  for (let r = 0; r < table.getRowCount(); r++){    ///pull in Questions from CSV (goes through every row/column)
   for (let c = 0; c < table.getColumnCount(); c++) {
     qArr.push(table.getString(r,c));
   }
  }         


  randomQuestion();     //call random question
 



  dataServer = new PubNub(          ////////////////// initialize pubnub
  {
    publish_key   : pubKey, 
    subscribe_key : subKey,
    ssl: true  //enables a secure connection. 
  });


  inputBox = createInput('');       ///Input box
  inputBox.position(width/2 - inputBox.width/2 , height/2);
  

  subButton = createButton('submit');   //submit button
  subButton.position(width/2 - subButton.width/2, inputBox.y + 50);
  subButton.mousePressed(reveal);

  skipButton = createButton('skip');    //skipButton
  skipButton.position(width/2 - skipButton.width/2, inputBox.y + 100);
  skipButton.mousePressed(skip);

}
//////////////////////////////^^END SETUP^^////////////////////////////////////


/////send data to pubnub
function sendTheMessage() {


  // Send Data to the server to draw it on other screen
  dataServer.publish(
    {
      channel: channelName,
      message:
      {
        messageText: inputBox.value()       //get the value from the text box and send it as part of the message
      }
    });

}

function exposed(){
    if (counter == 24){
        
    }
}


function randomQuestion(){          //selects a random question from csv
  qHTML = select('#qHTML');
  randQ = int(random(0,50));
  let que = qArr[randQ];
  qHTML.elt.innerHTML = que;

}

function reveal(){
  if(inputBox.value().length >= 1){     //sends data and loads next question if answer is longer than 1 character
    randomQuestion();
    sendTheMessage();
  }
}

function skip(){        //skip question
    randomQuestion();
}

//////////////////////////////DRAW////////////////////////////////////


function draw() {
background(208, 240, 206);
}



