// Projeto básico
const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");

const square = 32;

let snake = [];
snake[0] = {
  x: 8 * square,
  y: 8 * square,
};
let direction = "right";

let food = {
  x: Math.floor(Math.random() * 15 + 1) * square,
  y: Math.floor(Math.random() * 15 + 1) * square,
};

function backgroundSnake() {
  context.fillStyle = "#74051C";
  context.fillRect(0, 0, 16 * square, 16 * square);
}

function makeSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "#545054";
    context.fillRect(snake[i].x, snake[i].y, square - 1, square - 1);
  }
}

function drawFood() {
  context.fillStyle = "#0B0A0B";
  context.fillRect(food.x, food.y, square - 2, square - 2);
}

function getPoints() {
  score.innerHTML = "Score \n" + (snake.length - 0);
}

document.addEventListener("keydown", update);

function update(event) {
  if (
    (event.keyCode === 37 && direction !== "right") ||
    (event.keyCode === 65 && direction !== "right")
  )
    direction = "left";
  if (
    (event.keyCode === 38 && direction !== "down") ||
    (event.keyCode === 87 && direction !== "down")
  )
    direction = "up";
  if (
    (event.keyCode === 39 && direction !== "left") ||
    (event.keyCode === 68 && direction !== "left")
  )
    direction = "right";
  if (
    (event.keyCode === 40 && direction !== "up") ||
    (event.keyCode === 83 && direction !== "up")
  )
    direction = "down";
}

function startGame() {
  if (snake[0].x > 15 * square && direction === "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction === "left") snake[0].x = 16 * square;
  if (snake[0].y > 15 * square && direction === "down") snake[0].y = 0;
  if (snake[0].y < 0 && direction === "up") snake[0].y = 16 * square;

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(game);
    }
  }

  backgroundSnake();
  makeSnake();
  drawFood();
  gameOver();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "right") snakeX += square;
  if (direction === "left") snakeX -= square;
  if (direction === "up") snakeY -= square;
  if (direction === "down") snakeY += square;

  if (snakeX !== food.x || snakeY !== food.y) {
    snake.pop();
    gameOver();
  } else {
    getPoints();
    food.x = Math.floor(Math.random() * 15 + 1) * square;
    food.y = Math.floor(Math.random() * 15 + 1) * square;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

function finalScore() {
  context.fillStyle = "red";
  context.clearRect(0, 0, 25 * square, 20 * square);
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.font = "bold 20px courier";
  context.fillStyle = "red";
  context.fillText("GAME OVER", 3.5 * square, 7 * square);
}

function gameOver() {
  for (let i = 100; i < snake.length; i++) {
    const final = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
    if (final) {
      clearInterval();
      finalScore();
      snake = [];
      food = {};
    }
  }
}

let game = setInterval(startGame, 120);
