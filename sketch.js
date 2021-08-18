/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var kangaroo, kangaroo_running, kangaroo_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;

var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

  kangaroo = createSprite(500,250);
  kangaroo.addAnimation ("running ",kangaroo_running);
  kangaroo.addAnimation ("collided ",kangaroo_collided);
  kangaroo.scale = 0.2
  kangaroo.setCollider("circle",0,0,300);
  //kangaroo.debug = true;


  invisiblejungle = createSprite(400,350,800,40);
  invisiblejungle.visible = false;



  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;
  kangaroo.depth = jungle.depth +1;

  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background(255);
  fill (0);
  kangaroo.x = camera.position.x-250;

  if(gameState===PLAY){
    jungle.velocityX=-2;
    //resetting Jungle
    if(jungle.x<50){
      jungle.x=400;
    }

    //adding Gravity to Kangaroo
    kangaroo.velocityY = kangaroo.velocityY+0.5

    //Jumping The Kangaroo
    if(keyDown("space")){
      kangaroo.velocityY = -15;
    }

    spawnShrub();
    spawnObstacle();

    if (kangaroo.isTouching(shrubsGroup)){
      score= score+1;
      shrubsGroup.destroyEach();
    }

    if( kangaroo.isTouching(obstaclesGroup)){
      gameState = END;
    }
  }

  if (gameState === END){
    jungle.destroy();
    shrubsGroup.destroyEach();
    obstaclesGroup.destroyEach();
    kangaroo.destroy();
    textSize(30);
    text(" GAME OVER !!", 330, 200);
  }
  
  kangaroo.collide(invisiblejungle);

  drawSprites();
  textSize(20);
  text( " Score : "+ score, 650, 50);
}

function spawnShrub (){
  if (frameCount% 150 === 0){
    shrub = createSprite(camera.position.x + 400, 330, 40,10);
    shrub.velocityX = -2;
    shrub.lifetime = 450;
    shrub.scale = 0.1;
    var num = Math.round(random(1,3));
    switch (num){
      case 1 : shrub.addImage(shrub1)
      break;
      case 2 : shrub.addImage(shrub2)
      break;
      case 3 : shrub.addImage(shrub3)
      break;
      default : break;
    }
    shrubsGroup.add(shrub);

  }
}

function spawnObstacle (){
  if (frameCount % 276 === 0){
    
    obstacle = createSprite(camera.position.x + 500, 330, 40,10);
    obstacle.scale=0.2
    obstacle.velocityX = -2;
    obstacle.lifetime = 450;
    obstacle.addImage(obstacle1)
    obstaclesGroup.add(obstacle);

  }
}
