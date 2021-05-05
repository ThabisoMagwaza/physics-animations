import { Ball } from "../shared/Ball2";
import Force from "../shared/Force";
import { Vector2D } from "../shared/Vector2D";

export default function FloatingBall(canvas, context, canvas_bg, context_bg) {
  let ball, t0, dt, animId, force, acc;
  const g = 50,
    k = 0.01,
    rho = 1.5,
    V = 1,
    ylevel = 300,
    vfac = -0.8;

  // window.onload = init;
  init();

  function init() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context_bg.clearRect(0, 0, canvas.width, canvas.height);

    ball = new Ball({ radius: 40, color: "#0000ff", gradient: true });
    ball.pos2D = new Vector2D(50, 50);
    ball.velo2D = new Vector2D(40, -20);
    ball.draw(context);

    // create water
    context_bg.fillStyle = "rgba(0,255,255,0.5)";
    context_bg.fillRect(0, ylevel, canvas.width, canvas.height);

    // set up event listeners
    addEventListener("mousedown", onDown, false);
    addEventListener("mouseup", onUp, false);

    // initialize time and animate
    initAnim();
  }

  function onDown(e) {
    const boundingRect = canvas.getBoundingClientRect();

    ball.velo2D = new Vector2D(0, 0);

    ball.pos2D = new Vector2D(
      e.clientX - boundingRect.left,
      e.clientY - boundingRect.top
    );
    moveObjects();
    stop();
  }

  function onUp(e) {
    ball.velo2D = new Vector2D(e.clientX - ball.x, e.clientY - ball.y);
    initAnim();
  }

  function initAnim() {
    t0 = Date.now();
    animateFrame();
  }

  function animateFrame() {
    animId = requestAnimationFrame(animateFrame, canvas);
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
    moveObjects();
    calcForce();
    updateAccel();
    updateVelo();
  }

  function stop() {
    cancelAnimationFrame(animId);
  }

  function moveObjects() {
    ball.pos2D = ball.pos2D.addScaled(ball.velo2D, dt);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw(context);
  }

  function calcForce() {
    const gravity = Force.constantGravity(ball.mass, g);
    const rball = ball.radius,
      xball = ball.x,
      yball = ball.y;

    const dr = (yball - ylevel) / rball;
    let ratio; // volume fractio of object that is submerged

    if (dr <= -1) {
      // object is completely out of water
      ratio = 0;
    } else if (dr < 1) {
      // object is partially in the water
      ratio = 0.5 + 0.25 * dr * (3 - dr ** 2); // for sphere
    } else {
      // object is completely submerged
      ratio = 1;
    }

    const upthrust = new Vector2D(0, -rho * V * ratio * g);
    const drag = ball.velo2D.scaleBy(-ratio * k * ball.velo2D.length());
    force = Force.add([upthrust, gravity, drag]);

    if (xball < rball) {
      ball.xpos = rball;
      ball.vx *= vfac;
    }
    if (xball > canvas.width - rball) {
      ball.xpos = canvas.width - rball;
      ball.vx *= vfac;
    }
  }

  function updateAccel() {
    acc = force.scaleBy(1 / ball.mass);
  }

  function updateVelo() {
    ball.velo2D = ball.velo2D.addScaled(acc, dt);
  }
}
