import './styles/index.scss';

import { Game, GAME_WON } from './core/Game.js';

/**
 * Represents the main application.
 * Implements a singleton pattern to ensure only one instance exists.
 */
class App {
  /**
   * Creates an instance of the App class.
   * Initializes UI elements and sets up event listeners.
   */
  constructor() {
    if (App.instance) {
      return App.instance;
    }

    /** @type {HTMLElement} */
    this.totalCountPannel = document.getElementById('total');
    /** @type {HTMLElement} */
    this.startPannel = document.getElementById('start');
    /** @type {HTMLElement} */
    this.canvasWrapper = document.getElementById('wrapper');
    /** @type {HTMLElement} */
    this.levelButtons = document.querySelectorAll('#levels button');

    this.level = 1;
    this.totalScore = 0;

    this.#init();

    App.instance = this;
  }

  /**
   * Initializes event listeners for level buttons.
   * @private
   * @returns {void}
   */
  #init() {
    this.levelButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        if (!button.disabled) {
          this.level = index + 1;
          this.startPannel.style.display = 'none';
          this.canvasWrapper.style.visibility = 'visible';
          this.#startNewGame(this.level);
        }
      });
    });
  }

  /**
   * Unlocks the next level button if applicable.
   * @private
   * @returns {void}
   */
  #unlockNextLevel() {
    if (this.level <= this.levelButtons.length) {
      this.levelButtons[this.level - 1].disabled = false;
    }
  }

  /**
   * Handles the end of the game, updates the score and level.
   * @param {string} result - The result of the game (e.g., GAME_WON).
   * @param {number} score - The score achieved in the game.
   * @private
   * @returns {void}
   */
  #onGameFinished(result, score) {
    if (result === GAME_WON) {
      this.totalScore += score;
      this.totalCountPannel.innerText = this.totalScore;
      this.level++;
      this.#unlockNextLevel();
    }

    setTimeout(() => {
      this.startPannel.style.display = 'flex';
      this.canvasWrapper.style.visibility = 'hidden';
    }, 2000);
  }

  /**
   * Starts a new game at the specified level.
   * @param {number} level - The level to start the new game at.
   * @private
   * @returns {void}
   */
  #startNewGame(level) {
    const game = new Game(level, this.#onGameFinished.bind(this));
    game.start();
  }

  /**
   * Gets the singleton instance of the App class.
   * @static
   * @returns {App} The instance of the App class.
   */
  static getInstance() {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }
}

App.getInstance();
