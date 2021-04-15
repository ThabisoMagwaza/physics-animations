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
export default function Balloon(canvas, context, canvas_bg, context_bg) {
  let ball, t0, dt;
  const m = 1;
  const g = 10;
  const k = 0.001; // drag coefficient
  let force, acc;

  let rhoP = 1.1;
  const rhoInc = 0.001; // number by which to increment rho
  const rho = 1.2;

  let skyGradient;

  window.onload = init;

  function init() {
    // draw background
    context_bg.fillStyle = "#00ff55";
    context_bg.fillRect(0, 500, canvas.width, 100);

    skyGradient = context.createLinearGradient(
      canvas.width / 2,
      0,
      canvas.width / 2,
      canvas.height
    );

    skyGradient.addColorStop(0, "#ffffff");
    skyGradient.addColorStop(1, "#0055ff");

    context.fillStyle = skyGradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // initialize ball
    ball = new Ball({
      radius: 20,
      color: "#ff0000",
      gradient: true,
      mass: m,
    });
    ball.pos2D = new Vector2D(425, 480);
    ball.draw(context);

    // add event listeners
    addEventListener("keydown", changeDensity, false);

    // initialize animation
    t0 = Date.now();
    animFrame();
  }

  function animFrame() {
    requestAnimationFrame(animFrame, canvas);
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

  function changeDensity(e) {
    if (e.keyCode === 38) rhoP += rhoInc; // up arrow
    if (e.keyCode === 40) rhoP -= rhoInc; // down arrow
    console.log(rhoP);
  }

  function moveObject() {
    ball.pos2D = ball.pos2D.addScaled(ball.velo2D, dt);
    context.fillStyle = skyGradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    ball.draw(context);
  }

  function calcForces() {
    const gravity = Force.constantGravity(m, g);
    const V = m / rhoP; // volume of displaced air
    const upthrust = Force.upthrust(rho, V, g);
    const drag = Force.drag(k, ball.velo2D);
    force = Force.add([gravity, upthrust, drag]);
  }

  function updateAccel() {
    acc = force.scaleBy(1 / m);
  }

  function updateVelo() {
    ball.velo2D = ball.velo2D.addScaled(acc, dt);
  }
}
