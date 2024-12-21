import './styles/index.scss';

import { Game, GAME_WON } from './core/Game.js';

class App {
  constructor() {
    if (App.instance) {
      return App.instance;
    }

    this.totalCountPannel = document.getElementById('total');
    this.startPannel = document.getElementById('start');
    this.canvasWrapper = document.getElementById('wrapper');
    this.levelButtons = document.querySelectorAll('#levels button');

    this.level = 1;
    this.totalScore = 0;

    this.#init();

    App.instance = this;
  }

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

  #unlockNextLevel() {
    if (this.level <= this.levelButtons.length) {
      this.levelButtons[this.level - 1].disabled = false;
    }
  }

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

  #startNewGame(level) {
    const game = new Game(level, this.#onGameFinished.bind(this));
    game.start();
  }

  static getInstance() {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }
}

App.getInstance();
