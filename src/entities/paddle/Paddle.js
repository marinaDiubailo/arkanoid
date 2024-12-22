import { PlayGroundItem } from '../../shared/PlayGroundItem.js';
import {
  PADDLE_SPEED,
  paddleDimensions,
  canvasSize,
} from '../../shared/constants.js';
import PaddleImage from './assets/paddle.png';

/**
 * Represents the paddle in the game.
 * The paddle can be moved left and right using keyboard or mouse/touch input.
 * @class
 * @extends PlayGroundItem
 */
export class Paddle extends PlayGroundItem {
  #speed;
  #moveLeft;
  #moveRight;

  /**
   * Creates an instance of Paddle.
   * @param {number} [speed=PADDLE_SPEED] - The speed of the paddle movement.
   * @param {number} [paddleWidth=paddleDimensions.WIDTH] - The width of the paddle.
   * @param {number} [paddleHeight=paddleDimensions.HEIGHT] - The height of the paddle.
   * @param {{x: number, y: number}} [position={x: paddleDimensions.START_X, y: paddleDimensions.START_Y}] - The initial position of the paddle.
   */
  constructor(
    speed = PADDLE_SPEED,
    paddleWidth = paddleDimensions.WIDTH,
    paddleHeight = paddleDimensions.HEIGHT,
    position = {
      x: paddleDimensions.START_X,
      y: paddleDimensions.START_Y,
    },
  ) {
    super(paddleWidth, paddleHeight, position, PaddleImage);
    this.#speed = speed;
    this.#moveLeft = false;
    this.#moveRight = false;

    document.addEventListener('keydown', this.#handleKeyDown);
    document.addEventListener('keyup', this.#handleKeyUp);
    document.addEventListener('mousemove', this.#handleMouseMove);

    document.addEventListener('touchstart', this.#handleTouch);
    document.addEventListener('touchend', this.#handleTouchEnd);
    document.addEventListener('touchmove', this.#handleTouch);
  }

  /**
   * Checks if the paddle is moving left.
   * @returns {boolean} True if moving left, false otherwise.
   */
  get isMovingLeft() {
    return this.#moveLeft;
  }

  /**
   * Checks if the paddle is moving right.
   * @returns {boolean} True if moving right, false otherwise.
   */
  get isMovingRight() {
    return this.#moveRight;
  }

  /**
   * Moves the paddle based on user input.
   * @public
   * @returns {void}
   */
  move() {
    if (this.#moveLeft) this.pos.x -= this.#speed;
    if (this.#moveRight) this.pos.x += this.#speed;
  }

  /**
   * Resets the position of the paddle to the starting point.
   * @public
   * @returns {void}
   */
  resetPosition() {
    this.pos.x = paddleDimensions.START_X;
    this.pos.y = paddleDimensions.START_Y;
  }

  /**
   * Handles the key up event.
   * @param {KeyboardEvent} e - The keyboard event.
   * @private
   * @returns {void}
   */
  #handleKeyUp = (e) => {
    this.#handleKeyChange(e, false);
  };

  /**
   * Handles the key down event.
   * @param {KeyboardEvent} e - The keyboard event.
   * @private
   * @returns {void}
   */
  #handleKeyDown = (e) => {
    this.#handleKeyChange(e, true);
  };

  /**
   * Updates the movement state based on key events.
   * @param {KeyboardEvent} e - The keyboard event.
   * @param {boolean} isKeyDown - Indicates if the key is pressed down.
   * @private
   * @returns {void}
   */
  #handleKeyChange = (e, isKeyDown) => {
    e.preventDefault();
    if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') {
      this.#moveLeft = isKeyDown;
    }
    if (e.code === 'ArrowRight' || e.key === 'ArrowRight') {
      this.#moveRight = isKeyDown;
    }
  };

  /**
   * Handles mouse movement to update paddle position.
   * @param {MouseEvent} e - The mouse event.
   * @private
   * @returns {void}
   */
  #handleMouseMove = (e) => {
    this.#updateXPosition(e.clientX);
  };

  /**
   * Handles touch events to update paddle position.
   * @param {TouchEvent} e - The touch event.
   * @private
   * @returns {void}
   */
  #handleTouch = (e) => {
    const touch = e.touches[0];
    this.#updateXPosition(touch.clientX);
  };

  /**
   * Resets paddle movement states when touch ends.
   * @private
   * @returns {void}
   */
  #handleTouchEnd = () => {
    this.#moveLeft = false;
    this.#moveRight = false;
  };

  /**
   * Updates the X position of the paddle based on client X coordinate.
   * @param {number} clientX - The X coordinate from the mouse or touch event.
   * @private
   * @returns {void}
   */
  #updateXPosition(clientX) {
    const adjustedX = clientX - canvasSize.OFFSET_LEFT;

    if (adjustedX > 0 && adjustedX < canvasSize.width - this.width / 2) {
      this.pos.x = adjustedX - this.width / 2;
    }

    if (adjustedX < this.width / 2) {
      this.pos.x = 0;
    }
  }
}
