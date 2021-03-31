import { Graph } from "./Graph";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const graph = new Graph(context, -4, 4, 0, 20, canvas.width / 2, 380, 450, 350);

graph.drawgrid(1, 0.2, 5, 1);
graph.drawaxes();

const { xVals, yVals } = graph.createPoints((x) => 2 * x + 1, 0, 4);
debugger;
graph.plot(xVals, yVals);
