import { PlayGroundItem } from '../../shared/PlayGroundItem';
import {
  PADDLE_SPEED,
  paddleDimensions,
  canvasSize,
} from '../../shared/constants';
import PaddleImage from './assets/paddle.png';

export class Paddle extends PlayGroundItem {
  #speed;
  #moveLeft;
  #moveRight;

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

  get isMovingLeft() {
    return this.#moveLeft;
  }

  get isMovingRight() {
    return this.#moveRight;
  }

  move() {
    if (this.#moveLeft) this.pos.x -= this.#speed;
    if (this.#moveRight) this.pos.x += this.#speed;
  }
  resetPosition() {
    this.pos.x = paddleDimensions.START_X;
    this.pos.y = paddleDimensions.START_Y;
  }

  #handleKeyUp = (e) => {
    this.#handleKeyChange(e, false);
  };

  #handleKeyDown = (e) => {
    this.#handleKeyChange(e, true);
  };

  #handleKeyChange = (e, isKeyDown) => {
    e.preventDefault();
    if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') {
      this.#moveLeft = isKeyDown;
    }
    if (e.code === 'ArrowRight' || e.key === 'ArrowRight') {
      this.#moveRight = isKeyDown;
    }
  };

  #handleMouseMove = (e) => {
    this.#upgateXPosition(e.clientX);
  };

  #handleTouch = (e) => {
    const touch = e.touches[0];
    this.#upgateXPosition(touch.clientX);
  };

  #handleTouchEnd = () => {
    this.#moveLeft = false;
    this.#moveRight = false;
  };

  #upgateXPosition(clientX) {
    const adjustedX = clientX - canvasSize.OFFSET_LEFT;

    if (adjustedX > 0 && adjustedX < canvasSize.width - this.width / 2) {
      this.pos.x = adjustedX - this.width / 2;
    }

    if (adjustedX < this.width / 2) {
      this.pos.x = 0;
    }
  }
}
