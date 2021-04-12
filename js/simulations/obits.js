import { Ball } from "../shared/Ball2";
import Force from "../shared/Force";
import { Vector2D } from "../shared/Vector2D";

export default function Orbits(canvas, context, canvas_bg, context_bg) {
  let planet, sun;
  const m = 1; // mass of planet
  const M = 1000000; // mass of sun
  const G = 1;
  const numStars = 100;
  let t0, dt, animId, force, acc;

  window.onload = init;

  function init() {
    drawStars();
    // create stationary sun
    sun = new Ball({ radius: 70, color: "#ff9900", mass: M, gradient: true });
    sun.pos2D = new Vector2D(450, canvas_bg.height / 2);
    sun.draw(context_bg);

    // create a moving planet
    planet = new Ball({
      radius: 10,
      color: "#0000ff",
      gradient: true,
      mass: m,
    });

    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    planet.pos2D = new Vector2D(350, canvas_bg.height / 2);
    planet.velo2D = new Vector2D(0, -120);
    planet.draw(context);

    // make planet orbit
    t0 = Date.now();
    animateFrame();
  }

  function drawStars() {
    // context_bg.fillStyle = "#000000";
    // context_bg.fillRect(0, 0, canvas_bg.width, canvas_bg.height);
    //   create 100 randomly positioned starts
    for (let i = 0; i <= numStars; i++) {
      const star = new Ball({ radius: Math.random() * 2, color: "#ffff00" });
      star.pos2D = new Vector2D(
        Math.random() * canvas_bg.width,
        Math.random() * canvas_bg.height
      );
      star.draw(context_bg);
    }
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
    moveObject(planet);

    calcForces();
    updateAccel();
    updateVelo(planet);
  }

  function moveObject(obj) {
    obj.pos2D = obj.pos2D.addScaled(obj.velo2D, dt);
    debugger;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    obj.draw(context);
  }

  function calcForces() {
    force = Force.gravity(G, m, M, planet.pos2D.subtract(sun.pos2D));
  }

  function updateAccel() {
    acc = force.scaleBy(1 / m);
  }

  function updateVelo(obj) {
    obj.velo2D = obj.velo2D.addScaled(acc, dt);
  }
}
