import { Ball } from "../shared/Ball2";
import Force from "../shared/Force";
import { Graph } from "../shared/Graph";
import { Vector2D } from "../shared/Vector2D";

export default function ForceExample(canvas, context, canvas_bg, context_bg) {
  let ball, t, dt, animId, graphAcc, graphVelo, force, acc, t0;
  const g = 10;
  const k = 0.5;
  const animTime = 30;

  window.onload = init;

  function init() {
    ball = new Ball({ radius: 15, color: "#0000", gradient: true });
    ball.pos2D = new Vector2D(75, 20);
    ball.velo2D = new Vector2D(0, 0);
    ball.draw(context);
    setupGraphs();
    t0 = new Date().getTime();
    t = 0;
    animFrame();
  }

  function setupGraphs() {
    graphAcc = new Graph(context_bg, 0, 30, 0, 10, 150, 250, 600, 200);
    graphAcc.drawgrid(5, 1, 5, 1);
    graphAcc.drawaxes("times (s)", "acceleration (px/s^2)");
    graphVelo = new Graph(context_bg, 0, 30, 0, 25, 150, 550, 600, 200);
    graphVelo.drawgrid(5, 1, 5, 1);
    graphVelo.drawaxes("times (s)", "velocity (px/s)");
  }

  function animFrame() {
    animId = requestAnimationFrame(animFrame, canvas);
    onTimer();
  }

  function onTimer() {
    const t1 = new Date().getTime();
    dt = 0.001 * (t1 - t0);

    if (dt > 0.2) dt = 0; // fix for when user switches tabs

    t += dt;
    t0 = t1;
    if (t < animTime) {
      move();
    } else {
      stop();
    }

    function stop() {
      cancelAnimationFrame(animId);
    }

    function move() {
      moveObject();
      calcForce();
      updateAcc();
      updateVelo();
      plotGraphs();
    }

    function moveObject() {
      ball.pos2D = ball.pos2D.addScaled(ball.velo2D, dt);
      context.clearRect(0, 0, canvas.width, canvas.height);
      ball.draw(context);
    }

    function calcForce() {
      // force = new Vector2D(0, ball.mass * g - k * ball.vy);
      debugger;
      force = Force.add([
        Force.constantGravity(ball.mass, g),
        Force.linearDrag(k, ball.velo2D),
      ]);
    }

    function updateAcc() {
      acc = force.scaleBy(1 / ball.mass);
    }

    function updateVelo() {
      ball.velo2D = ball.velo2D.addScaled(acc, dt);
    }

    function plotGraphs() {
      graphAcc.plot([t], [acc.y], "#ff0000");
      graphVelo.plot([t], [ball.vy], "#ff0000");
    }
  }
}
