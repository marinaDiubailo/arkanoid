import { PlayGroundItem } from '../../shared/PlayGroundItem.js';
import { ballDimensions } from '../../shared/constants.js';
import BallImage from './assets/ball.png';

/**
 * Possible movement directions for the ball.
 * @enum {string}
 */
export const directions = {
  LEFT: 'left',
  RIGHT: 'right',
  CENTER_LEFT: 'center-left',
  CENTER_RIGHT: 'center-right',
};

/**
 * Represents a ball in the game that moves in a specified direction.
 * @class
 * @extends PlayGroundItem
 */
export class Ball extends PlayGroundItem {
  #speed;

  /**
   * Creates an instance of Ball.
   * @param {number} [speed=ballDimensions.SPEED] - The speed of the ball's movement.
   * @param {number} [ballSize=ballDimensions.SIZE] - The size of the ball.
   * @param {{x: number, y: number}} [position={x: ballDimensions.START_X, y: ballDimensions.START_Y}] - The initial position of the ball.
   */
  constructor(
    speed = ballDimensions.SPEED,
    ballSize = ballDimensions.SIZE,
    position = {
      x: ballDimensions.START_X,
      y: ballDimensions.START_Y,
    },
  ) {
    super(ballSize, ballSize, position, BallImage);
    this.#speed = {
      x: 0,
      y: -speed,
    };
  }

  /**
   * Updates the X position of the ball and resets its X speed.
   * This allows the ball to move with the paddle until the user launches it,
   * enabling the user to select the launch position.
   * @param {number} newXPosition - The new X position to set for the ball.
   * @public
   * @returns {void}
   */
  updateXPosition(newXPosition) {
    this.pos.x = newXPosition;
    this.#speed.x = 0;
  }

  /**
   * Updates the X speed of the ball based on the specified direction.
   * @param {string} direction - The direction to move the ball (LEFT, RIGHT, CENTER_LEFT, CENTER_RIGHT).
   * @public
   * @returns {void}
   */
  updateXSpeed(direction) {
    if (direction === directions.LEFT) {
      this.#speed.x = -ballDimensions.SPEED;
    } else if (direction === directions.RIGHT) {
      this.#speed.x = ballDimensions.SPEED;
    } else if (direction === directions.CENTER_LEFT) {
      this.#speed.x = -Math.ceil(ballDimensions.SPEED / 2);
    } else if (direction === directions.CENTER_RIGHT) {
      this.#speed.x = Math.ceil(ballDimensions.SPEED / 2);
    } else {
      this.#speed.x = 0;
    }
  }

  /**
   * Resets the position of the ball to its starting point and resets its speed.
   * @public
   * @returns {void}
   */
  resetPosition() {
    this.pos.x = ballDimensions.START_X;
    this.pos.y = ballDimensions.START_Y;
    this.#speed.x = ballDimensions.SPEED;
    this.#speed.y = -ballDimensions.SPEED;
  }

  /**
   * Changes the Y direction of the ball's movement.
   * @public
   * @returns {void}
   */
  changeYDirection() {
    this.#speed.y = -this.#speed.y;
  }

  /**
   * Changes the X direction of the ball's movement.
   * @public
   * @returns {void}
   */
  changeXDirection() {
    this.#speed.x = -this.#speed.x;
  }

  /**
   * Moves the ball based on its current speed.
   * @public
   * @returns {void}
   */
  move() {
    this.pos.x += this.#speed.x;
    this.pos.y += this.#speed.y;
  }
}
