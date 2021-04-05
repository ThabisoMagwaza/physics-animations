export function Ball(
  opt = { radius: 20, color: "#0000ff", x: 50, y: 50, vx: 2, vy: 2 }
) {
  this.radius = opt.radius ?? 20;
  this.color = opt.color ?? "#0000ff";
  this.x = opt.x ?? 50;
  this.y = opt.y ?? 50;
  this.vx = opt.vx ?? 2;
  this.vy = opt.vy ?? 0;
}

Ball.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
};
