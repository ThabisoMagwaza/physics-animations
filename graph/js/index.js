import { Ball } from "../../shared/Ball";
import { Graph } from "../../shared/Graph";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const graph = new Graph(
  context,
  -2.5,
  2.5,
  -10,
  10,
  canvas.width / 2,
  250,
  450,
  350
);

graph.drawgrid(1, 0.1, 2, 0.4);
graph.drawaxes();

const fn = (x) => -0.5 * x ** 5 + 3 * x ** 3 + x ** 2 - 2 * x - 3;

const { xVals, yVals } = graph.createPoints(fn, -2.5, 2.5);
graph.plot(xVals, yVals);

const ball = new Ball({ radius: 10 });
let interval;
let n = 0;
placeBall();
animateBall();

function animateBall() {
  interval = setupTimer();
}

function setupTimer() {
  return setInterval(moveBall, 1000 / 60);
}

function placeBall() {
  ball.x = graph.xValToPx(xVals[0]);
  ball.y = graph.yValToPx(yVals[0]);
  ball.drawOnCanvas(context);
}

function moveBall() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  graph.drawgrid(1, 0.1, 2, 0.4);
  graph.drawaxes();
  graph.plot(xVals, yVals);

  ball.x = graph.xValToPx(xVals[n]);
  ball.y = graph.yValToPx(yVals[n]);
  ball.drawOnCanvas(context);
  n++;
  if (n === xVals.length) {
    clearInterval(interval);
  }
}
