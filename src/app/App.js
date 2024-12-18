import './styles/index.scss';
import { PlayGround } from '../entities/playGround/PlayGround.js';
import { createBricks } from '../entities/brick/creteBricks.js';
import { Paddle } from '../entities/paddle/Paddle.js';
import { Ball } from '../entities/ball/Ball.js';

import { getLevelMap } from '../shared/levels.js';
import { canvasSize } from '../shared/constants.js';

const GAME_OVER = 'Game Over';
const GAME_WON = 'Game Won';

import { CollisionDetection } from './core/CollisionDetection.js';

const canvas = document.getElementById('canvas');

const totalCountPannel = document.getElementById('total');
//const startButton = document.getElementById('start');
const statsPannel = document.getElementById('stats');
const canvasWrapper = document.getElementById('wrapper');
const levelButtons = document.querySelectorAll('.levels button');

const playGround = new PlayGround();

let level = 1;
let isGameStarted = false;
let score = 0;
let lives = 3;
let totalScore = 0;

function setGameFinished(result) {
  lives = 3;

  if (result === GAME_OVER) {
    alert(GAME_OVER);
    console.log('game over', isGameStarted);
  } else {
    alert(GAME_WON);
    console.log('game won', isGameStarted);
    totalScore += score;
    totalCountPannel.innerText = totalScore;
    level++;
    unlockNextLevel();
  }
  statsPannel.style.display = 'flex';
  canvasWrapper.style.display = 'none';
  playGround.clearScreen();
  isGameStarted = false;
  score = 0;
}

function gameLoop(playGround, bricks, paddle, ball, collision, level) {
  playGround.clear();
  playGround.drawBricks(bricks);
  playGround.drawItem(paddle);
  playGround.drawItem(ball);

  if (
    (paddle.isMovingLeft && paddle.pos.x > 0) ||
    (paddle.isMovingRight && paddle.pos.x < canvasSize.width - paddle.width)
  ) {
    paddle.move();
  }

  if (isGameStarted) {
    ball.move();
  } else {
    ball.updateXPosition(paddle.pos.x + paddle.width / 2 - ball.width / 2);
  }

  collision.checkBallCollision(ball, paddle);
  const collidingBrick = collision.isCollidingBricks(ball, bricks);
  const bottomCollision = collision.isBottomCollision(ball);

  if (collidingBrick) {
    score += 1;
    playGround.drawScore(score);
  }

  if (bottomCollision) {
    lives--;
    isGameStarted = false;
    paddle.resetPosition();
    ball.resetPosition();
    playGround.drawLives(lives);
  }

  if (lives < 0) {
    return setGameFinished(GAME_OVER);
  }

  if (bricks.length === 0) {
    playGround.clear();
    return setGameFinished(GAME_WON);
  }

  requestAnimationFrame(() =>
    gameLoop(playGround, bricks, paddle, ball, collision, level),
  );
}

function startGame(playGround, level) {
  playGround.drawScore(score);
  playGround.drawLives(lives);

  const bricks = createBricks(getLevelMap(level));
  const paddle = new Paddle();
  const ball = new Ball();

  gameLoop(playGround, bricks, paddle, ball, new CollisionDetection(), level);
}

function unlockNextLevel() {
  if (level <= levelButtons.length) {
    levelButtons[level - 1].disabled = false; // Разблокируем кнопку текущего уровня
  }
}

levelButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (!button.disabled) {
      level = index + 1;
      statsPannel.style.display = 'none';
      canvasWrapper.style.display = 'block';
      startGame(playGround, level);
    }
  });
});

canvas.addEventListener('click', () => {
  isGameStarted = true;
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.key === 'Space') {
    e.preventDefault();
    if (!isGameStarted) {
      isGameStarted = true;
    }
  }
});
