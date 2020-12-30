
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score1=0
var survivaltime=0
var gameState="PLAY"

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
 monkey. scale=0.1;
  
  
  ground=createSprite(400,350,900,10);
  
   obstaclesGroup = createGroup();
  FoodGroup = createGroup();
  
  

  
}


function draw() {
  background(220);
  if (gameState==="PLAY"){
  text ("SCORE :"+score1,300,50);
    //jump when the space key is pressed
    if(keyDown("space")&&monkey.y >= 300) {
        monkey.velocityY = -12;
       
    }
    monkey.velocityY =monkey.velocityY + 0.5
  monkey.collide(ground);
      food();
  score();
  obstacles();
  survival();
  }
  if (monkey.isTouching(obstaclesGroup)){
   gameState="END"; 
    
  }
  if(gameState==="END"){
     obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();
    monkey.velocityX=0;
    text("GAME OVER",200,200);
     
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
   monkey.collide(ground);
  }
  
drawSprites();  
}
function food(){
  if(frameCount%300===0){
  banana=  createSprite(600,200,10,10);
  banana.y = Math.round(random(120,220)); 
  banana.velocityX=-4;
  banana.addImage(bananaImage)  ;
    banana.scale=0.1;
    FoodGroup.add(banana);
  }
  
}
function survival(){
  survivaltime=Math.ceil(frameCount/frameRate());
  text("SURVIVAL TIME:"+survivaltime,100,50);
  
}
function obstacles(){
  if (frameCount%100===0){
    obstacle=createSprite(600,330,10,10);
    obstacle.velocityX=-4;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstaclesGroup.add(obstacle);
  }
}
function score(){
  if (monkey.isTouching(FoodGroup)){
     score1=score1+1
    FoodGroup.destroyEach();
  }
}





