//Create variables here
var dog,happyDog,dogIMG;
var database;
var foodS,foodStock;

function preload()
{
	//load images here
  dogIMG = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(250,350,10,60);
  dog.addImage(dogIMG);
  dog.scale = 0.2;
  
 

}


function draw() {
  background(46, 139, 87);

  if(foodS!== undefined){
    textSize(20);
    fill(255);
    text("Note: Press UP_ARROW key to feed DRACO milk",50,50);
    text("Food Remaining:" + foodS,150,150)
  }
   
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("happy",happyDog);
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage("dog",dogIMG);
  }

  if(foodS === 0){
    foodS = 20;
  }

  drawSprites();
  //add styles here

}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  })
}

function readStock(data){
  foodS = data.val();
}