import { canvasSize } from '../../shared/constants';

export class CollisionDetection {
  isCollidingBrick(ball, brick) {
    if (
      ball.pos.x < brick.pos.x + brick.width &&
      ball.pos.x + ball.width > brick.pos.x &&
      ball.pos.y < brick.pos.y + brick.height &&
      ball.pos.y + ball.height > brick.pos.y
    ) {
      return true;
    }
    return false;
  }

  isCollidingBricks(ball, bricks) {
    let colliding = false;

    bricks.forEach((brick, i) => {
      if (this.isCollidingBrick(ball, brick)) {
        ball.changeYDirection();
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
      ball.changeYDirection();
      console.log('paddle hit');
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
