import { Graph } from "./Graph";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const graph = new Graph(context, -4, 4, 0, 20, canvas.width / 2, 380, 450, 350);

graph.drawgrid(1, 0.2, 5, 1);
graph.drawaxes();
var xA = new Array();
var yA = new Array();
for (var i = 0; i <= 100; i++) {
  xA[i] = (i - 50) * 0.08;
  yA[i] = xA[i] * xA[i];
}
graph.plot(xA, yA);
