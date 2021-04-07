import ballParticles from "./simulations/ball-particle";
import bouncingBall from "./simulations/bouncing-ball";
import Calculus from "./simulations/calculus";
import GraphFn from "./simulations/graph";
import ProjectileTest from "./simulations/projectile-test";
import ForceExample from "./simulations/force-example";
import EnergyExample from "./simulations/energy-example";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const canvas_bg = document.querySelector(".canvas_bg");
const context_bg = canvas_bg.getContext("2d");

// ForceExample(canvas, context, canvas_bg, context_bg);
EnergyExample(canvas, context, canvas_bg, context_bg);
// ballParticles(canvas, context);
// bouncingBall(canvas, context);
// Calculus(canvas, context);
// GraphFn(canvas, context);
// ProjectileTest(canvas, context);
