import { PlayGroundItem } from '../../shared/PlayGroundItem.js';

/**
 * Represents a brick in the game, which can have energy and opacity.
 * @class
 * @extends PlayGroundItem
 */
export class Brick extends PlayGroundItem {
  #energy;
  #opacity = 1;

  /**
   * Creates an instance of Brick.
   * @param {number} width - The width of the brick.
   * @param {number} height - The height of the brick.
   * @param {{x: number, y: number}} position - The position of the brick on the canvas.
   * @param {number} energy - The energy of the brick, which determines its durability.
   * @param {string} image - The source URL of the brick's image.
   */
  constructor(width, height, position, energy, image) {
    super(width, height, position, image);
    this.#energy = energy;
  }

  /**
   * Gets the energy of the brick.
   * @returns {number} The current energy of the brick.
   */
  get energy() {
    return this.#energy;
  }

  /**
   * Sets the energy of the brick.
   * @param {number} energy - The new energy value for the brick.
   * @returns {void}
   */
  set energy(energy) {
    this.#energy = energy;
  }

  /**
   * Gets the opacity of the brick.
   * @returns {number} The current opacity of the brick.
   */
  get opacity() {
    return this.#opacity;
  }

  /**
   * Sets the opacity of the brick.
   * @param {number} opacity - The new opacity value for the brick (should be between 0 and 1).
   * @returns {void}
   */
  set opacity(opacity) {
    this.#opacity = opacity;
  }
}
