import { Ball } from "../shared/Ball";
import { Graph } from "../shared/Graph";

export default function GraphFn(canvas, context) {
  const graph = new Graph(
    context,
    -720,
    720,
    -1,
    1,
    canvas.width / 2,
    250,
    450,
    350
  );

  graph.drawgrid(180, 36, 0.5, 0.1);
  graph.drawaxes();

  const fn = (x) => -0.5 * x ** 5 + 3 * x ** 3 + x ** 2 - 2 * x - 3;
  const fn2 = (x) => Math.exp(-x * x);
  const fnHill = (x) =>
    0.1 *
    x *
    x *
    (x + 3.6) *
    (x + 2.5) *
    (x + 1) *
    (x - 0.5) *
    (x - 2) *
    (x - 3.5) *
    Math.exp((-x * x) / 4);

  const unitCircle = (x) => Math.sqrt(1 - x ** 2);

  let { xVals, yVals } = Graph.createPoints(
    (x) => Math.tan(x * (Math.PI / 180)),
    -720,
    720
  );
  // for (var i = 0; i <= 1000; i++) {
  //   var t = 0.01 * i;
  //   xVals[i] = Math.sin(2 * t);
  //   yVals[i] = Math.cos(2 * t);
  // }
  graph.plot(xVals, yVals);

  const ball = new Ball({ radius: 10 });
  let interval;
  let n = 0;
  // placeBall();
  // animateBall();

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

    graph.drawgrid(1, 0.2, 1, 0.2);
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
}
