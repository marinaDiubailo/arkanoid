import { canvasSize } from '../../shared/constants.js';
import { PlayGroundItem } from '../../shared/PlayGroundItem.js';

/**
 * Represents the game playground where the game is rendered and controlled.
 */
export class PlayGround {
  /**
   * Creates an instance of PlayGround.
   */
  constructor() {
    /** @type {HTMLElement} */
    this.canvas = document.getElementById('canvas');
    /** @type {CanvasRenderingContext2D} */
    this.context = this.canvas.getContext('2d');
    /** @type {HTMLElement} */
    this.scoreDisplay = document.getElementById('score');
    /** @type {HTMLElement} */
    this.livesDisplay = document.getElementById('lives');
    /** @type {HTMLElement} */
    this.startButton = document.getElementById('start');
  }

  /**
   * Clears the entire canvas.
   * @public
   * @returns {void}
   */
  clear() {
    if (this.context) {
      this.context.clearRect(0, 0, canvasSize.width, canvasSize.height);
    }
  }

  /**
   * Hides the score and lives display.
   * @public
   * @returns {void}
   */
  clearScreen() {
    this.livesDisplay.style.display = 'none';
    this.scoreDisplay.style.display = 'none';
  }

  /**
   * Draws the current score on the score display.
   * @param {number} score - The current score to display.
   * @public
   * @returns {void}
   */
  drawScore(score) {
    if (this.scoreDisplay) {
      this.scoreDisplay.textContent = score;
      this.scoreDisplay.style.display = 'flex';
    }
  }

  /**
   * Draws the remaining lives on the lives display.
   * @param {number} lives - The number of lives to display.
   * @public
   * @returns {void}
   */
  drawLives(lives) {
    if (this.livesDisplay) {
      this.livesDisplay.textContent = lives;
      this.livesDisplay.style.display = 'flex';
      if (lives === 0) {
        this.livesDisplay.style.color = 'red';
      } else {
        this.livesDisplay.style.color = 'inherit';
      }
    }
  }

  /**
   * Draws a single item on the canvas.
   * @param {PlayGroundItem} item - The item to draw, which should have image, pos, width, height, and opacity properties.
   * @public
   * @returns {void}
   */
  drawItem(item) {
    this.context.globalAlpha = item.opacity || 1;

    this.context.drawImage(
      item.image,
      item.pos.x,
      item.pos.y,
      item.width,
      item.height,
    );
    this.context.globalAlpha = 1;
  }

  /**
   * Draws an array of bricks on the canvas.
   * @param {PlayGroundItem[]} bricks - An array of bricks to draw.
   * @public
   * @returns {void}
   */
  drawBricks(bricks) {
    bricks.forEach((item) => this.drawItem(item));
  }

  /**
   * Displays the game result on the canvas.
   * @param {string} text - The result text to display.
   * @public
   * @returns {void}
   */
  drawGameResult(text) {
    this.clear();
    this.context.font = '36px "Stalinist One", sans-serif';
    this.context.fillStyle = 'rgb(230, 79, 10)';
    this.context.textAlign = 'center';
    this.context.fillText(text, canvasSize.width / 2, canvasSize.height / 2);
  }
}
