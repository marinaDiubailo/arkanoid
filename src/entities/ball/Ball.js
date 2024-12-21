import { PlayGroundItem } from '../../shared/PlayGroundItem';
import { ballDimensions } from '../../shared/constants';
import BallImage from './assets/ball.png';

export const directions = {
  LEFT: 'left',
  RIGHT: 'right',
  CENTER_LEFT: 'center-left',
  CENTER_RIGHT: 'center-right',
};

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
      x: 0,
      y: -speed,
    };
  }

  updateXPosition(newXPosition) {
    this.pos.x = newXPosition;
    this.#speed.x = 0;
  }

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
