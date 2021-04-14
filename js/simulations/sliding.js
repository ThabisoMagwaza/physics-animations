import { Ball } from "../shared/Ball2";
import Force from "../shared/Force";
import { Vector2D } from "../shared/Vector2D";

/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasRenderingContext2D} context
 * @param {HTMLCanvasElement} canvas_bg
 * @param {CanvasRenderingContext2D} context_bg
 */
export default function Sliding(canvas, context, canvas_bg, context_bg) {
  let ball;
  const m = 1;
  const g = 10;
  const ck = 0.2; // coeff of kinetic friction
  const cs = 0.25; // coeff of stating friction
  const vtol = 0.000001; // tolarance
  // inclined plane
  const xtop = 50,
    ytop = 150,
    xbot = 450,
    ybot = 250;

  const angle = Math.atan2(ytop - ybot, xtop - xbot); // angle of incline
  let t0, dt, animId, force, acc;

  window.onload = init;

  function init() {
    //   create ball
    ball = new Ball({ radius: 20, color: "#0000ff", mass: m, gradient: true });
    ball.pos2D = new Vector2D(50, 130);
    ball.velo2D = new Vector2D(0, 0);
    ball.draw(context);
    // create an inclined plane
    context_bg.strokeStyle = "#333333";
    context_bg.beginPath();
    context_bg.moveTo(xtop, ytop);
    context_bg.lineTo(xbot, ybot);
    context_bg.closePath();
    context_bg.stroke();
    // make ball move
    t0 = Date.now();
    animFrame();
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
    move();
  }

  function move() {
    moveObject();
    calcForces();
    updateAccel();
    updateVelo();
  }

  function moveObject() {
    ball.pos2D = ball.pos2D.addScaled(ball.velo2D, dt);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw(context);
  }

  function calcForces() {
    const gravity = Force.constantGravity(m, g);
    const normal = Vector2D.vector2D(
      m * g * Math.cos(angle),
      0.5 * Math.PI - angle,
      false
    );

    let coeff;
    if (ball.velo2D.length() < vtol) {
      coeff = Math.min(cs * normal.length(), m * g * Math.sin(angle)); // static friction
    } else {
      coeff = ck * normal.length(); // kinetic friction
    }

    const friction = normal.perp(coeff);

    force = Force.add([gravity, friction, normal]);
    debugger;
  }

  function updateAccel() {
    acc = force.scaleBy(1 / m);
  }

  function updateVelo() {
    ball.velo2D = ball.velo2D.addScaled(acc, dt);
  }
}
