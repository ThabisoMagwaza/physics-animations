import { Ball } from "../shared/Ball2";
import { Vector2D } from "../shared/Vector2D";

export default function ProjectileTest(canvas, context) {
  let ball1, ball2, t, t0, dt, animId;
  const pos0 = new Vector2D(100, 350);
  const velo0 = new Vector2D(20, -80);
  const acc = new Vector2D(0, 10);
  const animTime = 16;

  window.onload = init;

  function init() {
    ball1 = new Ball({ radius: 15, color: "#000000", gradient: true });
    ball1.pos2D = pos0.clone();
    ball1.velo2D = velo0.clone();
    ball2 = new Ball({ radius: 15, color: "#aaaaaa", gradient: true });
    ball2.pos2D = pos0.clone();
    ball2.velo2D = velo0.clone();

    ball1.draw(context);
    ball2.draw(context);

    t0 = new Date().getTime();
    t = 0;

    animateFrame();
  }

  function animateFrame() {
    animId = requestAnimationFrame(animateFrame, canvas);
    onTimer();
  }

  function onTimer() {
    const t1 = new Date().getTime();
    dt = 0.001 * (t1 - t0);
    if (dt > 0.2) dt = 0; // for for if user switches tab
    t += dt;
    t0 = t1;
    if (t < animTime) {
      move();
    } else {
      stop();
    }
  }

  function move() {
    // Numerical Euler solution
    ball1.pos2D = ball1.pos2D.addScaled(ball1.velo2D, dt);
    ball1.velo2D = ball1.velo2D.addScaled(acc, dt);
    // Analytical solution
    ball2.pos2D = pos0.addScaled(velo0, t).addScaled(acc, 0.5 * t ** 2);
    ball2.velo2D = velo0.addScaled(acc, t);
    // draw
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball1.draw(context);
    ball2.draw(context);
  }

  function stop() {
    cancelAnimationFrame(animId);
  }
}
