import { canvasSize } from '../../shared/constants.js';
import { Ball, directions } from '../../entities/ball/Ball.js';
import { Brick } from '../../entities/brick/Brick.js';
import { Paddle } from '../../entities/paddle/Paddle.js';

/**
 * Handles collision detection for the game.
 */
export class CollisionDetection {
  /**
   * Checks if the ball is colliding with a brick.
   * @param {Ball} ball - The ball object, an instance of the Ball class.
   * @param {Brick} brick - The brick object, an instance of the Brick class..
   * @private
   * @returns {boolean} True if there is a collision, false otherwise.
   */
  #isCollidingBrick(ball, brick) {
    const ballBottom = ball.pos.y + ball.height;
    const ballRight = ball.pos.x + ball.width;
    const brickBottom = brick.pos.y + brick.height;
    const brickRight = brick.pos.x + brick.width;

    const isColliding =
      ball.pos.x < brickRight &&
      ballRight > brick.pos.x &&
      ball.pos.y < brickBottom &&
      ballBottom > brick.pos.y;

    if (isColliding) {
      /* Determine the direction of impact */
      const overlapLeft = ballRight - brick.pos.x;
      const overlapRight = brickRight - ball.pos.x;
      const overlapTop = ballBottom - brick.pos.y;
      const overlapBottom = brickBottom - ball.pos.y;

      const minOverlap = Math.min(
        overlapLeft,
        overlapRight,
        overlapTop,
        overlapBottom,
      );

      if (minOverlap === overlapLeft || minOverlap === overlapRight) {
        ball.changeXDirection(); /* Hit from the left or right */
      } else if (minOverlap === overlapTop || minOverlap === overlapBottom) {
        ball.changeYDirection(); /* Hit from the top or bottom */
      }

      return true;
    }

    return false;
  }

  /**
   * Checks for collisions between the ball and an array of bricks.
   * @param {Ball} ball - The ball object, an instance of the Ball class.
   * @param {Brick[]} bricks - An array of brick objects.
   * @public
   * @returns {boolean} True if a collision occurred, false otherwise.
   */
  isCollidingBricks(ball, bricks) {
    let colliding = false;

    bricks.forEach((brick, i) => {
      if (this.#isCollidingBrick(ball, brick)) {
        if (brick.energy === 1) {
          bricks.splice(i, 1);
        } else {
          brick.energy -= 1;
          brick.opacity /= 2;
        }
        colliding = true;
      }
    });
    return colliding;
  }

  /**
   * Checks for collisions between the ball and the paddle.
   * @param {Ball} ball - The ball object, an instance of the Ball class.
   * @param {Paddle} paddle - The paddle object, an instance of the Paddle class.
   * @public
   * @returns {void}
   */
  checkBallCollision(ball, paddle) {
    /* The ball collides with the paddle */
    if (
      ball.pos.x + ball.width >= paddle.pos.x &&
      ball.pos.x <= paddle.pos.x + paddle.width &&
      ball.pos.y + ball.height === paddle.pos.y
    ) {
      const ballCenterX = ball.pos.x + ball.width / 2;
      const paddleCenterX = paddle.pos.x + paddle.width / 2;

      if (ballCenterX < paddle.pos.x) {
        // Hit in the left zone
        ball.updateXSpeed(directions.LEFT);
      } else if (ballCenterX < paddleCenterX) {
        // Hit in the left center zone
        ball.updateXSpeed(directions.CENTER_LEFT);
      } else if (
        ballCenterX > paddleCenterX &&
        ballCenterX < paddle.pos.x + paddle.width
      ) {
        // Hit in the right center zone
        ball.updateXSpeed(directions.CENTER_RIGHT);
      } else if (ballCenterX >= paddle.pos.x + paddle.width) {
        // Hit in the right zone
        ball.updateXSpeed(directions.RIGHT);
      } else {
        // Hit in the center zone
        ball.updateXSpeed();
      }

      ball.changeYDirection();
    }

    /* The ball collides with the side edges of the field */
    if (ball.pos.x > canvasSize.width - ball.width || ball.pos.x < 0) {
      ball.changeXDirection();
    }

    /* The ball collides with the top edge of the field */
    if (ball.pos.y < 0) {
      ball.changeYDirection();
    }
  }

  /**
   * Checks if the ball has collided with the bottom of the canvas.
   * @param {Ball} ball - The ball object, an instance of the Ball class.
   * @public
   * @returns {boolean} True if there is a bottom collision, false otherwise.
   */
  isBottomCollision(ball) {
    return ball.pos.y > canvasSize.height;
  }
}
