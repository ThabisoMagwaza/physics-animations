// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"shared/Vector2D.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vector2D = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vector2D = /*#__PURE__*/function () {
  function Vector2D(x, y) {
    _classCallCheck(this, Vector2D);

    this.x = x;
    this.y = y;
  }
  /**
   *
   * @returns {Number} length of the vector squared
   */


  _createClass(Vector2D, [{
    key: "lengthSquared",
    value: function lengthSquared() {
      return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    }
    /**
     *
     * @returns {Number} length of the vectore
     */

  }, {
    key: "length",
    value: function length() {
      return Math.sqrt(this.lengthSquared());
    }
    /**
     *
     * @returns {Vector2D} A new vector that is a clone of the current one
     */

  }, {
    key: "clone",
    value: function clone() {
      return new Vector2D(this.x, this.y);
    }
    /**
     * Negates the direction of the vector in both x and y directions
     */

  }, {
    key: "negate",
    value: function negate() {
      this.x = -this.x;
      this.y = -this.y;
    }
    /**
     * Normalize the current vector
     * @returns {Number} length of the vector
     */

  }, {
    key: "normalize",
    value: function normalize() {
      var length = this.length();

      if (length > 0) {
        this.x /= length;
        this.y /= length;
      }

      return length;
    }
    /**
     * Sums two vectors
     * @param {Vector2D} vec
     * @returns {Vector2D} resultant vector
     */

  }, {
    key: "add",
    value: function add(vec) {
      return new Vector2D(this.x + vec.x, this.y + vec.y);
    }
    /**
     * Adds k*vec to the vector
     * @param {Vector2D} vec
     * @param {Number} k
     */

  }, {
    key: "addScaled",
    value: function addScaled(vec, k) {
      return this.clone().incremenetBy(vec.clone().scaleBy(k));
    }
    /**
     * Increments the vector by a given vector
     * @param {Vector2D} vec
     */

  }, {
    key: "incremenetBy",
    value: function incremenetBy(vec) {
      this.x += vec.x;
      this.y += vec.y;
      return this;
    }
    /**
     * Subtracts the given vector from this vector
     * @param {Vector2D} vec
     * @returns {Vector2D} resultant vector
     */

  }, {
    key: "subtract",
    value: function subtract(vec) {
      return new Vector2D(this.x - vec.x, this.y - vec.y);
    }
    /**
     * Decrement the vector by a given vector
     * @param {Vector2D} vec
     */

  }, {
    key: "decrementBy",
    value: function decrementBy(vec) {
      this.x -= vec.x;
      this.y -= vec.y;
    }
    /**
     * Scales the vector by scalar k
     * @param {Number} k
     */

  }, {
    key: "scaleBy",
    value: function scaleBy(k) {
      this.x *= k;
      this.y *= k;
      return this;
    }
    /**
     * Calculates the dot product
     * @param {Vector2D} vec
     * @returns {Number} dot product of current vector and vec
     */

  }, {
    key: "dotProduct",
    value: function dotProduct(vec) {
      return this.x * vec.x + this.y * vec.y;
    }
    /**
     * Calculates the disctance between two vectors
     * @param {Vector2D} vec1
     * @param {Vector2D} vec2
     * @returns {Number} disctance between vec1 and vec2
     */

  }], [{
    key: "distance",
    value: function distance(vec1, vec2) {
      return vec1.subtract(vec2).length();
    }
    /**
     * Calculates angle between two vectors
     * @param {Vector2D} vec1
     * @param {Vector2D} vec2
     * @returns {Number} Angle between vec1 and vec2 in radians
     */

  }, {
    key: "angleBetween",
    value: function angleBetween(vec1, vec2) {
      return Math.acos(vec1.dotProduct(vec2) / (vec1.length() * vec2.length()));
    }
  }]);

  return Vector2D;
}();

exports.Vector2D = Vector2D;
},{}],"shared/Particle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Particle = void 0;

