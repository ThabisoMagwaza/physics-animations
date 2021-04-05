import { Ball } from "../shared/Ball2";
import { Vector2D } from "../shared/Vector2D";

export default function ballParticles(canvas, context) {
  const animTime = 5;
  let animId;
  let t0 = 0;
  let t;

  let ball;

  window.onload = init;

  function init() {
    ball = new Ball();
    ball.pos2D = new Vector2D(150, 50);
    ball.velo2D = new Vector2D(30, 20);
    ball.draw(context);
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
    const dt = 0.001 * (t1 - t0);
    t += dt;
    t0 = t1;
    if (t < animTime) {
      move(dt);
    } else {
      stop();
    }
  }

  function move(dt) {
    ball.pos2D = ball.pos2D.addScaled(ball.velo2D, dt);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw(context);
  }

  function stop() {
    cancelAnimationFrame(animId);
  }
}
