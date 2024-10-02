function controller(event){

    // Start Run

    if(event.key == "Enter"){
        if (runworkerNumber == 0){        
            run();
            updateScore();
            moveBackground();
            runSound.play();
            flameMarginLeft.forEach(generateFlame);
        }
        
    }

    // Start Jump

    if(event.key == " "){
        if (jumpworkerNumber == 0){
            if (runworkerNumber != 0){
                clearInterval(runworkerNumber);
                runSound.pause();
                jump();
                jumpSound.play();
            }

        }
                
    }
       
}

var runImageNumber = 1;
var runworkerNumber = 0;
var runSound = new Audio("run.mp3");
runSound.loop = true;

function run(){

    runworkerNumber = setInterval(() => {
        runImageNumber = runImageNumber + 1;

        if (runImageNumber == 9){
            runImageNumber = 1;
        }
        document.getElementById("boy").src = "run" + runImageNumber + ".png";
    },150);
}

var jumpworkerNumber = 0;
var jumpImageNumber = 1;
var jumpMarginTop = 493; 
var jumpSound = new Audio("jump.mp3");

function jump(){

    jumpworkerNumber = setInterval(() => {
        jumpImageNumber = jumpImageNumber + 1;

        if (jumpImageNumber < 8){
            jumpMarginTop = jumpMarginTop - 15;
            document.getElementById("boy").style.marginTop = jumpMarginTop + "px";
        }

        if (jumpImageNumber > 8){
            jumpMarginTop = jumpMarginTop + 18;
            document.getElementById("boy").style.marginTop = jumpMarginTop + "px";
        }
        

        if (jumpImageNumber == 13){
            jumpImageNumber = 1;  
            clearInterval(jumpworkerNumber);
            jumpworkerNumber = 0;  
            run();
            runSound.play();
        }
        document.getElementById("boy").src = "jump" + jumpImageNumber + ".png";
    },80);
}

var scoreWorkerNumber = 0;
var score = 0;

function updateScore(){

    scoreWorkerNumber = setInterval(() => {
        score = score + 10;
        if (score == 1050){
            alert("You Won! press Enter to Restart");
            window.location.reload();
        }
        document.getElementById("score").innerHTML = score;
    },100);
}

var backgroundWorkerNumber = 0;
var bacgroundX = 0;

function moveBackground(){

    backgroundWorkerNumber = setInterval(() => {
        bacgroundX = bacgroundX - 15;
        document.getElementById("background").style.backgroundPositionX = bacgroundX + "px"
    },100);
}

var deadImageNumber = 1;
var deadWorkerNumber = 0;
var deadSound = new Audio("dead.mp3");

function dead(){

    deadWorkerNumber = setInterval(() => {
        deadImageNumber = deadImageNumber + 1;
            if (deadImageNumber == 11){
                deadImageNumber = 1;
                clearInterval(deadWorkerNumber);
                alert("Game Over! Press Ok To Restart :)");
                window.location.reload();
            }
        document.getElementById("boy").src = "dead" + deadImageNumber + ".png";
    },100);
}

var flameMarginLeft = [500, 1000, 2000];
var flameWorkerNumber = 0;

function generateFlame(x){

    var i = document.createElement("img");
    i.src = "flame.gif";
    i.className = "flame";
    i.style.marginLeft = x + "px";
    document.getElementById("background").appendChild(i);

    flameWorkerNumber = setInterval(() => {

        if (flameWorkerNumber != 0){
            x = x - 10;
            i.style.marginLeft = x + "px";
        }
        
        if (x == 170){
            if (jumpworkerNumber == 0){
                clearInterval(runworkerNumber);
                runSound.pause();
                clearInterval(scoreWorkerNumber);
                clearInterval(backgroundWorkerNumber);
                clearInterval(flameWorkerNumber);
                flameWorkerNumber = 0;

                dead();
                deadSound.play();
            }
            
        }
    },50 );
}