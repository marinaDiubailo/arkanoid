import { getLevelMap } from '../../shared/levels.js';
import { PlayGround } from '../../entities/playGround/PlayGround.js';
import { Paddle } from '../../entities/paddle/Paddle.js';
import { Ball } from '../../entities/ball/Ball.js';
import { createBricks } from '../../entities/brick/creteBricks.js';
import { Brick } from '../../entities/brick/Brick.js';

import { CollisionDetection } from './CollisionDetection.js';

const canvas = document.getElementById('canvas');

export const GAME_OVER = 'Game Over';
export const GAME_WON = 'Game Won';

/**
 * Represents the game logic and state.
 */
export class Game {
  #level;
  #isGameStarted = false;
  #score = 0;
  #lives = 3;
  #onGameFinished;
  #collision = new CollisionDetection();
  #playGround = new PlayGround();

  /**
   * Creates an instance of the Game.
   * @param {number} level - The current level of the game.
   * @param {Function} onGameFinished - Callback function to call when the game finishes.
   */
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

  /**
   * Starts the game, initializing the game state and starting the game loop.
   * @public
   * @returns {void}
   */
  start() {
    this.#playGround.drawScore(this.#score);
    this.#playGround.drawLives(this.#lives);

    const bricks = createBricks(getLevelMap(this.#level));
    const paddle = new Paddle();
    const ball = new Ball();
    this.#gameLoop(bricks, paddle, ball);
  }

  /**
   * The main game loop that updates the game state and renders the items.
   * @param {Brick[]} bricks - The array of brick objects.
   * @param {Paddle} paddle - The paddle object.
   * @param {Ball} ball - The ball object.
   * @private
   * @returns {void}
   */
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

  /**
   * Ends the game and displays the result.
   * @param {string} result - The result of the game (GAME_OVER or GAME_WON).
   * @private
   * @returns {void}
   */
  #setGameFinished(result) {
    this.#playGround.drawGameResult(result);
    this.#playGround.clearScreen();
    this.#onGameFinished(result, this.#score);
  }
}
