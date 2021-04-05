import { Graph } from "../shared/Graph";

export default function Calculus(canvas, context) {
  const numPoints = 1001;
  const numGrad = 1;
  const xRange = 6;
  let xStep;

  const graph = new Graph(context, -4, 4, -10, 10, 350, 210, 450, 350);
  graph.drawgrid(1, 0.2, 2, 0.5);
  graph.drawaxes("x", "y");

  const fn = (x) => x ** 2;
  const { xVals, yVals } = Graph.createPoints(fn, -3, 3, numPoints);
  graph.plot(xVals, yVals);

  // calculate the gradient using the forward method
  const xAr = [];
  const gradA = [];

  for (let j = 0; j < numPoints - numGrad; j++) {
    xAr.push(xVals[j]);
    gradA.push(Graph.calcGradient(fn, xVals[j], xVals[j + numGrad]));
  }

  graph.plot(xAr, gradA, "#0000ff", false, true);
}
