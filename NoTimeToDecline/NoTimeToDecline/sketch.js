///////////////////////////////////////////////////DISPLAY SKETCH FOR CABOT////////////
let w, h; //width
let cw, ch;   //column width/height
let rw, rh;   //row width/height
let numCols = 5;
let numRows = 5;
let d;
let b;
let inputBox, subButton, question, skipButton;
var fade;
var fadeAmount = 1
let gridArr = [];
let p;
let qArr =[];
let randQ;
let fadedPiece;
let called;
let dataServer;
let pubKey = 'pub-c-160faaa8-8907-4de0-9e35-d3242da8c024';
let subKey = 'sub-c-1dcde6a8-6089-11ea-9c0b-5aef0d0da10f';
let counter = 0;
let counterArr = [];
let cnv;
let puzBG;
let exp;
let restartBtn;


let channelName = "Answers";

let incomingText = ""; //variable that will hold the incoming pubnub data

//////////////////////////////PRELOAD////////////////////////////////////
function preload() {
  img = loadImage('testPic.jpg');
  puzBG = loadImage('matrix.jpg');
  // questions = loadJSON("loadJSON.php");
  table = loadTable('questions.csv','csv','header');
}
//////////////////////////////SETUP////////////////////////////////////


function setup() {
//   var myCanvas = createCanvas(windowWidth/1.5, windowHeight);
    cnv = createCanvas(windowWidth/2, windowHeight);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
  
  
  
    exp = createElement('h1', 'EXPOSED');
    exp.position(width/2,height/2);    
    exp.hide();
    
    restartBtn = createButton('RESTART')
    restartBtn.position(width/2,exp.y+150)
    restartBtn.mousePressed(restart);
    restartBtn.hide();
  
  for (let i = 0; i < 25; i++){
      counterArr.push(i);
  }
  console.log(counterArr);


////////////////// initialize pubnub
  dataServer = new PubNub(
  {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });

  //attach callbacks to the pubnub object to handle messages and connections
  dataServer.addListener({ message: readIncoming });
  dataServer.subscribe({channels: [channelName]});
///////////////

  fade = 255;
  boxes();
 
}
//////////////////////////////^^END SETUP^^////////////////////////////////////
function exposed(){
    if (counter == 25){
        gridArr = [];
        exp.show();
        restartBtn.show();
        // restart();
    }
}
function restart(){
    counter = 0;
    fade = 255;
    boxes();
    exp.hide();
    restartBtn.hide();
    incomingText = '';
    
}
/////////array shuffle////
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}




///retrieve data from pubnub

function readIncoming(inMessage) //when new data comes in it triggers this function,
{                              

  //  error check to match the incoming to the channelName
  if(inMessage.channel == channelName)
  {

    incomingText = "SAYS: "+inMessage.message.messageText;     //extracting message from JSON
    console.log('RECIEVED DATA', incomingText);
    console.log(inMessage);
    }

}





//////////////////////////////REVEAL SQUARE////////////////////////////////////


function reveal(){


  called = false;

  if(incomingText && gridArr){
      

    let r = counterArr[counter];
    fadedPiece = r;
    incomingText = '';
    counter++;

  }
  if(!called) {
    called = true;
  }
}

//////////////////////////////DRAW////////////////////////////////////


function draw() {
  image(img, 0, 0,cnv.width,cnv.height);
   
  for(let i = 0; i < gridArr.length; i++){
    gridArr[i].display();
  }
  if(incomingText){
      called == true;
      reveal();
  }

  if (called == true && gridArr.length > 2){      
    if (gridArr[fadedPiece].fade>1){    
      fadeAmount=-40;
      gridArr[fadedPiece].fade += fadeAmount;    //fades puzzle piece


    }
    if(gridArr[fadedPiece].fade == 0){     
      gridArr.splice(fadedPiece,1);      //removes selected piece from array
      called = false;
      console.log('not called');
    }
  }
    
    exposed();
    console.log(counter);
}



function boxes(){       //create portrait grid
  cw = width / numCols;
  ch = height;
  rw = width;
  rh = cnv.height / numRows;
  for (cn = 0; cn < numCols; cn++) {
    for (rn = 0; rn < numRows; rn++) {
      let x = cn * cw;
      let y = rn * rh;
      p = new Piece(x,y,cw,rh,fade)

      gridArr.push(p);
      

    }
  }
  
 for (let i = 24; i > 0; i--){      //shuffles array of squares to randomise which piece is removed
  const j = Math.floor(Math.random() * i)
  const temp = counterArr[i]
  counterArr[i] = counterArr[j]
  counterArr[j] = temp;    
 }
   console.log(counterArr);

}

//////////////////////////////CLASS FOR GRID////////////////////////////////////


class Piece {               //piece class constructor with fade value 
  constructor(_x, _y, cw, rh, fade) {
    this.x = _x;
    this.y = _y;
    this.cw = cw;
    this.rh = rh;
    this.fade = fade;
  }

  

  display() {
    let clr = color('rgba(54, 54, 54,this.fade)');
    strokeWeight(10);
    stroke(54,54,54, this.fade);

    fill(0, 153, 51, this.fade);
    rect(this.x, this.y, this.cw, this.rh);

      }
}
