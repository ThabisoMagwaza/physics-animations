import { Vector2D } from "./Vector2D";

export default class Force {
  constructor() {}
  /**
   *
   * @returns {Vector2D} zero 2D force
   */
  static zeroForce() {
    return new Vector2D(0, 0);
  }
  /**
   *
   * @param {Number} m mass
   * @param {Number} g gravitational force
   * @returns {Vector2D} downwards pointing gravitational vector
   */
  static constantGravity(m, g) {
    return new Vector2D(0, m * g);
  }

  /**
   *
   * @param {Number} k drag coefficeint
   * @param {Vector2D} vel velocity
   */
  static linearDrag(k, vel) {
    let force;
    const velMag = vel.length();
    velMag > 0 ? (force = vel.scaleBy(-k)) : new Vector2D(0, 0);

    return force;
  }

  /**
   * Sums forces
   * @param {Array} forces array of forces
   * @returns {Vector2D} resultant vector
   */
  static add(forces) {
    return forces.reduce(
      (force, resultant) => resultant.incremenBy(force),
      new Vector2D(0, 0)
    );
  }
}
