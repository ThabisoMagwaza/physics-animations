import { Ball } from "../shared/Ball";

function Environment() {
  this.gravity = 10;
  this.width = 700;
  this.height = 500;
  this.isPlaying = true;
}

Environment.prototype.clearCanvas = function (ctx) {
  ctx.clearRect(0, 0, this.width, this.height);
};

export default function bouncingBall(canvas, context) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // window.onload = init;
  init();

  let env, ballCANVAS, CURRENT_TIME;

  // DRAG AND DROP
  canvas.addEventListener("mousemove", (e) => {
    const canvasRect = canvas.getBoundingClientRect();
    const mousePosX = e.clientX - canvasRect.left;
    const mousePosY = e.clientY - canvasRect.top;

    // check if mouse is hovering over the ball
    const halfRadius = ballCANVAS.radius / 2;

    if (
      mousePosX >= ballCANVAS.x - halfRadius &&
      mousePosX <= ballCANVAS.x + halfRadius &&
      mousePosY >= ballCANVAS.y - halfRadius &&
      mousePosY <= ballCANVAS.y + halfRadius
    ) {
      console.log("hovering");
      canvas.style.cursor = "pointer";
    } else {
      canvas.style.cursor = "auto";
    }
  });

  // PAUSE AND PLAY
  canvas.addEventListener("mousedown", () => (env.isPlaying = false));

  canvas.addEventListener("mouseup", () => {
    env.isPlaying = true;
    animateFrame();
  });

  function init() {
    env = new Environment();
    env.width = canvas.width;
    env.height = canvas.height;
    ballCANVAS = new Ball({
      color: "#ff0000",
      vy: -100,
      vx: 1000,
      y: 200,
      radius: 20,
    });
    CURRENT_TIME = new Date().getTime();
    animateFrame();
  }

  // ANIMATION LOOP
  function onEachStepCANVAS(ball) {
    const dt = (new Date().getTime() - CURRENT_TIME) / 1000; // time elapsed since last call
    CURRENT_TIME = new Date().getTime();
    ball.vy += env.gravity; // gravity increases the vertical speed
    ball.x += ball.vx * dt; // horizontal speed increases horizontal position
    ball.y += ball.vy * dt; // vertical speed increases vertical position
    if (ball.y > canvas.height - ball.radius) {
      // if the ball hits the ground
      ball.y = canvas.height - ball.radius; // reposition it at the ground
      ball.vy *= -0.6; // then reverse and reduce its vertical speed.
    }
    if (ball.x > canvas.width - ball.radius) {
      // if ball goes beyond canvas
      ball.x = canvas.width - ball.radius;
      ball.vx *= -0.8; // bounce back
    }

    if (ball.x < ball.radius) {
      ball.x = ball.radius;
      ball.vx *= -0.8;
    }

    const friction = 0.5;
    if (ball.y === canvas.height - ball.radius) {
      Math.abs(ball.vx) < 0.2
        ? (ball.vx = 0)
        : ball.vx > 0
        ? (ball.vx -= friction)
        : (ball.vx += friction);
    }

    drawBall(env, context, ball);
  }

  function animateFrame() {
    if (env.isPlaying) {
      window.requestAnimationFrame(animateFrame);
      onEachStepCANVAS(ballCANVAS);
    }
  }

  function drawBall(environment, context, ball) {
    environment.clearCanvas(context);
    ball.draw(context);
  }
}