var _Vector2D = require("./Vector2D");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Particle = /*#__PURE__*/function () {
  function Particle(mass, charge) {
    _classCallCheck(this, Particle);

    this.mass = mass !== null && mass !== void 0 ? mass : 1;
    this.charge = charge !== null && charge !== void 0 ? charge : 0;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
  }

  _createClass(Particle, [{
    key: "pos2D",
    get: function get() {
      return new _Vector2D.Vector2D(this.x, this.y);
    },
    set: function set(pos) {
      this.x = pos.x;
      this.y = pos.y;
    }
  }, {
    key: "velo2D",
    get: function get() {
      return new _Vector2D.Vector2D(this.vx, this.vy);
    },
    set: function set(velo) {
      this.vx = velo.x;
      this.vy = velo.y;
    }
  }]);

  return Particle;
}();

exports.Particle = Particle;
},{"./Vector2D":"shared/Vector2D.js"}],"shared/Ball2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ball = void 0;

var _Particle2 = require("./Particle");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Ball = /*#__PURE__*/function (_Particle) {
  _inherits(Ball, _Particle);

  var _super = _createSuper(Ball);

  function Ball() {
    var _opt$mass, _opt$charge, _opt$x, _opt$y, _opt$vx, _opt$vy, _opt$gradient, _opt$radius, _opt$color;

    var _this;

    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      radius: 20,
      color: "#0000ff",
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      mass: 1,
      charge: 0,
      gradient: false
    };

    _classCallCheck(this, Ball);

    _this = _super.call(this, (_opt$mass = opt.mass) !== null && _opt$mass !== void 0 ? _opt$mass : 1, (_opt$charge = opt.charge) !== null && _opt$charge !== void 0 ? _opt$charge : 0);
    _this.x = (_opt$x = opt.x) !== null && _opt$x !== void 0 ? _opt$x : 0;
    _this.y = (_opt$y = opt.y) !== null && _opt$y !== void 0 ? _opt$y : 0;
    _this.vx = (_opt$vx = opt.vx) !== null && _opt$vx !== void 0 ? _opt$vx : 0;
    _this.vy = (_opt$vy = opt.vy) !== null && _opt$vy !== void 0 ? _opt$vy : 0;
    _this.gradient = (_opt$gradient = opt.gradient) !== null && _opt$gradient !== void 0 ? _opt$gradient : false;
    _this.radius = (_opt$radius = opt.radius) !== null && _opt$radius !== void 0 ? _opt$radius : 20;
    _this.color = (_opt$color = opt.color) !== null && _opt$color !== void 0 ? _opt$color : "#0000ff";
    return _this;
  }

  _createClass(Ball, [{
    key: "draw",
    value: function draw(ctx) {
      if (this.gradient) {
        var grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(1, this.color);
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = this.color;
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
      ctx.closePath();
      ctx.fill();
    }
  }]);

  return Ball;
}(_Particle2.Particle);

exports.Ball = Ball;
},{"./Particle":"shared/Particle.js"}],"simulations/ball-particle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ballParticles;

var _Ball = require("../shared/Ball2");

var _Vector2D = require("../shared/Vector2D");

function ballParticles(canvas, context) {
  var animTime = 5;
  var animId;
  var t0 = 0;
  var t;
  var ball;
  window.onload = init;

  function init() {
    ball = new _Ball.Ball();
    ball.pos2D = new _Vector2D.Vector2D(150, 50);
    ball.velo2D = new _Vector2D.Vector2D(30, 20);
    ball.draw(context);
    t0 = new Date().getTime();
    t = 0;
    animateFrame();
  }

  function animateFrame() {
    animId = requestAnimationFrame(animateFrame, canvas);
    onTimer();
  }

  function onTimer() {
    var t1 = new Date().getTime();
    var dt = 0.001 * (t1 - t0);
    t += dt;
    t0 = t1;

    if (t < animTime) {
      move(dt);
    } else {
      stop();
    }
  }

  function move(dt) {
    ball.pos2D = ball.pos2D.addScaled(ball.velo2D, dt);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw(context);
  }

  function stop() {
    cancelAnimationFrame(animId);
  }
}
},{"../shared/Ball2":"shared/Ball2.js","../shared/Vector2D":"shared/Vector2D.js"}],"shared/Ball.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ball = Ball;

