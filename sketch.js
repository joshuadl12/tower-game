var towerImg, tower;
var doorImg, door, doorsGroup, doorOneSpawned;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  doorOneSpawned = false
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  climbersGroup = createGroup()
  doorsGroup = createGroup()
  invisibleBlockGroup = createGroup()
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(200, 200, 50, 50)
  ghost.addImage("ghost", ghostImg)
  ghost.scale = .5
}

function draw() {
  background(200);

  if (gameState === "play") {
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0
    }
    if (invisibleBlockGroup.isTouching(ghost)) {
      gameState = "end"
    }
    if (tower.y > 400){
      tower.y = 300
    }
    if (keyDown("space")) {
      ghost.velocityY = -8;
    }
    if (keyDown("left")) {
      ghost.x -= 3
    }
    if (keyDown("right")) {
      ghost.x += 3
    }
    ghost.velocityY = ghost.velocityY+0.8
    
    drawSprites();
    spawnDoors();
  } else if (gameState === "end") {
    textSize(30)
    text("Game Over", 200, 300)
  }
}

function spawnDoors() {
  if (frameCount%240 === 0 || !doorOneSpawned) {
    if (!doorOneSpawned) doorOneSpawned = true;
    door = createSprite(200, -50);
    door.x = Math.round(random(120, 400))
    door.addImage("door", doorImg);
    door.velocityY = 1;
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    doorsGroup.add(door)

    climber = createSprite(200, 10)
    climber.addImage("climber", climberImg)
    climber.x = door.x
    climber.velocityY = 1;
    climbersGroup.add(climber)

    invisibleBlock = createSprite(200, 15)
    invisibleBlock.x = door.x
    invisibleBlock.velocityY = 1;
    invisibleBlock.visible = false;
    invisibleBlock.width = door.width
    invisibleBlock.height = 5
    invisibleBlockGroup.add(invisibleBlock)
  }
}