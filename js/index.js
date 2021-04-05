import ballParticles from "./simulations/ball-particle";
import bouncingBall from "./simulations/bouncing-ball";
import Calculus from "./simulations/calculus";
import GraphFn from "./simulations/graph";
import ProjectileTest from "./simulations/projectile-test";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

// ballParticles(canvas, context);
// bouncingBall(canvas, context);
// Calculus(canvas, context);
// GraphFn(canvas, context);
ProjectileTest(canvas, context);
