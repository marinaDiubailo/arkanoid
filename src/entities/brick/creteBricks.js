import {
  STAGE_COLS,
  BRICK_PADDING,
  STAGE_PADDING,
  brickDimensions,
} from '../../shared/constants.js';
import { BRICK_ENERGY, BRICK_IMAGES } from './constants.js';
import { Brick } from './Brick.js';

/**
 * Creates an array of bricks based on the specified level configuration.
 * @param {number[]} level - An array representing the level layout where each element indicates the type of brick.
 * @returns {Brick[]} An array of Brick instances created based on the level layout.
 */
export function createBricks(level) {
  return level.reduce((acc, element, i) => {
    const row = Math.floor((i + 1) / STAGE_COLS);
    const col = i % STAGE_COLS;

    const x = STAGE_PADDING + col * (brickDimensions.WIDTH + BRICK_PADDING);
    const y = STAGE_PADDING + row * (brickDimensions.HEIGHT + BRICK_PADDING);

    if (element === 0) return acc;

    return [
      ...acc,
      new Brick(
        brickDimensions.WIDTH,
        brickDimensions.HEIGHT,
        { x, y },
        BRICK_ENERGY[element],
        BRICK_IMAGES[element],
      ),
    ];
  }, []);
}
