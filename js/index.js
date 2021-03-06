import ballParticles from "./simulations/ball-particle";
import bouncingBall from "./simulations/bouncing-ball";
import Calculus from "./simulations/calculus";
import GraphFn from "./simulations/graph";
import ProjectileTest from "./simulations/projectile-test";
import ForceExample from "./simulations/force-example";
import EnergyExample from "./simulations/energy-example";
import FloatingBall from "./simulations/floating-ball";
import ProjectileEnergy from "./simulations/projectile-energy";
import CollisionTest from "./simulations/collision-test";
import Orbits from "./simulations/obits";
import TwoMasses from "./simulations/two-masses";
import RocketTest from "./simulations/rocket-test";
import Sliding from "./simulations/sliding";
import Balloon from "./simulations/Balloon";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const canvas_bg = document.querySelector(".canvas_bg");
const context_bg = canvas_bg.getContext("2d");

// CollisionTest(canvas, context);
// Balloon(canvas, context, canvas_bg, context_bg);
document.querySelector(".btn-slide").onclick = () =>
  Sliding(canvas, context, canvas_bg, context_bg);
// RocketTest(canvas, context, canvas_bg, context_bg);
// TwoMasses(canvas, context, canvas_bg, context_bg);
document.querySelector(".btn-orbits").onclick = () =>
  Orbits(canvas, context, canvas_bg, context_bg);
// ProjectileEnergy(canvas, context, canvas_bg, context_bg);
document
  .querySelector(".btn-floating-ball")
  .addEventListener("click", () =>
    FloatingBall(canvas, context, canvas_bg, context_bg)
  );
// ForceExample(canvas, context, canvas_bg, context_bg);
// EnergyExample(canvas, context, canvas_bg, context_bg);
bouncingBall(canvas, context);
// Calculus(canvas, context);
// GraphFn(canvas, context);
// ProjectileTest(canvas, context);