function Ball() {
  var _opt$radius, _opt$color, _opt$x, _opt$y, _opt$vx, _opt$vy;

  var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    radius: 20,
    color: "#0000ff",
    x: 50,
    y: 50,
    vx: 2,
    vy: 2
  };
  this.radius = (_opt$radius = opt.radius) !== null && _opt$radius !== void 0 ? _opt$radius : 20;
  this.color = (_opt$color = opt.color) !== null && _opt$color !== void 0 ? _opt$color : "#0000ff";
  this.x = (_opt$x = opt.x) !== null && _opt$x !== void 0 ? _opt$x : 50;
  this.y = (_opt$y = opt.y) !== null && _opt$y !== void 0 ? _opt$y : 50;
  this.vx = (_opt$vx = opt.vx) !== null && _opt$vx !== void 0 ? _opt$vx : 2;
  this.vy = (_opt$vy = opt.vy) !== null && _opt$vy !== void 0 ? _opt$vy : 0;
}

Ball.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
};
},{}],"simulations/bouncing-ball.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bouncingBall;

var _Ball = require("../shared/Ball");

function Environment() {
  this.gravity = 10;
  this.width = 700;
  this.height = 500;
  this.isPlaying = true;
}

Environment.prototype.clearCanvas = function (ctx) {
  ctx.clearRect(0, 0, this.width, this.height);
};

