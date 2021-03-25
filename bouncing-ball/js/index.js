import { Environment } from "./objects/Environment";
import { Ball } from "./objects/Ball";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const env = new Environment();
const ballCANVAS = new Ball({ color: "#ff0000" });

window.onload = init;

function init() {
  onEachStepCANVAS(ballCANVAS);
  window.requestAnimationFrame(init);
}

function onEachStepCANVAS(ball) {
  ball.vy += env.gravity; // gravity increases the vertical speed
  ball.x += ball.vx; // horizontal speed increases horizontal position
  ball.y += ball.vy; // vertical speed increases vertical position
  if (ball.y > canvas.height - ball.radius) {
    // if the ball hits the ground
    ball.y = canvas.height - ball.radius; // reposition it at the ground
    ball.vy *= -0.5; // then reverse and reduce its vertical speed.
  }
  if (ball.x > canvas.width - ball.radius) {
    // if ball goes beyond canvas
    ball.x = canvas.width - ball.radius;
    ball.vx *= -0.5; // bounce back
  }

  if (ball.x < ball.radius) {
    ball.x = ball.radius;
    ball.vx *= -0.5;
  }

  drawBall(env, context, ball);
}

function drawBall(environment, context, ball) {
  environment.clearCanvas(context);
  ball.drawOnCanvas(context);
}
