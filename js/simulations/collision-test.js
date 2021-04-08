import { Ball } from "../shared/Ball2";
import { Vector2D } from "../shared/Vector2D";

export default function CollisionTest(canvas, context) {
  let t0, dt, animId;
  const radius = 15; // ball radius
  const balls = [];

  window.onload = init;

  function init() {
    makeBalls();
    t0 = Date.now();
    animFrame();
  }

  function makeBalls() {
    setupBall("#0000ff", new Vector2D(50, 200), new Vector2D(30, 0));
    setupBall("#ff0000", new Vector2D(500, 200), new Vector2D(-20, 0));
    setupBall("#00ff00", new Vector2D(300, 200), new Vector2D(10, 0));
  }

  function setupBall(color, position, velocity) {
    const ball = new Ball({ radius, color, gradient: true });
    ball.pos2D = position;
    ball.velo2D = velocity;
    ball.draw(context);
    balls.push(ball);
  }

  function animFrame() {
    animId = requestAnimationFrame(animFrame, canvas);
    onTimer();
  }

  function onTimer() {
    const t1 = Date.now();
    dt = 0.001 * (t1 - t0);
    if (dt > 0.2) dt = 0;
    t0 = t1;
    checkCollision();
    move();
  }

  function move() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach((ball) => {
      ball.pos2D = ball.pos2D.addScaled(ball.velo2D, dt);
      ball.draw(context);
    });
  }

  function checkCollision() {
    balls.forEach((ball1, i) => {
      const ball2 = balls[(i + 1) % balls.length];
      //   if (!ball2) return;

      if (
        Vector2D.distance(ball1.pos2D, ball2.pos2D) <=
        ball1.radius + ball2.radius
      ) {
        const tmp = ball1.velo2D;
        ball1.velo2D = ball2.velo2D;
        ball2.velo2D = tmp;
      }
    });
  }
}
