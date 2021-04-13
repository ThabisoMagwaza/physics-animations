import { Vector2D } from "../shared/Vector2D";
import { Ball } from "../shared/Ball2";
import Rocket from "../shared/Rocket";
import Force from "../shared/Force";

/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasRenderingContext2D} context
 * @param {HTMLCanvasElement} canvas_bg
 * @param {CanvasRenderingContext2D} context_bg
 */
export default function RocketTest(canvas, context, canvas_bg, context_bg) {
  let rocket, planet, massPlanet, centerPlanet, radiusPlanetSquared;
  const G = 0.1,
    dmdt = 0.5,
    dmdtSide = 0.1,
    fuelMass = 3.5,
    fuelSideMass = 3.5;

  let fuelUsed = 0,
    fuelSideUsed = 0;

  const ve = new Vector2D(0, 200);
  const veSide = new Vector2D(-100, 0);

  let applyTrust = false;
  let showExhaust = true;
  let orientation = 1;
  let animId, t0, dt, acc, force;

  window.onload = init;

  function init() {
    //   create starts
    for (let i = 0; i < 100; i++) {
      const star = new Ball({ color: "#ffff00", radius: 1 });
      star.pos2D = new Vector2D(
        Math.random() * canvas_bg.width,
        Math.random() * canvas_bg.height
      );
      star.draw(context_bg);
    }

    // create a stationary planet
    planet = new Ball({ radius: 100, color: "#0033ff", mass: 1e6 });
    planet.pos2D = new Vector2D(400, 400);
    planet.draw(context_bg);

    massPlanet = planet.mass;
    centerPlanet = planet.pos2D;
    radiusPlanetSquared = planet.radius ** 2;

    // create rocket
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    rocket = new Rocket(12, 12, "#cccccc", 10);
    rocket.pos2D = new Vector2D(400, 300);
    rocket.draw(context, showExhaust);

    // set up event listeners
    window.addEventListener("keydown", startSideThrust, false);
    window.addEventListener("keyUp", stopSideTrust, false);

    // launch the rocket
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
    moveObjects();
    calcForces();
    updateAccel();
    updateVelo();
    updateMass();
    monitor();
  }

  function moveObjects() {
    rocket.pos2D = rocket.pos2D.addScaled(rocket.velo2D, dt);
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    rocket.draw(context, showExhaust);
  }

  function calcForces() {
    const gravity = Force.gravity(
      G,
      massPlanet,
      rocket.mass,
      rocket.pos2D.subtract(centerPlanet)
    );
    let thrust = new Vector2D(0, 0);
    let thrustSide = new Vector2D(0, 0);
    if (fuelUsed < fuelMass) {
      thrust = ve.scaleBy(-dmdt);
    }
    if (fuelSideUsed < fuelSideMass && applyTrust) {
      thrustSide = veSide.scaleBy(-dmdtSide * orientation);
    }
    force = Force.add([gravity, thrust, thrustSide]);
  }

  function updateAccel() {
    acc = force.scaleBy(1 / rocket.mass);
  }

  function updateVelo() {
    rocket.velo2D = rocket.velo2D.addScaled(acc, dt);
  }

  function updateMass() {
    if (fuelUsed < fuelMass) {
      fuelUsed += dmdt * dt;
      rocket.mass += -dmdt * dt;
    }
    if (fuelSideUsed < fuelSideMass && applyTrust) {
      fuelSideUsed += dmdtSide * dt;
      rocket.mass += -dmdtSide * dt;
    }
  }

  function monitor() {
    if (showExhaust && fuelUsed >= fuelMass) {
      showExhaust = false;
    }
    if (
      rocket.pos2D.subtract(centerPlanet).lengthSquared() < radiusPlanetSquared
    ) {
      stop();
    }
  }

  function startSideThrust(e) {
    if (e.keyCode === 39) {
      //right arrow
      applyTrust = true;
      orientation = 1;
    }

    if (e.keyCode === 47) {
      // left arrow
      applyTrust = false;
      orientation = -1;
    }
  }

  function stopSideTrust() {
    applyTrust = false;
  }

  function stop() {
    cancelAnimationFrame(animId);
  }
}
