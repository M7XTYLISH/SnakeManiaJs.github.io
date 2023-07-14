// Game Constants and Variables

// Sound Constant
const foodSound = new Audio("./music/food.mp3");
const gameOverSound = new Audio("./music/gameover.mp3");
const moveSound = new Audio("./music/move.mp3");
const musicSound = new Audio("./music/music.mp3");

// HTML Varible
let board = document.getElementById("board");
let scoreDisplay = document.getElementById("score");
// let dashboard = document.getElementById("dashboard");

// Game Variable
let inputDir = { x: 0, y: 0 };
let speed = 1;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 12, y: 12 }];
let food = { x: 6, y: 7 };
let bigFood = { x: 8, y: 9 };

// Game Functions

// Game FPS Function
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    // console.log(ctime);
    gameEngine();
}

// Snake Collide
function isCollide(snake) {
    // If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // If you bump into the wall
    if (
        snake[0].x >= 18 ||
        snake[0].x <= 0 ||
        snake[0].y >= 18 ||
        snake[0].y <= 0
    ) {
        return true;
    }
}

// Game Engine
function gameEngine() {
    musicSound.play();

    //Part 1: Updating the snake array
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        speed = 1;
        score = 0;
        speedBox.innerHTML = "Current Speed: 1";
        let al = alert("Game Over. Press any key to play again");
        snakeArr = [{ x: 13, y: 15 }];
    }

    // If you have eaten the food , increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HighScore: " + hiscoreval;
        }

        // 5s speed increment 0.25
        setTimeout(() => {
            speed += 0.5;
            // console.log(speed);
            speedBox.innerHTML = "Current Speed: " + speed;
        }, 5000);

        scoreDisplay.innerHTML = "Score: " + score;
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y,
        });

        let a = 2;
        let b = 16;

        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random()),
        };
    }

    // bigFood Define
    if (snakeArr[0].y === bigFood.y && snakeArr[0].x === bigFood.x) {
        foodSound.play();
        score += 5;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HighScore: " + hiscoreval;
        }

        // 1s speed decrement 1
        setTimeout(() => {
            speed -= 1;
            // console.log(speed);
            speedBox.innerHTML = "Current Speed: " + speed;
        }, 1000);

        scoreDisplay.innerHTML = "Score: " + score;
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y,
        });

        let a = 2;
        let b = 16;

        bigFood = {
            x: Math.round(b + (a - b) * Math.random()),
            y: Math.round(b + (a - b) * Math.random()),
        };
    }

    // Moving the Snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food

    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add("head");
        } else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });

    // Display the Food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

// Main Logic Starts Here
window.requestAnimationFrame(main);

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HighScore: " + hiscore;
}
    window.addEventListener("keydown", (e) => {
        inputDir = { x: 0, y: 1 }; // Start the Game
        moveSound.play();
        switch (e.key) {
            // Up Arrow
            case "ArrowUp":
                inputDir.x = 0;
                inputDir.y = -1;
                break;
            case "w":
                inputDir.x = 0;
                inputDir.y = -1;
                break;
            case "W":
                inputDir.x = 0;
                inputDir.y = -1;
                break;

            // Down Arrow
            case "ArrowDown":
                inputDir.x = 0;
                inputDir.y = 1;
                break;
            case "s":
                inputDir.x = 0;
                inputDir.y = 1;
                break;
            case "S":
                inputDir.x = 0;
                inputDir.y = 1;
                break;

            // Left Arrow
            case "ArrowLeft":
                inputDir.x = -1;
                inputDir.y = 0;
                break;
            case "a":
                inputDir.x = -1;
                inputDir.y = 0;
                break;
            case "A":
                inputDir.x = -1;
                inputDir.y = 0;
                break;

            // Right Arrow
            case "ArrowRight":
                inputDir.x = 1;
                inputDir.y = 0;
                break;
            case "d":
                inputDir.x = 1;
                inputDir.y = 0;
                break;
            case "D":
                inputDir.x = 1;
                inputDir.y = 0;
                break;

            // Pause Button
            case "Pause":
                console.log("pause btn");
                musicSound.pause();
                alert(
                    "Continue Game! Warning: Don't Press another key snake is move y axis for down side! alert for continue the game."
                );

            default:
                break;
        };
    });