function bouncingBall(canvas, context) {
  window.onload = init;
  var env, ballCANVAS, CURRENT_TIME; // DRAG AND DROP

  canvas.addEventListener("mousemove", function (e) {
    var canvasRect = canvas.getBoundingClientRect();
    var mousePosX = e.clientX - canvasRect.left;
    var mousePosY = e.clientY - canvasRect.top; // check if mouse is hovering over the ball

    var halfRadius = ballCANVAS.radius / 2;

    if (mousePosX >= ballCANVAS.x - halfRadius && mousePosX <= ballCANVAS.x + halfRadius && mousePosY >= ballCANVAS.y - halfRadius && mousePosY <= ballCANVAS.y + halfRadius) {
      console.log("hovering");
      canvas.style.cursor = "pointer";
    } else {
      canvas.style.cursor = "auto";
    }
  }); // PAUSE AND PLAY

  canvas.addEventListener("mousedown", function () {
    return env.isPlaying = false;
  });
  canvas.addEventListener("mouseup", function () {
    env.isPlaying = true;
    animateFrame();
  });

  function init() {
    env = new Environment();
    ballCANVAS = new _Ball.Ball({
      color: "#ff0000",
      vy: -100,
      vx: 1000,
      y: 200,
      radius: 20
    });
    CURRENT_TIME = new Date().getTime();
    animateFrame();
  } // ANIMATION LOOP


  function onEachStepCANVAS(ball) {
    var dt = (new Date().getTime() - CURRENT_TIME) / 1000; // time elapsed since last call

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

    var friction = 0.5;

    if (ball.y === canvas.height - ball.radius) {
      Math.abs(ball.vx) < 0.2 ? ball.vx = 0 : ball.vx > 0 ? ball.vx -= friction : ball.vx += friction;
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
},{"../shared/Ball":"shared/Ball.js"}],"shared/Graph.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Graph = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Graph = /*#__PURE__*/function () {
  /**
   *
   * @param {Context} context
   * @param {Number} xmin
   * @param {Number} xmax
   * @param {Number} ymin
   * @param {Number} ymax
   * @param {Number} x0
   * @param {Number} y0
   * @param {Number} width
   * @param {Number} height
   */
  function Graph(context, xmin, xmax, ymin, ymax, x0, y0, width, height) {
    _classCallCheck(this, Graph);

    this.ctx = context;
    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
    this.x0 = x0;
    this.y0 = y0;
    this.width = width;
    this.height = height;
  }
  /**
   * Draws a grid on the graph
   * @param {Number} xmajor
   * @param {Number} xminor
   * @param {Number} ymajor
   * @param {Number} yminor
   */


  _createClass(Graph, [{
    key: "drawgrid",
    value: function drawgrid(xmajor, xminor, ymajor, yminor) {
      var xRange = this.xmax - this.xmin;
      var yRange = this.ymax - this.ymin;
      var xdivs = xRange / xminor;
      var ydivs = yRange / yminor; // ticks in px

      this.xtick = this.width / xdivs;
      this.ytick = this.height / ydivs; // scaling

      this.xscale = this.width / xRange;
      this.yscale = this.height / yRange; // find startX in on canvas

      this.xStart = this.x0 + this.xmin * this.xscale;
      this.xEnd = this.x0 + this.xmax * this.xscale; // in px
      // find startY on canvas

      this.yStart = this.y0 - this.ymin * this.yscale;
      this.yEnd = this.y0 - this.ymax * this.yscale;
      this.ctx.strokeStyle = "lightgray"; // draw minor divisions

      this.ctx.beginPath();

      for (var x = this.xStart; x <= this.xEnd; x += this.xtick) {
        this.ctx.moveTo(x, this.yStart);
        this.ctx.lineTo(x, this.yEnd);
      }

      for (var y = this.yStart; y >= this.yEnd; y -= this.ytick) {
        this.ctx.moveTo(this.xStart, y);
        this.ctx.lineTo(this.xEnd, y);
      }

      this.ctx.stroke(); // major ticks

      var x_tick_major = this.xtick * (xmajor / xminor);
      var y_tick_major = this.ytick * (ymajor / yminor); // draw major division

      this.ctx.strokeStyle = "#999999";
      this.ctx.beginPath();

      for (var _x = this.xStart; _x <= this.xEnd; _x += x_tick_major) {
        this.ctx.moveTo(_x, this.yStart);
        this.ctx.lineTo(_x, this.yEnd);
      }

      for (var _y = this.yStart; _y >= this.yEnd; _y -= y_tick_major) {
        this.ctx.moveTo(this.xStart, _y);
        this.ctx.lineTo(this.xEnd, _y);
      }

      this.ctx.stroke(); // display font

      this.ctx.font = "10pt Arial";
      this.ctx.fillStyle = "#000000";
      this.ctx.textAlign = "right";
      this.ctx.textBaseline = "top"; // draw labels

      var curr_x = this.xmin;
      var curr_y = this.ymin;
      this.ctx.beginPath();

      for (var _x2 = this.xStart; _x2 <= this.xEnd; _x2 += x_tick_major) {
        this.ctx.fillText(Math.round(curr_x * 100) / 100, _x2 + 2, this.y0 + 5);
        curr_x += xmajor;
      }

      for (var _y2 = this.yStart; _y2 >= this.yEnd; _y2 -= y_tick_major) {
        this.ctx.fillText(Math.round(curr_y * 100) / 100, this.x0 - 5, _y2 - 5);
        curr_y += ymajor;
      }

      this.ctx.stroke();
    }
    /**
     * Draws the axes with labels
     * @param {String} xlabel
     * @param {String} ylabel
     */

  }, {
    key: "drawaxes",
    value: function drawaxes() {
      var xlabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "X";
      var ylabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Y";
      // write labels
      this.ctx.font = "10pt Arial";
      this.ctx.fillStyle = "#000000";
      this.ctx.textAlign = "right";
      this.ctx.textBaseline = "top";
      this.ctx.fillText(ylabel, this.x0 + 5, this.yEnd - 20);
      this.ctx.fillText(xlabel, this.xEnd + 20, this.y0 + 15); // draw axes

      this.ctx.strokeStyle = "#000000";
      this.ctx.beginPath();
      this.ctx.moveTo(this.xStart, this.y0);
      this.ctx.lineTo(this.xEnd, this.y0);
      this.ctx.moveTo(this.x0, this.yStart);
      this.ctx.lineTo(this.x0, this.yEnd);
      this.ctx.stroke();
    }
    /**
     * Plots a graph give the list of co-ordinates
     * @param {Array} xvals
     * @param {Array} yvals
     * @param {String} color color that the lines and dots will be drawn in. Default red
     * @param {Boolean} dots display dots for points plottes. Default false
     * @param {Boolean} lines join points. default True
     */

  }, {
    key: "plot",
    value: function plot(xvals, yvals) {
      var _this = this;

      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#ff0000";
      var dots = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var lines = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      this.ctx.fillStyle = color;
      this.ctx.strokeStyle = color;
      var xvalsPx = xvals.map(function (x) {
        return _this.xValToPx(x);
      });
      var yvalsPx = yvals.map(function (y) {
        return _this.yValToPx(y);
      });

      if (dots) {
        for (var i = 0; i < xvalsPx.length; i++) {
          this.ctx.beginPath();
          this.ctx.arc(xvalsPx[i], yvalsPx[i], 2, 0, 2 * Math.PI);
          this.ctx.fill();
        }
      }

      if (lines) {
        this.ctx.beginPath();

        for (var _i = 0; _i < xvalsPx.length - 1; _i++) {
          this.ctx.moveTo(xvalsPx[_i], yvalsPx[_i]);
          this.ctx.lineTo(xvalsPx[_i + 1], yvalsPx[_i + 1]);
        }

        this.ctx.stroke();
      }
    }
    /**
     * Converts user y-val to px equivalent on graph
     * @param {Number} val
     * @returns {Number}
     */

  }, {
    key: "yValToPx",
    value: function yValToPx(val) {
      return this.y0 - val * this.yscale;
    }
    /**
     * Converst user x-val to px equivalent on graph
     * @param {Number} val
     * @returns {Number}
     */

  }, {
    key: "xValToPx",
    value: function xValToPx(val) {
      return val * this.xscale + this.x0;
    }
    /**
     * Calculate x-y value for a given function
     * @param {Function} fn
     * @param {Number} xmin
     * @param {Number} xmax
     * @param {Number} numPoints
     * @returns {Object} Object containing one array with the x-values and another with the corresponding y-values
     */

  }], [{
    key: "createPoints",
    value: function createPoints(fn, xmin, xmax) {
      var numPoints = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;
      var retObj = {
        xVals: [],
        yVals: []
      };
      var xtick = (xmax - xmin) / numPoints;

      for (var i = xmin; i <= xmax; i += xtick) {
        retObj.xVals.push(i);
        retObj.yVals.push(fn(i));
      } // ensure that the graph ends at xmax


      if (retObj.xVals[retObj.xVals.length - 1] !== xmax) {
        retObj.xVals[retObj.xVals.length - 1] = xmax;
        retObj.yVals[retObj.yVals.length - 1] = fn(xmax);
      }

      return retObj;
    }
    /**
     * Calculates the gradient of fn between f(x1) and f(x2)
     * @param {Function} fn
     * @param {Number} x1
     * @param {Number} x2
     * @returns {Number} gradient
     */

  }, {
    key: "calcGradient",
    value: function calcGradient(fn, x1, x2) {
      return (fn(x2) - fn(x1)) / (x2 - x1);
    }
  }]);

  return Graph;
}();

