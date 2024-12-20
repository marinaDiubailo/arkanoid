import { canvasSize } from '../../shared/constants';

export class PlayGround {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.scoreDisplay = document.getElementById('score');
    this.livesDisplay = document.getElementById('lives');
    this.startButton = document.getElementById('start');
  }

  clear() {
    if (this.context) {
      this.context.clearRect(0, 0, canvasSize.width, canvasSize.height);
    }
  }

  clearScreen() {
    this.livesDisplay.style.display = 'none';
    this.scoreDisplay.style.display = 'none';
  }

  drawScore(score) {
    if (this.scoreDisplay) {
      this.scoreDisplay.textContent = score;
      this.scoreDisplay.style.display = 'flex';
    }
  }

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

  drawBricks(bricks) {
    bricks.forEach((item) => this.drawItem(item));
  }

  drawGameResult(text) {
    this.clear();
    this.context.font = '36px "Stalinist One", sans-serif';
    this.context.fillStyle = 'rgb(230, 79, 10)';
    this.context.textAlign = 'center';
    this.context.fillText(text, canvasSize.width / 2, canvasSize.height / 2);
  }
}
