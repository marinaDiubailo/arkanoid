import { getLevelMap } from '../../shared/levels.js';
import { PlayGround } from '../../entities/playGround/PlayGround.js';
import { Paddle } from '../../entities/paddle/Paddle.js';
import { Ball } from '../../entities/ball/Ball.js';
import { createBricks } from '../../entities/brick/creteBricks.js';

import { CollisionDetection } from './CollisionDetection.js';

const canvas = document.getElementById('canvas');

export const GAME_OVER = 'Game Over';
export const GAME_WON = 'Game Won';

export class Game {
  #level;
  #isGameStarted = false;
  #score = 0;
  #lives = 3;
  #onGameFinished;
  #collision = new CollisionDetection();
  #playGround = new PlayGround();

  constructor(level, onGameFinished) {
    this.#level = level;
    this.#onGameFinished = onGameFinished;

    canvas.addEventListener('click', () => {
      this.#isGameStarted = true;
    });

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.key === 'Space') {
        e.preventDefault();
        if (!this.#isGameStarted) {
          this.#isGameStarted = true;
        }
      }
    });
  }

  start() {
    this.#playGround.drawScore(this.#score);
    this.#playGround.drawLives(this.#lives);

    const bricks = createBricks(getLevelMap(this.#level));
    const paddle = new Paddle();
    const ball = new Ball();
    this.#gameLoop(bricks, paddle, ball);
  }

  #gameLoop(bricks, paddle, ball) {
    this.#playGround.clear();
    this.#playGround.drawBricks(bricks);
    this.#playGround.drawItem(paddle);
    this.#playGround.drawItem(ball);

    if (
      (paddle.isMovingLeft && paddle.pos.x > 0) ||
      (paddle.isMovingRight && paddle.pos.x < canvas.width - paddle.width)
    ) {
      paddle.move();
    }

    if (this.#isGameStarted) {
      ball.move();
    } else {
      ball.updateXPosition(paddle.pos.x + paddle.width / 2 - ball.width / 2);
    }

    this.#collision.checkBallCollision(ball, paddle);
    const collidingBrick = this.#collision.isCollidingBricks(ball, bricks);
    const bottomCollision = this.#collision.isBottomCollision(
      ball,
      this.#playGround,
    );

    if (collidingBrick) {
      this.#score += 1;
      this.#playGround.drawScore(this.#score);
    }

    if (bottomCollision) {
      this.#lives--;
      this.#isGameStarted = false;
      paddle.resetPosition();
      ball.resetPosition();
      this.#playGround.drawLives(this.#lives);
    }

    if (this.#lives < 0) {
      return this.#setGameFinished(GAME_OVER);
    }

    if (bricks.length === 0) {
      return this.#setGameFinished(GAME_WON);
    }

    requestAnimationFrame(() => this.#gameLoop(bricks, paddle, ball));
  }

  #setGameFinished(result) {
    this.#playGround.drawGameResult(result);
    this.#playGround.clearScreen();
    this.#onGameFinished(result, this.#score);
  }
}
