import { canvasSize } from '../../shared/constants';
import { directions } from '../../entities/ball/Ball';

export class CollisionDetection {
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
      /* Определяем направление удара */
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
        ball.changeXDirection(); /*Удар слева или справа */
      } else if (minOverlap === overlapTop || minOverlap === overlapBottom) {
        ball.changeYDirection(); /* Удар сверху или снизу */
      }

      return true;
    }

    return false;
  }

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

  checkBallCollision(ball, paddle) {
    /* Мяч сталкивается с платформой */
    if (
      ball.pos.x + ball.width >= paddle.pos.x &&
      ball.pos.x <= paddle.pos.x + paddle.width &&
      ball.pos.y + ball.height === paddle.pos.y
    ) {
      const ballCenterX = ball.pos.x + ball.width / 2;
      const paddleCenterX = paddle.pos.x + paddle.width / 2;

      if (ballCenterX < paddle.pos.x) {
        // Удар в левую зону
        ball.updateXSpeed(directions.LEFT);
      } else if (ballCenterX < paddleCenterX) {
        // Удар в левую центральную зону
        ball.updateXSpeed(directions.CENTER_LEFT);
      } else if (
        ballCenterX > paddleCenterX &&
        ballCenterX < paddle.pos.x + paddle.width
      ) {
        // Удар в правую центральную зону
        ball.updateXSpeed(directions.CENTER_RIGHT);
      } else if (ballCenterX >= paddle.pos.x + paddle.width) {
        // Удар в правую зону
        ball.updateXSpeed(directions.RIGHT);
      } else {
        // Удар в центральную зону
        ball.updateXSpeed();
      }

      ball.changeYDirection();
    }

    /* Мяч сталкивается с боковыми краями поля */
    if (ball.pos.x > canvasSize.width - ball.width || ball.pos.x < 0) {
      ball.changeXDirection();
    }

    /* Мяч сталкивается с верхним краем поля */
    if (ball.pos.y < 0) {
      ball.changeYDirection();
    }
  }

  isBottomCollision(ball) {
    return ball.pos.y > canvasSize.height;
  }
}
