var ball,db;
var pos;

function setup(){
     //which Database
     db=firebase.database();
     
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    
    //read the position of the ball from database
    var ballPos = db.ref('ball/position');
    ballPos.on("value",readPosition,showError);

}

function draw(){
    background("white");
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
   db.ref('ball/position').set({
       'x':pos.x+x,
       'y':pos.y+y


   })
}
// .ref ; -> refer the location of DB
// .on  : -> read from the database, keep listning the changes of the values in DB
// .set():-> to set the value in DB,writing in Db

function readPosition(data){
    pos = data.val();
    ball.x = pos.x;
    ball.y = pos.y;
}

function showError(){
console.log("Error");
}