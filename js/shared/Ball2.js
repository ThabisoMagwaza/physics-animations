import { Particle } from "./Particle";

export class Ball extends Particle {
  constructor(
    opt = {
      radius: 20,
      color: "#0000ff",
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      mass: 1,
      charge: 0,
      gradient: false,
    }
  ) {
    super(opt.mass ?? 1, opt.charge ?? 0);
    this.x = opt.x ?? 0;
    this.y = opt.y ?? 0;
    this.vx = opt.vx ?? 0;
    this.vy = opt.vy ?? 0;
    this.gradient = opt.gradient ?? false;
    this.radius = opt.radius ?? 20;
    this.color = opt.color ?? "#0000ff";
  }

  draw(ctx) {
    if (this.gradient) {
      const grad = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.radius
      );

      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(1, this.color);
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = this.color;
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
  }
}
