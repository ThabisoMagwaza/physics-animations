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

export default function TwoMasses(canvas, context, canvas_bg, context_bg) {
  let ball1, ball2;
  const r1 = 10,
    r2 = 40,
    m1 = 10,
    m2 = 60;

  const G = 100000;
  let t0, dt;

  let force, acc;

  window.onload = init;

  function init() {
    const ball1Opt = {
      radius: r1,
      color: "#0000ff",
      mass: m1,
      gradient: true,
    };

    const ball2Opt = {
      radius: r2,
      color: "#ff0000",
      mass: m2,
      gradient: true,
    };

    debugger;
    const ball1Init = new Ball(ball1Opt);
    ball1Init.pos2D = new Vector2D(150, 200);
    ball1Init.draw(context_bg);

    const ball2Init = new Ball(ball2Opt);
    ball2Init.pos2D = new Vector2D(350, 200);
    ball2Init.draw(context_bg);

    ball1Opt.color = "#9999ff";
    ball1 = new Ball(ball1Opt);
    ball1.pos2D = new Vector2D(150, 200);
    ball1.velo2D = new Vector2D(0, 150);
    ball1.draw(context);

    ball2Opt.color = "#ff9999";
    ball2 = new Ball(ball2Opt);
    ball2.pos2D = ball2Init.pos2D;
    ball2.velo2D = new Vector2D(0, -2.5);
    ball2.draw(context);

    t0 = Date.now();
    animateFrame();
  }

  function animateFrame() {
    requestAnimationFrame(animateFrame, canvas);
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
    context.clearRect(0, 0, canvas.width, canvas.height);
    moveObject(ball1);
    moveObject(ball2);
    calcForce(ball1, ball2); // force on ball1 due to ball2
    update(ball1);
    calcForce(ball2, ball1); // force on ball2 due to ball1
    update(ball2);
  }

  /**
   *
   * @param {Ball} obj
   */
  function moveObject(obj) {
    obj.pos2D = obj.pos2D.addScaled(obj.velo2D, dt);
    obj.draw(context);
  }

  /**
   * Calc gravitational force on obj2 due to obj1
   * @param {Ball} obj1
   * @param {Ball} obj2
   */
  function calcForce(obj1, obj2) {
    force = Force.gravity(
      G,
      obj1.mass,
      obj2.mass,
      obj1.pos2D.subtract(obj2.pos2D)
    );
  }

  /**
   *
   * @param {Ball} obj
   */
  function update(obj) {
    updateAccel(obj);
    updateVelo(obj);
  }

  /**
   *
   * @param {Ball} obj
   */
  function updateAccel(obj) {
    acc = force.scaleBy(1 / obj.mass);
  }

  /**
   *
   * @param {Ball} obj
   */
  function updateVelo(obj) {
    obj.velo2D = obj.velo2D.addScaled(acc, dt);
  }
}
