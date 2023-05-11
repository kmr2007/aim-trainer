// Aim Trainer

// Canvas Set Up
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 400;

// Global Variables
let state = "start";
let score = 0;
let highScore;
let seconds = 30;
let targetImg = document.getElementById("target-img");
let crosshairImg = document.getElementById("crosshair-img");
let randNum1;
let randNum2;
randNumGen();
let target;
targetXandY();
let mouseXPos, mouseYPos;

// Even Listeners
document.addEventListener("click", clickHandler);
document.addEventListener("mousemove", mouseMoveHandler);
// MAIN FUNCTIONS
requestAnimationFrame(render);
function render() {
    // Run Game based on Current State
    if (state === "start") {
        startScreen()
    } else if (state === "gameOn") { gameOn();
    } else if (state === "timesUp") {
     timesUp();
    }

    // Check for High Score
    if (localStorage.getItem("highScore") !== null) {
highScore = localStorage.getItem("highScore");
    } else {
        highScore = 0;
    }
   // Replay Function
   requestAnimationFrame(render);

  
}

function clickHandler(event) {
let rect = cnv.getBoundingClientRect();
let mouseX = event.x - rect.x;
let mouseY =event.y - rect.y;
console.log(`${mouseX}, ${mouseY}`)
    if (state === "start") {
        state = "gameOn";
        setInterval(timer, 1000)
    } else if (state === "gameOn") { if (mouseX > target.x && mouseX < target.x + target.w && mouseY > target.y && mouseY < target.y + target.h) {
score++;
randNumGen();
targetXandY();} else {
score += -1;
}
    }
}

function mouseMoveHandler(event) {
    let rect = cnv.getBoundingClientRect();
mouseXPos = event.x - rect.x;
mouseYPos =event.y - rect.y;

}

// SCREENS

function startScreen() {
// Clear Board
drawRect(0, 0, cnv.width, cnv.height, "#181818");

// Draw Title
ctx.fillStyle = "White";
ctx.font = "50px Joystix";
ctx.textAlign = "center";
ctx.fillText("Aim Trainer", cnv.width/2, cnv.height/2);

// Start Now
ctx.fillStyle = "White";
ctx.font = "20px Joystix";
ctx.textAlign = "center";
ctx.fillText("Click Anywhere To Start", cnv.width/2, cnv.height/2 + 50);

// Bottom and Top Bars
drawRect(0, cnv.height - 40, cnv.width, 40, "Green");
drawRect(0, 0, cnv.width, 40, "Green");

// Draw Scores
ctx.fillStyle = "Black";
ctx.font = "20px Joystix";
ctx.textAlign = "left";
ctx.fillText(`Score: ${score}`, 10, cnv.height - 15);
ctx.textAlign = "right";
ctx.fillText(`High Score: ${highScore}`, cnv.width - 10, cnv.height - 15);

}

function gameOn() {
// Clear Board
drawRect(0, 0, cnv.width, cnv.height, "#181818");

// Bottom and Top Bars
drawRect(0, cnv.height - 40, cnv.width, 40, "Green");
drawRect(0, 0, cnv.width, 40, "Green");

// Draw Scores
ctx.fillStyle = "Black";
ctx.font = "20px Joystix";
ctx.textAlign = "left";
ctx.fillText(`Score: ${score}`, 10, cnv.height - 15);
ctx.textAlign = "right";
ctx.fillText(`High Score: ${highScore}`, cnv.width - 10, cnv.height - 15);

// Timer
ctx.fillStyle = "Black";
ctx.font = "20px Joystix";
ctx.textAlign = "center";
ctx.fillText(seconds, cnv.width/2, 30);

// Draw Target
ctx.drawImage(targetImg, target.x, target.y, target.w, target.h);

// Draw Crosshair
ctx.drawImage(crosshairImg, mouseXPos - 20, mouseYPos - 20, 40, 40);
}

function timesUp() {
    // Clear Board
drawRect(0, 0, cnv.width, cnv.height, "#181818");

// Time is Up
ctx.fillStyle = "White";
ctx.font = "50px Joystix";
ctx.textAlign = "center";
ctx.fillText("Time's Up!", cnv.width/2, cnv.height/2);


// Bottom and Top Bars
drawRect(0, cnv.height - 40, cnv.width, 40, "Green");
drawRect(0, 0, cnv.width, 40, "Green");

// Draw Scores
ctx.fillStyle = "Black";
ctx.font = "20px Joystix";
ctx.textAlign = "left";
ctx.fillText(`Score: ${score}`, 10, cnv.height - 15);
ctx.textAlign = "right";
ctx.fillText(`High Score: ${highScore}`, cnv.width - 10, cnv.height - 15);

setTimeout(reset, 2000);
}

function reset() {
    seconds = 30;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        
    } else {
    highScore = localStorage.getItem("highScore");
    }
    score = 0;
state = "start";
}


// SUB FUNCTIONS
function timer() {
    if (seconds > 0) {
        --seconds;
    } else {
        state = "timesUp"
    }
}
function drawRect(x, y, w, h, color) {
ctx.fillStyle = color;
ctx.fillRect(x, y, w, h);
ctx.fill();
}

function randNumGen() {
    randNum1 = Math.random() * 1000 -720;
    randNum2 = Math.random() * 1000 - 250;

}

function targetXandY() {
   
    if (randNum1 < 40 || randNum1 > 320 || randNum2 < 0 || randNum2 > 760) {
        randNumGen();
        targetXandY();
    } else {
 target = {
    x: randNum2,
    y: randNum1,
    w: 50,
    h: 50,
 }
}
}