/**
 * Represents a generic item in the playground.
 * This class serves as a base class for other game entities like balls, paddles, and bricks.
 * @class
 */
export class PlayGroundItem {
  #width;
  #height;
  #position;
  #entityImage = new Image();

  /**
   * Creates an instance of PlayGroundItem.
   * @param {number} width - The width of the item.
   * @param {number} height - The height of the item.
   * @param {{x: number, y: number}} position - The position of the item on the canvas.
   * @param {string} image - The source URL of the item's image.
   */
  constructor(width, height, position, image) {
    this.#width = width;
    this.#height = height;
    this.#position = position;
    this.#entityImage.src = image;
  }

  /**
   * Gets the width of the item.
   * @returns {number} The width of the item.
   */
  get width() {
    return this.#width;
  }

  /**
   * Gets the height of the item.
   * @returns {number} The height of the item.
   */
  get height() {
    return this.#height;
  }

  /**
   * Gets the position of the item.
   * @returns {{x: number, y: number}} The position of the item.
   */
  get pos() {
    return this.#position;
  }

  /**
   * Gets the image of the item.
   * @returns {HTMLImageElement} The image of the item.
   */
  get image() {
    return this.#entityImage;
  }
}
