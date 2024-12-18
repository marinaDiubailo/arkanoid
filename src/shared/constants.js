const canvas = document.getElementById('canvas');
const wrapper = document.getElementById('wrapper');

const CANVAS_WIDTH = 1000;
const OFFSET = 10;
const ASPECT_RATIO = 3 / 5;
const CANVAS_HEIGTH = CANVAS_WIDTH * ASPECT_RATIO;

export const STAGE_PADDING = 10;
export const STAGE_ROWS = 20;
export const STAGE_COLS = 10;
export const BRICK_PADDING = 5;
export const PADDLE_SPEED = 10;
export const BALL_SPEED = 5;

const paddleDimensions = {
  WIDTH: null,
  HEIGHT: null,
  START_X: null,
};

const ballDimensions = {
  SIZE: null,
  START_X: null,
  START_Y: null,
};

const brickDimensions = {
  WIDTH: null,
  HEIGHT: null,
};

const canvasSize = {
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGTH,
};

function adjustDimensions() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (windowWidth <= CANVAS_WIDTH + OFFSET) {
    if ((windowHeight / 3) * 5 < windowWidth) {
      canvasSize.width = ((windowHeight - OFFSET) / 3) * 5;
    } else {
      canvasSize.width = windowWidth - OFFSET;
    }
    canvasSize.height = canvasSize.width * ASPECT_RATIO;
  }

  canvas.width = canvasSize.width;
  canvas.height = canvasSize.height;

  wrapper.style.width = canvasSize.width + 'px';
  wrapper.style.height = canvasSize.height + 'px';

  brickDimensions.WIDTH =
    Math.floor((canvasSize.width - STAGE_PADDING * 2) / STAGE_COLS) -
    BRICK_PADDING;
  brickDimensions.HEIGHT =
    Math.floor((canvasSize.height - STAGE_PADDING * 2) / STAGE_ROWS) -
    BRICK_PADDING;

  paddleDimensions.WIDTH = Math.floor(canvasSize.width / 6);
  paddleDimensions.HEIGHT = Math.floor(canvasSize.height / 25);
  paddleDimensions.START_X = Math.floor(
    canvasSize.width / 2 - paddleDimensions.WIDTH / 2,
  );

  ballDimensions.SIZE = Math.floor(canvasSize.height / 20);
  ballDimensions.START_X = Math.floor(canvasSize.width / 2);
  ballDimensions.START_Y =
    canvasSize.height - paddleDimensions.HEIGHT - ballDimensions.SIZE - 10;
}

window.onload = adjustDimensions;

window.addEventListener('orientationchange', adjustDimensions);

export { brickDimensions, paddleDimensions, ballDimensions, canvasSize };
