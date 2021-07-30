var trex ,trex_running;
var ground;
var invisibleGround;
var cloud;
var cloudSprite;
var cloudY;
var cloudGroup;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var obstacle1Sprite, obstacle2Sprite, obstacle3Sprite, obstacle4Sprite, obstacle5Sprite, obstacle6Sprite;
var obstacleSpriteNumber;
var obstacle;
var score = 0;
var scoreDivider = 2.5;
var gameState = "play";
var obstacleGroup;
var gameOverPNG;
var gameOverSprite;
var trexCollidedPNG;
var restartPNG;
var restartSprite;
var checkpointSound;
var dieSound;
var jumpSound;
var scoreIncrement=0;
var velocityDivider = 10;

function preload()
{
  trex_running = loadAnimation("trex1.png", "trex2.png", "trex3.png");
  ground = loadImage("ground2.png");
  cloud = loadImage("cloud.png");
  obstacle1Sprite = loadImage("obstacle1.png");
  obstacle2Sprite = loadImage("obstacle2.png");
  obstacle3Sprite = loadImage("obstacle3.png");
  obstacle4Sprite = loadImage("obstacle4.png");
  obstacle5Sprite = loadImage("obstacle5.png");
  obstacle6Sprite = loadImage("obstacle6.png");
  gameOverPNG = loadImage("gameOver.png");
  trexCollidedPNG = loadAnimation("trex_collided.png");
  restartPNG = loadImage("restart.png");
  checkpointSound = loadSound("checkpoint.mp3");
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
}

function setup()
{
  createCanvas(600,200)
  //create a trex sprite
  trex = createSprite(50, 150, 100, 100);
  trex.addAnimation("hello", trex_running);
  trex.scale = (0.5);
  trex.addAnimation("hello1", trexCollidedPNG);
  ground1 = createSprite(300, 180, 100, 100);
  ground1.addImage("hello", ground);
  invisibleGround = createSprite(50, 190, 100, 5);
  invisibleGround.visible = false;
  cloudGroup = createGroup();
  obstacleGroup = createGroup();
  restartSprite = createSprite(300, 115, 100, 100);
  restartSprite.addImage("test", restartPNG);
  restartSprite.scale = 0.5;
  restartSprite.visible = false;
  gameOverSprite = createSprite(300, 90, 100, 100);
  gameOverSprite.scale = 0.5;
  gameOverSprite.addImage("test", gameOverPNG);
  gameOverSprite.visible = false;
}
function draw()
{
  background("white");
  drawSprites();
  text(mouseX +","+ mouseY, mouseX, mouseY);
  if (gameState === "play") {
    jump();
    obstacles();
    clouds();
    text(score, 550, 15);
    text("Score: ", 510, 15);
    trex.collide(invisibleGround);
    score = Math.round(frameCount / scoreDivider);
    ground1.velocityX = -5;
    if (ground1.x < 0) {
      ground1.x = ground.width / 2;
    }
    if (trex.isTouching(obstacleGroup)) {
      gameState = "end";
      dieSound.play();
    }
    scoreIncrement=Math.round(score%100);
    console.log(scoreIncrement);
    if (scoreIncrement===0 && score>0) {
      checkpointSound.play();
    }
  } else if (gameState === "end") {
    //end gamestate
    ground1.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    trex.velocityY = 0;
    gameOverSprite.visible = true;
    restartSprite.visible = true;
    trex.changeAnimation("hello1", trexCollidedPNG);
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
  }
}

function jump() 
{
  if (keyDown("space") && trex.y >= 125) {
    trex.velocityY = -10;
    jumpSound.play();
  }
  trex.velocityY += 0.65;
}

function clouds() 
{
  if (frameCount % 60 == 0) {
  cloudY = Math.round(random(1, 50));
  cloudSprite = createSprite(550, cloudY, 25, 15);
  cloudGroup.add(cloudSprite);
  cloudSprite.scale = 0.5;
  cloudSprite.addImage(cloud);
  cloudSprite.lifetime = 280;
  trex.depth = cloudSprite.depth + 1;
  cloudSprite.velocityX = -2;
  }
}

function obstacles()
{
  var frameDelay = Math.round(random(30, 180));
  if (frameCount % frameDelay === 0) {
    obstacle = createSprite(500, 165, 50, 75);
    obstacle.velocityX = -5;
    obstacle.scale = 0.6;
    obstacleGroup.add(obstacle);
    obstacle.lifetime = 280;
    obstacleSpriteNumber = Math.round(random(1, 6));
    console.log(obstacleSpriteNumber);
    switch (obstacleSpriteNumber) {
      case 1: obstacle.addImage(obstacle1Sprite);
        break;
      case 2: obstacle.addImage(obstacle2Sprite);
        break;
      case 3: obstacle.addImage(obstacle3Sprite)
        break;
      case 4: obstacle.addImage(obstacle4Sprite)
        break;
      case 5: obstacle.addImage(obstacle5Sprite)
        break;
      case 6: obstacle.addImage(obstacle6Sprite)
        break;
      default: break;
    }
  }
}