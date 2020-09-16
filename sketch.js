const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var bg = "sprites/bg.png";
var score = 0;

var gameState = "onSling";

function preload() {
    getBackground();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});


}

function draw(){
    if(backgroundImg) {
        background(backgroundImg);
    }
    fill("white");
    textSize(35);
    text("Score: " + score, width-300, 50);
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        //slingshot.attach(bird.body);
    }
}

async function getBackground(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/America/Chicago");
    var responseJSON = await response.json();
    console.log(responseJSON);

    var dt = responseJSON.datetime;
    console.log(dt);

    var hour = dt.slice(11, 13);
    console.log(hour);

    if(hour>=06 && hour<=19) {
        //day background
        bg = "sprites/bg.png";
    }
    else{
        //night background
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
}

/*
API call
- Application Program Interface
- "promise of information"
- fetch() - sends a request to the API service & collects the response


Data Structure
JSON - JS Object Notation
- created inside {..}
- Holds a list of different data types
- Different elements are separated by a comma
- {Index_name: Index_value}

JS - executes program synchronously - does not wait for any line to be completed
                                    - jumps to the next line without waiting
    Asynchronous - waits for some lines to be completed before jumping to the next line

*/