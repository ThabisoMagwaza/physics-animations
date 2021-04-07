export class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   *
   * @returns {Number} length of the vector squared
   */
  lengthSquared() {
    return this.x ** 2 + this.y ** 2;
  }

  /**
   *
   * @returns {Number} length of the vectore
   */
  length() {
    return Math.sqrt(this.lengthSquared());
  }

  /**
   *
   * @returns {Vector2D} A new vector that is a clone of the current one
   */
  clone() {
    return new Vector2D(this.x, this.y);
  }

  /**
   * Negates the direction of the vector in both x and y directions
   * @returns {Vector2D} resultant vector
   */
  negate() {
    return new Vector2D(-this.x, -this.y);
  }

  /**
   * Normalize the current vector
   * @returns {Vector2D} resultant vector
   */
  normalize() {
    const length = this.length();
    if (length > 0) {
      this.x /= length;
      this.y /= length;
    }
    return this;
  }

  /**
   * Sums two vectors
   * @param {Vector2D} vec
   * @returns {Vector2D} resultant vector
   */
  add(vec) {
    return new Vector2D(this.x + vec.x, this.y + vec.y);
  }

  /**
   * Adds k*vec to the vector
   * @param {Vector2D} vec
   * @param {Number} k
   */
  addScaled(vec, k) {
    return this.incrementBy(vec.scaleBy(k));
  }

  /**
   * Increments the vector by a given vector
   * @param {Vector2D} vec
   * @returns {Vector2D} new Vector2D
   */
  incrementBy(vec) {
    return new Vector2D(this.x + vec.x, this.y + vec.y);
  }

  /**
   * Subtracts the given vector from this vector
   * @param {Vector2D} vec
   * @returns {Vector2D} resultant vector
   */
  subtract(vec) {
    return new Vector2D(this.x - vec.x, this.y - vec.y);
  }

  /**
   * Decrement the vector by a given vector
   * @param {Vector2D} vec
   * @returns {Vector2D} resultant vector
   */
  decrementBy(vec) {
    return new Vector2D(this.x - vec.x, this.y - vec.y);
  }

  /**
   * Scales the vector by scalar k
   * @param {Number} k
   * @returns {Vector2D} resultant vector
   */
  scaleBy(k) {
    return new Vector2D(this.x * k, this.y * k);
  }

  /**
   * Calculates the dot product
   * @param {Vector2D} vec
   * @returns {Number} dot product of current vector and vec
   */
  dotProduct(vec) {
    return this.x * vec.x + this.y * vec.y;
  }

  /**
   * Calculates the disctance between two vectors
   * @param {Vector2D} vec1
   * @param {Vector2D} vec2
   * @returns {Number} disctance between vec1 and vec2
   */
  static distance(vec1, vec2) {
    return vec1.subtract(vec2).length();
  }

  /**
   * Calculates angle between two vectors
   * @param {Vector2D} vec1
   * @param {Vector2D} vec2
   * @returns {Number} Angle between vec1 and vec2 in radians
   */
  static angleBetween(vec1, vec2) {
    return Math.acos(vec1.dotProduct(vec2) / (vec1.length() * vec2.length()));
  }
}
