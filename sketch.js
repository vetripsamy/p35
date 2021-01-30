var ball;
var database,position;
var bg,balloon;
function preload(){
  bg=loadImage("a.png");
  balloon=loadImage("b.png");
}

function setup(){
    //connecting with database
    database=firebase.database();
    createCanvas(displayWidth-50,displayHeight-200);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    ball.addImage("b",balloon);
    //establishing reference to the location(ball/position)
    var ballposition=database.ref('ball/position');
    //creating a listener using on()function which will keep track of all the changes \
    //if there is any change in database, readPosition function will be called
    //if it is not able to read the position, showError function will be called
    ballposition.on("value", readPosition, showError);
}

function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
 database.ref('ball/position').set({
     'x':position.x+x,
     'y':position.y+y
 })  
}

function readPosition(data){
    position=data.val(); //storing the values of data inside position
    ball.x=position.x;
    ball.y=position.y;
}

function showError(){
    console.log("error");
}
