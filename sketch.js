var hypnoticBall, database;
var position;
var cityImage1,hotairballonImage,hotairballonImage2,hotaieballonImage3
function preload(){

  cityImage1 = loadImage("images/cityImage.png");

  hotairballonImage = loadImage("images/hotairballoon1.png");

  hotairballonImage2 = loadImage("images/hotairballoon2.png");

  hotairballonImage3 = loadImage("images/hotairballoon3.png");

}
function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(1000,1000);

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "red";
  hypnoticBall.addImage(hotairballonImage)


  var hypnoticBallPosition = database.ref('car/position');
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background(cityImage1);
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
      hypnoticBall.addImage(hotairballonImage2)
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
      hypnoticBall.addImage(hotairballonImage3)
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-10);
      hypnoticBall.addImage(hotairballonImage2)
      hypnoticBall.scale = hypnoticBall.scale - 0.01;
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+10);
      hypnoticBall.addImage(hotairballonImage2)
      hypnoticBall.scale = hypnoticBall.scale + 0.01;
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('car/position').set({
    'x': hypnoticBall.x + x ,
    'y': hypnoticBall.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
