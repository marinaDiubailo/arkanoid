import { PlayGroundItem } from '../../shared/PlayGroundItem';

export class Brick extends PlayGroundItem {
  #energy;

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
}
