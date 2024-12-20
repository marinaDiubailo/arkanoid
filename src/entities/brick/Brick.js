import { PlayGroundItem } from '../../shared/PlayGroundItem';

export class Brick extends PlayGroundItem {
  #energy;
  #opacity = 1;

  constructor(width, height, position, energy, image) {
    super(width, height, position, image);
    this.#energy = energy;
  }

  get energy() {
    return this.#energy;
  }

  set energy(energy) {
    this.#energy = energy;
  }

  get opacity() {
    return this.#opacity;
  }

  set opacity(opacity) {
    this.#opacity = opacity;
  }
}