exports.Graph = Graph;
},{}],"simulations/calculus.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Calculus;

var _Graph = require("../shared/Graph");

function Calculus(canvas, context) {
  var numPoints = 1001;
  var numGrad = 1;
  var xRange = 6;
  var xStep;
  var graph = new _Graph.Graph(context, -4, 4, -10, 10, 350, 210, 450, 350);
  graph.drawgrid(1, 0.2, 2, 0.5);
  graph.drawaxes("x", "y");

  var fn = function fn(x) {
    return Math.pow(x, 2);
  };

  var _Graph$createPoints = _Graph.Graph.createPoints(fn, -3, 3, numPoints),
      xVals = _Graph$createPoints.xVals,
      yVals = _Graph$createPoints.yVals;

  graph.plot(xVals, yVals); // calculate the gradient using the forward method

  var xAr = [];
  var gradA = [];

  for (var j = 0; j < numPoints - numGrad; j++) {
    xAr.push(xVals[j]);
    gradA.push(_Graph.Graph.calcGradient(fn, xVals[j], xVals[j + numGrad]));
  }

  graph.plot(xAr, gradA, "#0000ff", false, true);
}
},{"../shared/Graph":"shared/Graph.js"}],"simulations/graph.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GraphFn;

var _Ball = require("../shared/Ball");

var _Graph = require("../shared/Graph");

