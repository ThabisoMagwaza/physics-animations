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
   * Drag force at low velocities (linear drag)
   * @param {Number} k drag coefficeint
   * @param {Vector2D} vel velocity
   */
  static linearDrag(k, vel) {
    let force;
    const velMag = vel.length();
    velMag > 0 ? (force = vel.scaleBy(-k)) : (force = new Vector2D(0, 0));

    return force;
  }

  /**
   * Drag force at high velocities (quadratic drag)
   * @param {Number} k drag coefficient
   * @param {Vector2D} vel velocity
   */
  static drag(k, vel) {
    let force;
    const velMag = vel.length();
    velMag > 0
      ? (force = vel.scaleBy(-k * velMag))
      : (force = new Vector2D(0, 0));
    return force;
  }

  /**
   * Sums forces
   * @param {Array} forces array of forces
   * @returns {Vector2D} resultant vector
   */
  static add(forces) {
    return forces.reduce(
      (force, resultant) => resultant.incrementBy(force),
      new Vector2D(0, 0)
    );
  }

  /**
   *
   * @param {Number} G Newtown's gravitational constant
   * @param {Number} m1 mass of object1
   * @param {Number} m2 mass of object2
   * @param {Number} r distance vector from object1 to object 2
   * @returns {Vector2D} gravitational force experieced by object1 due to object2
   */
  static gravity(G, m1, m2, r) {
    return r.length() == 0
      ? new Vector2D(0, 0)
      : r.scaleBy((-G * m1 * m2) / r.length() ** 3);
  }

  static upthrust(rho, V, g) {
    return new Vector2D(0, -rho * V * g);
  }
}
