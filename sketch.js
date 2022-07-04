var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,520);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.4
}

function draw() {
  background(200);
  if (gameState === "play") {
  DoorCreate()
  if(keyDown("space")){
    ghost.velocityY = -10
   }
   if(keyDown("left_arrow")){
    ghost.x = ghost.x - 3;
  }
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 3;
  }
   ghost.velocityY = ghost.velocityY + 0.8

   if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
   }

  if(tower.y > 595){
      tower.y = 0
    }
    
  drawSprites()
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Fim de Jogo", 230,250)
  }
  }
}



function DoorCreate(){
  if(frameCount % 170 == 0){
    var door = createSprite(Math.round(random(100,400)),-55)
    var climber = createSprite(-55,-55)
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlockGroup.add(invisibleBlock);
    doorsGroup.add(door)
    door.addImage("door",doorImg)
    door.velocityY = 1;
    climbersGroup.add(climber)
    climber.addImage("climber",climberImg);
    climber.velocityY = 1;
    climber.x = door.x
    climber.y = door.y
    climber.y = climber.y + 55
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
  }
}
