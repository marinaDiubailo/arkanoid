const wrapper = document.getElementById('wrapper');

const CANVAS_WIDTH = 1000;
const OFFSET = 10;
const ASPECT_RATIO = 3 / 5;
const CANVAS_HEIGTH = CANVAS_WIDTH * ASPECT_RATIO;
const INITIAL_BALL_OFFSET = 5;
const INITIAL_BALL_SPEED = 5;

export const STAGE_PADDING = 10;
export const STAGE_ROWS = 16;
export const STAGE_COLS = 10;
export const BRICK_PADDING = 2;

export const PADDLE_SPEED = 5;

const paddleDimensions = {
  WIDTH: null,
  HEIGHT: null,
  START_X: null,
  START_Y: null,
};

const ballDimensions = {
  SIZE: null,
  START_X: null,
  START_Y: null,
  SPEED: INITIAL_BALL_SPEED,
};

const brickDimensions = {
  WIDTH: null,
  HEIGHT: null,
};

const canvasSize = {
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGTH,
  OFFSET_LEFT: null,
};

function adjustDimensions() {
  const canvas = document.getElementById('canvas');

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

  const rect = canvas.getBoundingClientRect();
  canvasSize.OFFSET_LEFT = rect.left;

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
  paddleDimensions.START_Y = canvasSize.height - paddleDimensions.HEIGHT;

  ballDimensions.SIZE = Math.floor(canvasSize.height / 20);
  ballDimensions.START_X = Math.floor(canvasSize.width / 2);
  ballDimensions.START_Y =
    canvasSize.height -
    paddleDimensions.HEIGHT -
    ballDimensions.SIZE -
    (canvasSize.width < 720 ? 3 : INITIAL_BALL_OFFSET);
  ballDimensions.SPEED = canvasSize.width < 720 ? 3 : INITIAL_BALL_SPEED;
}

window.onload = adjustDimensions;

window.addEventListener('orientationchange', adjustDimensions);

export { brickDimensions, paddleDimensions, ballDimensions, canvasSize };
