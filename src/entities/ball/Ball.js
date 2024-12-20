import { PlayGroundItem } from '../../shared/PlayGroundItem';
import { ballDimensions } from '../../shared/constants';
import BallImage from './assets/ball.png';

export class Ball extends PlayGroundItem {
  #speed;

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
      x: speed,
      y: -speed,
    };
  }

  updateXPosition(newXPosition) {
    this.pos.x = newXPosition;
  }

  resetPosition() {
    this.pos.x = ballDimensions.START_X;
    this.pos.y = ballDimensions.START_Y;
    this.#speed.x = ballDimensions.SPEED;
    this.#speed.y = -ballDimensions.SPEED;
  }

  changeYDirection() {
    this.#speed.y = -this.#speed.y;
  }

  changeXDirection() {
    this.#speed.x = -this.#speed.x;
  }

  move() {
    this.pos.x += this.#speed.x;
    this.pos.y += this.#speed.y;
  }
}
