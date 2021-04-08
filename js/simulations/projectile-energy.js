import { Ball } from "../shared/Ball2";
import { Graph } from "../shared/Graph";
import { Vector2D } from "../shared/Vector2D";

export default function ProjectileEnergy(
  canvas,
  context,
  canvas_bg,
  context_bg
) {
  let ball, animId, graph;
  const m = 1,
    g = 10,
    u = 50,
    groundLevel = 350;
  let n = 0,
    tA = [],
    hA = [],
    peA = [],
    keA = [],
    teA = [];

  window.onload = init;

  function init() {
    ball = new Ball({ radius: 15, color: "#000000", gradient: true, mass: m });
    ball.pos2D = new Vector2D(750, groundLevel);
    ball.draw(context);
    setupGraph();
    setupArray();
    animFrame();
  }

  function setupGraph() {
    graph = new Graph(context_bg, 0, 10, 0, 1500, 200, 350, 450, 300);
    graph.drawgrid(1, 0.5, 500, 100);
    graph.drawaxes("t", "p.e,k.e,total");
  }

  function setupArray() {
    let t, v;
    for (let i = 0; i <= 100; i++) {
      tA[i] = i * 0.1;
      t = tA[i];
      v = u - g * t;
      hA[i] = u * t - 0.5 * g * t ** 2;
      peA[i] = m * g * hA[i];
      keA[i] = 0.5 * v ** 2;
      teA[i] = peA[i] + keA[i];
    }
  }

  function animFrame() {
    setTimeout(() => {
      animId = requestAnimationFrame(animFrame, canvas);
      animate();
    }, 1000 / 10);
  }

  function animate() {
    moveObjects();
    plotGraphs();
    n++;
    if (n === hA.length) stop();
  }

  function moveObjects() {
    ball.y = groundLevel - hA[n];
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw(context);
  }

  function plotGraphs() {
    graph.plot([tA[n]], [peA[n]], "#ff0000", true, false);
    graph.clear();
    graph.plot([tA[n]], [keA[n]], "#0000ff", true, false);
    graph.clear();
    graph.plot([tA[n]], [teA[n]], "#000000", true, false);
    graph.clear();
  }

  function stop() {
    cancelAnimationFrame(animId);
  }
}
