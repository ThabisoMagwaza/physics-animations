import { Ball } from "./Ball2";
import Triangle from "./Triangle";

export default class Rocket extends Ball {
  constructor(width = 20, height = 40, color = "#0000ff", mass = 1) {
    super({ color, mass });

    this.width = width;
    this.height = height;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param {boolean} isFiring
   */
  draw(context, isFiring) {
    if (isFiring) {
      const exhaust = new Triangle(
        this.x,
        this.y + 0.5 * this.height,
        this.width,
        this.height,
        "#ffff00",
        0.8
      );
      exhaust.draw(context);
    }
    const capsule = new Triangle(
      this.x,
      this.y,
      this.width,
      this.height,
      this.color
    );
    capsule.draw(context);
  }
}
