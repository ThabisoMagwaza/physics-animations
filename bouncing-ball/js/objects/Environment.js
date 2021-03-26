export function Environment() {
  this.gravity = 0.1;
  this.width = 500;
  this.height = 500;
  this.gravity = 0.1;
  this.isPlaying = true;
}

Environment.prototype.clearCanvas = function (ctx) {
  ctx.clearRect(0, 0, this.width, this.height);
};
