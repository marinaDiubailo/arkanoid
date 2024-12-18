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
      y: canvasSize.height - paddleDimensions.HEIGHT - 5,
    },
  ) {
    super(paddleWidth, paddleHeight, position, PaddleImage);
    this.#speed = speed;
    this.#moveLeft = false;
    this.#moveRight = false;

    document.addEventListener('keydown', this.#handleKeyDown);
    document.addEventListener('keyup', this.#handleKeyUp);
    document.addEventListener('mousemove', this.#handleMouseMove);

    document.addEventListener('touchstart', this.#handleTouchStart);
    document.addEventListener('touchend', this.#handleTouchEnd);
    document.addEventListener('touchmove', this.#handleTouchMove);
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
    this.pos.y = canvasSize.height - paddleDimensions.HEIGHT - 5;
  }

  #handleKeyUp = (e) => {
    e.preventDefault();
    if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') this.#moveLeft = false;
    if (e.code === 'ArrowRight' || e.key === 'ArrowRight')
      this.#moveRight = false;
  };

  #handleKeyDown = (e) => {
    e.preventDefault();
    if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') this.#moveLeft = true;
    if (e.code === 'ArrowRight' || e.key === 'ArrowRight')
      this.#moveRight = true;
  };

  #handleMouseMove = (e) => {
    const mouseX = e.clientX - (window.innerWidth - canvasSize.width) / 2;

    if (mouseX > 0 && mouseX < canvasSize.width) {
      this.pos.x = mouseX - this.width / 2;
    }
  };

  #handleTouchStart = (e) => {
    const touch = e.touches[0];
    this.#updatePositionFromTouch(touch.clientX);
  };

  #handleTouchEnd = () => {
    this.#moveLeft = false;
    this.#moveRight = false;
  };

  #handleTouchMove = (e) => {
    const touch = e.touches[0];
    this.#updatePositionFromTouch(touch.clientX);
  };

  #updatePositionFromTouch(mouseX) {
    const adjustedX = mouseX - (window.innerWidth - canvasSize.width) / 2;

    if (adjustedX > 0 && adjustedX < canvasSize.width) {
      this.pos.x = adjustedX - this.width / 2;
    }
  }
}
