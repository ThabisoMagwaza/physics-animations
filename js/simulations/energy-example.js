import { Ball } from "../shared/Ball2";
import { Vector2D } from "../shared/Vector2D";
import { Graph } from "../shared/Graph";

export default function EnergyExample(canvas, context, canvas_bg, context_bg) {
  let car, t, t0, dt, animId, graph, force, acc;
  const g = 10,
    k = 0.5,
    animTime = 60,
    powerLossFactor = 0.1,
    powerApplied = 200;

  let ke,
    vmag,
    mass,
    applyTrust = false;

  window.onload = init;

  function init() {
    car = new Ball({ radius: 15, color: "#000000", gradient: true });
    car.pos2D = new Vector2D(50, 50);
    car.velo2D = new Vector2D(20, 0);
    car.draw(context);

    mass = car.mass;
    vmag = car.velo2D.length();
    ke = 0.5 * mass * vmag ** 2;
    window.addEventListener("keydown", startThrust, false);
    window.addEventListener("keyup", stopThrust, false);
    setupGraphs();

    t0 = new Date().getTime();
    t = 0;

    animateFrame();
  }

  function startThrust(e) {
    if (e.keyCode === 38) applyTrust = true;
  }

  function stopThrust(e) {
    if (e.keyCode === 38) applyTrust = false;
  }

  function setupGraphs() {
    graph = new Graph(context_bg, 0, animTime, 0, 50, 100, 550, 600, 400);
    graph.drawgrid(5, 1, 5, 1);
    graph.drawaxes("times(s)", "velocity (px/s)");
  }

  function animateFrame() {
    animId = requestAnimationFrame(animateFrame, canvas);
    onTimer();
  }

  function onTimer() {
    const t1 = new Date().getTime();
    dt = 0.001 * (t1 - t0);
    if (dt > 0.2) dt = 0; // fix for when users swicht tabs
    t += dt;
    t0 = t1;

    if (t < animTime) {
      move();
    } else {
      stop();
    }
  }

  function move() {
    moveObjects();
    applyPower();
    updateVelo();
    plotGraphs();
  }

  function moveObjects() {
    car.pos2D = car.pos2D.addScaled(car.velo2D, dt);
    context.clearRect(0, 0, canvas.width, canvas.height);
    car.draw(context);
  }

  function applyPower() {
    if (applyTrust) {
      ke += powerApplied * dt;
    }
    ke -= powerLossFactor * vmag ** 2 * dt;
  }

  function updateVelo() {
    vmag = Math.sqrt((2 * ke) / mass);
    car.vx = vmag;
  }

  function plotGraphs() {
    graph.plot([t], [car.vx]);
  }

  function stop() {
    cancelAnimationFrame(animId);
  }
}