function GraphFn(canvas, context) {
  var graph = new _Graph.Graph(context, -720, 720, -1, 1, canvas.width / 2, 250, 450, 350);
  graph.drawgrid(180, 36, 0.5, 0.1);
  graph.drawaxes();

  var fn = function fn(x) {
    return -0.5 * Math.pow(x, 5) + 3 * Math.pow(x, 3) + Math.pow(x, 2) - 2 * x - 3;
  };

  var fn2 = function fn2(x) {
    return Math.exp(-x * x);
  };

  var fnHill = function fnHill(x) {
    return 0.1 * x * x * (x + 3.6) * (x + 2.5) * (x + 1) * (x - 0.5) * (x - 2) * (x - 3.5) * Math.exp(-x * x / 4);
  };

  var unitCircle = function unitCircle(x) {
    return Math.sqrt(1 - Math.pow(x, 2));
  };

  var _Graph$createPoints = _Graph.Graph.createPoints(function (x) {
    return Math.tan(x * (Math.PI / 180));
  }, -720, 720),
      xVals = _Graph$createPoints.xVals,
      yVals = _Graph$createPoints.yVals; // for (var i = 0; i <= 1000; i++) {
  //   var t = 0.01 * i;
  //   xVals[i] = Math.sin(2 * t);
  //   yVals[i] = Math.cos(2 * t);
  // }


  graph.plot(xVals, yVals);
  var ball = new _Ball.Ball({
    radius: 10
  });
  var interval;
  var n = 0; // placeBall();
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
},{"../shared/Ball":"shared/Ball.js","../shared/Graph":"shared/Graph.js"}],"simulations/projectile-test.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ProjectileTest;

var _Ball = require("../shared/Ball2");

var _Vector2D = require("../shared/Vector2D");

function ProjectileTest(canvas, context) {
  var ball1, ball2, t, t0, dt, animId;
  var pos0 = new _Vector2D.Vector2D(100, 350);
  var velo0 = new _Vector2D.Vector2D(20, -80);
  var acc = new _Vector2D.Vector2D(0, 10);
  var animTime = 16;
  window.onload = init;

  function init() {
    ball1 = new _Ball.Ball({
      radius: 15,
      color: "#000000",
      gradient: true
    });
    ball1.pos2D = pos0.clone();
    ball1.velo2D = velo0.clone();
    ball2 = new _Ball.Ball({
      radius: 15,
      color: "#aaaaaa",
      gradient: true
    });
    ball2.pos2D = pos0.clone();
    ball2.velo2D = velo0.clone();
    ball1.draw(context);
    ball2.draw(context);
    t0 = new Date().getTime();
    t = 0;
    animateFrame();
  }

  function animateFrame() {
    animId = requestAnimationFrame(animateFrame, canvas);
    onTimer();
  }

  function onTimer() {
    var t1 = new Date().getTime();
    dt = 0.001 * (t1 - t0);
    if (dt > 0.2) dt = 0; // for for if user switches tab

    t += dt;
    t0 = t1;

    if (t < animTime) {
      move();
    } else {
      stop();
    }
  }

  function move() {
    // Numerical Euler solution
    ball1.pos2D = ball1.pos2D.addScaled(ball1.velo2D, dt);
    ball1.velo2D = ball1.velo2D.addScaled(acc, dt); // Analytical solution

    ball2.pos2D = pos0.addScaled(velo0, t).addScaled(acc, 0.5 * Math.pow(t, 2));
    ball2.velo2D = velo0.addScaled(acc, t); // draw

    context.clearRect(0, 0, canvas.width, canvas.height);
    ball1.draw(context);
    ball2.draw(context);
  }

  function stop() {
    cancelAnimationFrame(animId);
  }
}
},{"../shared/Ball2":"shared/Ball2.js","../shared/Vector2D":"shared/Vector2D.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _ballParticle = _interopRequireDefault(require("./simulations/ball-particle"));

var _bouncingBall = _interopRequireDefault(require("./simulations/bouncing-ball"));

var _calculus = _interopRequireDefault(require("./simulations/calculus"));

var _graph = _interopRequireDefault(require("./simulations/graph"));

var _projectileTest = _interopRequireDefault(require("./simulations/projectile-test"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d"); // ballParticles(canvas, context);
// bouncingBall(canvas, context);
// Calculus(canvas, context);
// GraphFn(canvas, context);

(0, _projectileTest.default)(canvas, context);
},{"./simulations/ball-particle":"simulations/ball-particle.js","./simulations/bouncing-ball":"simulations/bouncing-ball.js","./simulations/calculus":"simulations/calculus.js","./simulations/graph":"simulations/graph.js","./simulations/projectile-test":"simulations/projectile-test.js"}],"../../../../Users/bbdnet2169/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65101" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../Users/bbdnet2169/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=bundle.js.map