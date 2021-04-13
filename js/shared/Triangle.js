export default class Triangle {
  constructor(
    x = 10,
    y = 10,
    width = 10,
    height = 20,
    color = "#ffff00",
    alpha = 1,
    isEmpty = false
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.alpha = alpha;
    this.isEmpty = isEmpty;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  draw(context) {
    context.save();
    if (this.isEmpty) {
      context.strokeStyle = this.color;
    } else {
      context.globalAlpha = this.alpha;
      context.fillStyle = this.color;
    }

    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x + this.width, this.y);
    context.lineTo(this.x + this.width / 2, this.y - this.height);
    context.lineTo(this.x, this.y);
    context.closePath();

    if (this.isEmpty) {
      context.stroke();
    } else {
      context.fill();
    }

    context.restore();
  }
}
