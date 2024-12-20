import './styles/index.scss';

import { Game, GAME_WON } from './core/Game.js';

const totalCountPannel = document.getElementById('total');
const statsPannel = document.getElementById('stats');
const canvasWrapper = document.getElementById('wrapper');
const levelButtons = document.querySelectorAll('.levels button');

let level = 1;
let totalScore = 0;

function unlockNextLevel() {
  if (level <= levelButtons.length) {
    levelButtons[level - 1].disabled = false;
  }
}

function onGameFinished(result, score) {
  if (result === GAME_WON) {
    totalScore += score;
    totalCountPannel.innerText = totalScore;
    level++;
    unlockNextLevel();
  }

  setTimeout(() => {
    statsPannel.style.display = 'flex';
    canvasWrapper.style.visibility = 'hidden';
  }, 2000);
}

function startNewGame(level) {
  const game = new Game(level, onGameFinished);
  game.start();
}

levelButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (!button.disabled) {
      level = index + 1;
      statsPannel.style.display = 'none';
      canvasWrapper.style.visibility = 'visible';
      startNewGame(level);
    }
  });
});

// levelButtons.forEach((button, index) => {
//   button.addEventListener('click', () => {
//     if (!button.disabled) {
//       level = index + 1;
//       statsPannel.style.display = 'none';
//       canvasWrapper.style.visibility = 'visible';
//       startGame(playGround, level);
//     }
//   });
// });

// canvas.addEventListener('click', () => {
//   isGameStarted = true;
// });

// document.addEventListener('keydown', (e) => {
//   if (e.code === 'Space' || e.key === 'Space') {
//     e.preventDefault();
//     if (!isGameStarted) {
//       isGameStarted = true;
//     }
//   }
// });

// function setGameFinished(result) {
//   const delay = 2000;

//   setTimeout(() => {
//     if (result === GAME_WON) {
//       totalScore += score;
//       totalCountPannel.innerText = totalScore;
//       level++;
//       unlockNextLevel();
//     }
//     statsPannel.style.display = 'flex';
//     canvasWrapper.style.visibility = 'hidden';

//     isGameStarted = false;
//     score = 0;
//     lives = 3;
//   }, delay);
// }

// function gameLoop(playGround, bricks, paddle, ball, collision, level) {
//   playGround.clear();
//   playGround.drawBricks(bricks);
//   playGround.drawItem(paddle);
//   playGround.drawItem(ball);

//   if (
//     (paddle.isMovingLeft && paddle.pos.x > 0) ||
//     (paddle.isMovingRight && paddle.pos.x < canvasSize.width - paddle.width)
//   ) {
//     paddle.move();
//   }

//   if (isGameStarted) {
//     ball.move();
//   } else {
//     ball.updateXPosition(paddle.pos.x + paddle.width / 2 - ball.width / 2);
//   }

//   collision.checkBallCollision(ball, paddle);
//   const collidingBrick = collision.isCollidingBricks(ball, bricks);
//   const bottomCollision = collision.isBottomCollision(ball);

//   if (collidingBrick) {
//     score += 1;
//     playGround.drawScore(score);
//   }

//   if (bottomCollision) {
//     lives--;
//     isGameStarted = false;
//     paddle.resetPosition();
//     ball.resetPosition();
//     playGround.drawLives(lives);
//   }

//   if (lives < 0) {
//     playGround.drawGameResult(GAME_OVER);
//     playGround.clearScreen();
//     return setGameFinished(GAME_OVER);
//   }

//   if (bricks.length === 0) {
//     playGround.drawGameResult(GAME_WON);
//     playGround.clearScreen();
//     return setGameFinished(GAME_WON);
//   }

//   requestAnimationFrame(() =>
//     gameLoop(playGround, bricks, paddle, ball, collision, level),
//   );
// }

// function startGame(playGround, level) {
//   playGround.drawScore(score);
//   playGround.drawLives(lives);

//   const bricks = createBricks(getLevelMap(level));
//   const paddle = new Paddle();
//   const ball = new Ball();

//   gameLoop(playGround, bricks, paddle, ball, new CollisionDetection(), level);
// }
