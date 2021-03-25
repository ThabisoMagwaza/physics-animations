const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const sceneSVG = document.querySelector("svg");
const cicleSVG = document.querySelector(".cirlce");

const env = new Environment();
const ballCANVAS = new Ball({ color: "#ff0000" });
const ballSVG = new Ball();

// Set SVG Scene
sceneSVG.setAttribute("width", `${env.width}px`);
sceneSVG.setAttribute("height", `${env.height}px`);

window.onload = init;

function init() {
  onEachStepCANVAS(ballCANVAS);
  onEachStepSVG(ballSVG);
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

function onEachStepSVG(ball) {
  ball.vy += env.gravity;

  ball.x += ball.vx;
  ball.y += ball.vy;

  if (ball.y > env.height - ball.radius) {
    ball.y = env.height - ball.radius;
    ball.vy *= -0.8;
  }
  if (ball.x > env.width - ball.radius) {
    ball.x = env.width - ball.radius;
    ball.vx *= -0.8;
  }
  if (ball.x < ball.radius) {
    ball.x = ball.radius;
    ball.vx *= -0.8;
  }
  cicleSVG.setAttribute("cx", `${ballSVG.x}`);
  cicleSVG.setAttribute("cy", `${ballSVG.y}`);
}

function Ball(
  opt = { radius: 20, color: "#0000ff", x: 50, y: 50, vx: 2, vy: 2 }
) {
  this.radius = opt.radius ?? 20;
  this.color = opt.color ?? "#0000ff";
  this.x = opt.x ?? 50;
  this.y = opt.y ?? 50;
  this.vx = opt.vx ?? 2;
  this.vy = opt.vy ?? 0;
}

Ball.prototype.drawOnCanvas = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
};

function Environment() {
  this.gravity = 0.1;
  this.width = 500;
  this.height = 500;
  this.gravity = 0.1;
}

Environment.prototype.clearCanvas = function (ctx) {
  ctx.clearRect(0, 0, this.width, this.height);
};
