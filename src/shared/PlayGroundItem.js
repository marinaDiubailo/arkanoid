export class PlayGroundItem {
  #width;
  #height;
  #position;
  #entityImage = new Image();

  constructor(width, height, position, image) {
    this.#width = width;
    this.#height = height;
    this.#position = position;
    this.#entityImage.src = image;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get pos() {
    return this.#position;
  }

  get image() {
    return this.#entityImage;
  }
}
