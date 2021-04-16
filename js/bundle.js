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
     * @returns {Vector2D} resultant vector
     */

  }, {
    key: "negate",
    value: function negate() {
      return new Vector2D(-this.x, -this.y);
    }
    /**
     * Normalize the current vector
     * @returns {Vector2D} resultant vector
     */

  }, {
    key: "normalize",
    value: function normalize() {
      var length = this.length();

      if (length > 0) {
        this.x /= length;
        this.y /= length;
      }

      return this;
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
      return this.incrementBy(vec.scaleBy(k));
    }
    /**
     * Increments the vector by a given vector
     * @param {Vector2D} vec
     * @returns {Vector2D} new Vector2D
     */

  }, {
    key: "incrementBy",
    value: function incrementBy(vec) {
      return new Vector2D(this.x + vec.x, this.y + vec.y);
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
     * @returns {Vector2D} resultant vector
     */

  }, {
    key: "decrementBy",
    value: function decrementBy(vec) {
      return new Vector2D(this.x - vec.x, this.y - vec.y);
    }
    /**
     * Scales the vector by scalar k
     * @param {Number} k
     * @returns {Vector2D} resultant vector
     */

  }, {
    key: "scaleBy",
    value: function scaleBy(k) {
      return new Vector2D(this.x * k, this.y * k);
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

  }, {
    key: "perp",
    value:
    /**
     * Returns a perpandicular vector or length u
     * @param {Number} u
     * @param {boolean} anticlockwise
     */
    function perp(u) {
      var anticlockwise = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var length = this.length();
      if (length === 0) return new Vector2D(0, 0);
      var vec = new Vector2D(this.y, -this.x);
      return anticlockwise ? vec.scaleBy(u / length) : vec.scaleBy(-u / length);
    }
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
    /**
     * Returns a vector with a specified magnitude and angle
     * @param {Number} mag
     * @param {Number} angle
     * @param {boolean} clockwise
     */

  }, {
    key: "vector2D",
    value: function vector2D(mag, angle) {
      var clockwise = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      debugger;
      var vec = new Vector2D(mag * Math.cos(angle), mag * Math.sin(angle));
      if (!clockwise) vec.y *= -1;
      return vec;
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
    env.width = canvas.width;
    env.height = canvas.height;
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
    this.xvals = [];
    this.yvals = [];
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
      this.xvals = this.xvals.concat(xvals);
      this.yvals = this.yvals.concat(yvals);
      var xvalsPx = this.xvals.map(function (x) {
        return _this.xValToPx(x);
      });
      var yvalsPx = this.yvals.map(function (y) {
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
     * clear stored xvals and yvals
     */

  }, {
    key: "clear",
    value: function clear() {
      this.xvals = [];
      this.yvals = [];
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
},{"../shared/Ball2":"shared/Ball2.js","../shared/Vector2D":"shared/Vector2D.js"}],"shared/Force.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Vector2D = require("./Vector2D");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Force = /*#__PURE__*/function () {
  function Force() {
    _classCallCheck(this, Force);
  }
  /**
   *
   * @returns {Vector2D} zero 2D force
   */


  _createClass(Force, null, [{
    key: "zeroForce",
    value: function zeroForce() {
      return new _Vector2D.Vector2D(0, 0);
    }
    /**
     *
     * @param {Number} m mass
     * @param {Number} g gravitational force
     * @returns {Vector2D} downwards pointing gravitational vector
     */

  }, {
    key: "constantGravity",
    value: function constantGravity(m, g) {
      return new _Vector2D.Vector2D(0, m * g);
    }
    /**
     * Drag force at low velocities (linear drag)
     * @param {Number} k drag coefficeint
     * @param {Vector2D} vel velocity
     */

  }, {
    key: "linearDrag",
    value: function linearDrag(k, vel) {
      var force;
      var velMag = vel.length();
      velMag > 0 ? force = vel.scaleBy(-k) : force = new _Vector2D.Vector2D(0, 0);
      return force;
    }
    /**
     * Drag force at high velocities (quadratic drag)
     * @param {Number} k drag coefficient
     * @param {Vector2D} vel velocity
     */

  }, {
    key: "drag",
    value: function drag(k, vel) {
      var force;
      var velMag = vel.length();
      velMag > 0 ? force = vel.scaleBy(-k * velMag) : force = new _Vector2D.Vector2D(0, 0);
      return force;
    }
    /**
     * Sums forces
     * @param {Array} forces array of forces
     * @returns {Vector2D} resultant vector
     */

  }, {
    key: "add",
    value: function add(forces) {
      return forces.reduce(function (force, resultant) {
        return resultant.incrementBy(force);
      }, new _Vector2D.Vector2D(0, 0));
    }
    /**
     *
     * @param {Number} G Newtown's gravitational constant
     * @param {Number} m1 mass of object1
     * @param {Number} m2 mass of object2
     * @param {Number} r distance vector from object1 to object 2
     * @returns {Vector2D} gravitational force experieced by object1 due to object2
     */

  }, {
    key: "gravity",
    value: function gravity(G, m1, m2, r) {
      return r.length() == 0 ? new _Vector2D.Vector2D(0, 0) : r.scaleBy(-G * m1 * m2 / Math.pow(r.length(), 3));
    }
  }, {
    key: "upthrust",
    value: function upthrust(rho, V, g) {
      return new _Vector2D.Vector2D(0, -rho * V * g);
    }
  }]);

  return Force;
}();

exports.default = Force;
},{"./Vector2D":"shared/Vector2D.js"}],"simulations/force-example.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ForceExample;

var _Ball = require("../shared/Ball2");

var _Force = _interopRequireDefault(require("../shared/Force"));

var _Graph = require("../shared/Graph");

var _Vector2D = require("../shared/Vector2D");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ForceExample(canvas, context, canvas_bg, context_bg) {
  var ball, t, dt, animId, graphAcc, graphVelo, force, acc, t0;
  var g = 10;
  var k = 0.5;
  var animTime = 30;
  window.onload = init;

  function init() {
    ball = new _Ball.Ball({
      radius: 15,
      color: "#0000",
      gradient: true
    });
    ball.pos2D = new _Vector2D.Vector2D(75, 20);
    ball.velo2D = new _Vector2D.Vector2D(0, 0);
    ball.draw(context);
    setupGraphs();
    t0 = new Date().getTime();
    t = 0;
    animFrame();
  }

  function setupGraphs() {
    graphAcc = new _Graph.Graph(context_bg, 0, 30, 0, 10, 150, 250, 600, 200);
    graphAcc.drawgrid(5, 1, 5, 1);
    graphAcc.drawaxes("times (s)", "acceleration (px/s^2)");
    graphVelo = new _Graph.Graph(context_bg, 0, 30, 0, 25, 150, 550, 600, 200);
    graphVelo.drawgrid(5, 1, 5, 1);
    graphVelo.drawaxes("times (s)", "velocity (px/s)");
  }

  function animFrame() {
    animId = requestAnimationFrame(animFrame, canvas);
    onTimer();
  }

  function onTimer() {
    var t1 = new Date().getTime();
    dt = 0.001 * (t1 - t0);
    if (dt > 0.2) dt = 0; // fix for when user switches tabs

    t += dt;
    t0 = t1;

    if (t < animTime) {
      move();
    } else {
      stop();
    }

    function stop() {
      cancelAnimationFrame(animId);
    }

    function move() {
      moveObject();
      calcForce();
      updateAcc();
      updateVelo();
      plotGraphs();
    }

    function moveObject() {
      ball.pos2D = ball.pos2D.addScaled(ball.velo2D, dt);
      context.clearRect(0, 0, canvas.width, canvas.height);
      ball.draw(context);
    }

    function calcForce() {
      // force = new Vector2D(0, ball.mass * g - k * ball.vy);
      debugger;
      force = _Force.default.add([_Force.default.constantGravity(ball.mass, g), _Force.default.linearDrag(k, ball.velo2D)]);
    }

    function updateAcc() {
      acc = force.scaleBy(1 / ball.mass);
    }

    function updateVelo() {
      ball.velo2D = ball.velo2D.addScaled(acc, dt);
    }

    function plotGraphs() {
      graphAcc.plot([t], [acc.y], "#ff0000");
      graphVelo.plot([t], [ball.vy], "#ff0000");
    }
  }
}
},{"../shared/Ball2":"shared/Ball2.js","../shared/Force":"shared/Force.js","../shared/Graph":"shared/Graph.js","../shared/Vector2D":"shared/Vector2D.js"}],"simulations/energy-example.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EnergyExample;

var _Ball = require("../shared/Ball2");

var _Vector2D = require("../shared/Vector2D");

var _Graph = require("../shared/Graph");

function EnergyExample(canvas, context, canvas_bg, context_bg) {
  var car, t, t0, dt, animId, graph, force, acc;
  var g = 10,
      k = 0.5,
      animTime = 60,
      powerLossFactor = 0.1,
      powerApplied = 200;
  var ke,
      vmag,
      mass,
      applyTrust = false;
  window.onload = init;

  function init() {
    car = new _Ball.Ball({
      radius: 15,
      color: "#000000",
      gradient: true
    });
    car.pos2D = new _Vector2D.Vector2D(50, 50);
    car.velo2D = new _Vector2D.Vector2D(20, 0);
    car.draw(context);
    mass = car.mass;
    vmag = car.velo2D.length();
    ke = 0.5 * mass * Math.pow(vmag, 2);
    window.addEventListener("keydown", startThrust, false);
    window.addEventListener("keyup", stopThrust, false);
    setupGraphs();
    t0 = new Date().getTime();
    t = 0;
    animateFrame();
  }

  function startThrust(e) {
    if (e.keyCode === 38) applyTrust = true;
  }

  function stopThrust(e) {
    if (e.keyCode === 38) applyTrust = false;
  }

  function setupGraphs() {
    graph = new _Graph.Graph(context_bg, 0, animTime, 0, 50, 100, 550, 600, 400);
    graph.drawgrid(5, 1, 5, 1);
    graph.drawaxes("times(s)", "velocity (px/s)");
  }

  function animateFrame() {
    animId = requestAnimationFrame(animateFrame, canvas);
    onTimer();
  }

  function onTimer() {
    var t1 = new Date().getTime();
    dt = 0.001 * (t1 - t0);
    if (dt > 0.2) dt = 0; // fix for when users swicht tabs

    t += dt;
    t0 = t1;

    if (t < animTime) {
      move();
    } else {
      stop();
    }
  }

  function move() {
    moveObjects();
    applyPower();
    updateVelo();
    plotGraphs();
  }

  function moveObjects() {
    car.pos2D = car.pos2D.addScaled(car.velo2D, dt);
    context.clearRect(0, 0, canvas.width, canvas.height);
    car.draw(context);
  }

  function applyPower() {
    if (applyTrust) {
      ke += powerApplied * dt;
    }

    ke -= powerLossFactor * Math.pow(vmag, 2) * dt;
  }

  function updateVelo() {
    vmag = Math.sqrt(2 * ke / mass);
    car.vx = vmag;
  }

  function plotGraphs() {
    graph.plot([t], [car.vx]);
  }

  function stop() {
    cancelAnimationFrame(animId);
  }
}
},{"../shared/Ball2":"shared/Ball2.js","../shared/Vector2D":"shared/Vector2D.js","../shared/Graph":"shared/Graph.js"}],"simulations/floating-ball.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FloatingBall;

var _Ball = require("../shared/Ball2");

var _Force = _interopRequireDefault(require("../shared/Force"));

var _Vector2D = require("../shared/Vector2D");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FloatingBall(canvas, context, canvas_bg, context_bg) {
  var ball, t0, dt, animId, force, acc;
  var g = 50,
      k = 0.01,
      rho = 1.5,
      V = 1,
      ylevel = 300,
      vfac = -0.8;
  window.onload = init;

  function init() {
    ball = new _Ball.Ball({
      radius: 40,
      color: "#0000ff",
      gradient: true
    });
    ball.pos2D = new _Vector2D.Vector2D(50, 50);
    ball.velo2D = new _Vector2D.Vector2D(40, -20);
    ball.draw(context); // create water

    context_bg.fillStyle = "rgba(0,255,255,0.5)";
    context_bg.fillRect(0, ylevel, canvas.width, canvas.height); // set up event listeners

    addEventListener("mousedown", onDown, false);
    addEventListener("mouseup", onUp, false); // initialize time and animate

    initAnim();
  }

  function onDown(e) {
    var boundingRect = canvas.getBoundingClientRect();
    ball.velo2D = new _Vector2D.Vector2D(0, 0);
    ball.pos2D = new _Vector2D.Vector2D(e.clientX - boundingRect.left, e.clientY - boundingRect.top);
    moveObjects();
    stop();
  }

  function onUp(e) {
    ball.velo2D = new _Vector2D.Vector2D(e.clientX - ball.x, e.clientY - ball.y);
    initAnim();
  }

  function initAnim() {
    t0 = Date.now();
    animateFrame();
  }

  function animateFrame() {
    animId = requestAnimationFrame(animateFrame, canvas);
    onTimer();
  }

  function onTimer() {
    var t1 = Date.now();
    dt = 0.001 * (t1 - t0);
    if (dt > 0.2) dt = 0;
    t0 = t1;
    move();
  }

  function move() {
    moveObjects();
    calcForce();
    updateAccel();
    updateVelo();
  }

  function stop() {
    cancelAnimationFrame(animId);
  }

  function moveObjects() {
    ball.pos2D = ball.pos2D.addScaled(ball.velo2D, dt);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw(context);
  }

  function calcForce() {
    var gravity = _Force.default.constantGravity(ball.mass, g);

    var rball = ball.radius,
        xball = ball.x,
        yball = ball.y;
    var dr = (yball - ylevel) / rball;
    var ratio; // volume fractio of object that is submerged

    if (dr <= -1) {
      // object is completely out of water
      ratio = 0;
    } else if (dr < 1) {
      // object is partially in the water
      ratio = 0.5 + 0.25 * dr * (3 - Math.pow(dr, 2)); // for sphere
    } else {
      // object is completely submerged
      ratio = 1;
    }

    var upthrust = new _Vector2D.Vector2D(0, -rho * V * ratio * g);
    var drag = ball.velo2D.scaleBy(-ratio * k * ball.velo2D.length());
    force = _Force.default.add([upthrust, gravity, drag]);

    if (xball < rball) {
      ball.xpos = rball;
      ball.vx *= vfac;
    }

    if (xball > canvas.width - rball) {
      ball.xpos = canvas.width - rball;
      ball.vx *= vfac;
    }
  }

  function updateAccel() {
    acc = force.scaleBy(1 / ball.mass);
  }

  function updateVelo() {
    ball.velo2D = ball.velo2D.addScaled(acc, dt);
  }
}
},{"../shared/Ball2":"shared/Ball2.js","../shared/Force":"shared/Force.js","../shared/Vector2D":"shared/Vector2D.js"}],"simulations/projectile-energy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ProjectileEnergy;

var _Ball = require("../shared/Ball2");

var _Graph = require("../shared/Graph");

var _Vector2D = require("../shared/Vector2D");

function ProjectileEnergy(canvas, context, canvas_bg, context_bg) {
  var ball, animId, graph;
  var m = 1,
      g = 10,
      u = 50,
      groundLevel = 350;
  var n = 0,
      tA = [],
      hA = [],
      peA = [],
      keA = [],
      teA = [];
  window.onload = init;

  function init() {
    ball = new _Ball.Ball({
      radius: 15,
      color: "#000000",
      gradient: true,
      mass: m
    });
    ball.pos2D = new _Vector2D.Vector2D(750, groundLevel);
    ball.draw(context);
    setupGraph();
    setupArray();
    animFrame();
  }

  function setupGraph() {
    graph = new _Graph.Graph(context_bg, 0, 10, 0, 1500, 200, 350, 450, 300);
    graph.drawgrid(1, 0.5, 500, 100);
    graph.drawaxes("t", "p.e,k.e,total");
  }

  function setupArray() {
    var t, v;

    for (var i = 0; i <= 100; i++) {
      tA[i] = i * 0.1;
      t = tA[i];
      v = u - g * t;
      hA[i] = u * t - 0.5 * g * Math.pow(t, 2);
      peA[i] = m * g * hA[i];
      keA[i] = 0.5 * Math.pow(v, 2);
      teA[i] = peA[i] + keA[i];
    }
  }

  function animFrame() {
    setTimeout(function () {
      animId = requestAnimationFrame(animFrame, canvas);
      animate();
    }, 1000 / 10);
  }

  function animate() {
    moveObjects();
    plotGraphs();
    n++;
    if (n === hA.length) stop();
  }

  function moveObjects() {
    ball.y = groundLevel - hA[n];
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw(context);
  }

  function plotGraphs() {
    graph.plot([tA[n]], [peA[n]], "#ff0000", true, false);
    graph.clear();
    graph.plot([tA[n]], [keA[n]], "#0000ff", true, false);
    graph.clear();
    graph.plot([tA[n]], [teA[n]], "#000000", true, false);
    graph.clear();
  }

  function stop() {
    cancelAnimationFrame(animId);
  }
}
},{"../shared/Ball2":"shared/Ball2.js","../shared/Graph":"shared/Graph.js","../shared/Vector2D":"shared/Vector2D.js"}],"simulations/collision-test.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CollisionTest;

var _Ball = require("../shared/Ball2");

var _Vector2D = require("../shared/Vector2D");

function CollisionTest(canvas, context) {
  var t0, dt, animId;
  var radius = 15; // ball radius

  var balls = [];
  window.onload = init;

  function init() {
    makeBalls();
    t0 = Date.now();
    animFrame();
  }

  function makeBalls() {
    setupBall("#0000ff", new _Vector2D.Vector2D(50, 200), new _Vector2D.Vector2D(30, 0));
    setupBall("#ff0000", new _Vector2D.Vector2D(500, 200), new _Vector2D.Vector2D(-20, 0));
    setupBall("#00ff00", new _Vector2D.Vector2D(300, 200), new _Vector2D.Vector2D(10, 0));
  }

  function setupBall(color, position, velocity) {
    var ball = new _Ball.Ball({
      radius: radius,
      color: color,
      gradient: true
    });
    ball.pos2D = position;
    ball.velo2D = velocity;
    ball.draw(context);
    balls.push(ball);
  }

  function animFrame() {
    animId = requestAnimationFrame(animFrame, canvas);
    onTimer();
  }

  function onTimer() {
    var t1 = Date.now();
    dt = 0.001 * (t1 - t0);
    if (dt > 0.2) dt = 0;
    t0 = t1;
    checkCollision();
    move();
  }

  function move() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(function (ball) {
      ball.pos2D = ball.pos2D.addScaled(ball.velo2D, dt);
      ball.draw(context);
    });
  }

  function checkCollision() {
    balls.forEach(function (ball1, i) {
      var ball2 = balls[(i + 1) % balls.length]; //   if (!ball2) return;

      if (_Vector2D.Vector2D.distance(ball1.pos2D, ball2.pos2D) <= ball1.radius + ball2.radius) {
        var tmp = ball1.velo2D;
        ball1.velo2D = ball2.velo2D;
        ball2.velo2D = tmp;
      }
    });
  }
}
},{"../shared/Ball2":"shared/Ball2.js","../shared/Vector2D":"shared/Vector2D.js"}],"simulations/obits.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Orbits;

var _Ball = require("../shared/Ball2");

var _Force = _interopRequireDefault(require("../shared/Force"));

var _Vector2D = require("../shared/Vector2D");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Orbits(canvas, context, canvas_bg, context_bg) {
  var planet, sun;
  var m = 1; // mass of planet

  var M = 1000000; // mass of sun

  var G = 1;
  var numStars = 100;
  var t0, dt, animId, force, acc;
  window.onload = init;

  function init() {
    drawStars(); // create stationary sun

    sun = new _Ball.Ball({
      radius: 70,
      color: "#ff9900",
      mass: M,
      gradient: true
    });
    sun.pos2D = new _Vector2D.Vector2D(450, canvas_bg.height / 2);
    sun.draw(context_bg); // create a moving planet

    planet = new _Ball.Ball({
      radius: 10,
      color: "#0000ff",
      gradient: true,
      mass: m
    });
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    planet.pos2D = new _Vector2D.Vector2D(350, canvas_bg.height / 2);
    planet.velo2D = new _Vector2D.Vector2D(0, -120);
    planet.draw(context); // make planet orbit

    t0 = Date.now();
    animateFrame();
  }

  function drawStars() {
    // context_bg.fillStyle = "#000000";
    // context_bg.fillRect(0, 0, canvas_bg.width, canvas_bg.height);
    //   create 100 randomly positioned starts
    for (var i = 0; i <= numStars; i++) {
      var star = new _Ball.Ball({
        radius: Math.random() * 2,
        color: "#ffff00"
      });
      star.pos2D = new _Vector2D.Vector2D(Math.random() * canvas_bg.width, Math.random() * canvas_bg.height);
      star.draw(context_bg);
    }
  }

  function animateFrame() {
    animId = requestAnimationFrame(animateFrame, canvas);
    onTimer();
  }

  function onTimer() {
    var t1 = Date.now();
    dt = 0.001 * (t1 - t0);
    if (dt > 0.2) dt = 0;
    t0 = t1;
    move();
  }

  function move() {
    moveObject(planet);
    calcForces();
    updateAccel();
    updateVelo(planet);
  }

  function moveObject(obj) {
    obj.pos2D = obj.pos2D.addScaled(obj.velo2D, dt);
    debugger;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    obj.draw(context);
  }

  function calcForces() {
    force = _Force.default.gravity(G, m, M, planet.pos2D.subtract(sun.pos2D));
  }

  function updateAccel() {
    acc = force.scaleBy(1 / m);
  }

  function updateVelo(obj) {
    obj.velo2D = obj.velo2D.addScaled(acc, dt);
  }
}
},{"../shared/Ball2":"shared/Ball2.js","../shared/Force":"shared/Force.js","../shared/Vector2D":"shared/Vector2D.js"}],"simulations/two-masses.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TwoMasses;

var _Ball = require("../shared/Ball2");

var _Force = _interopRequireDefault(require("../shared/Force"));

var _Vector2D = require("../shared/Vector2D");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasRenderingContext2D} context
 * @param {HTMLCanvasElement} canvas_bg
 * @param {CanvasRenderingContext2D} context_bg
 */
function TwoMasses(canvas, context, canvas_bg, context_bg) {
  var ball1, ball2;
  var r1 = 10,
      r2 = 40,
      m1 = 10,
      m2 = 60;
  var G = 100000;
  var t0, dt;
  var force, acc;
  window.onload = init;

  function init() {
    var ball1Opt = {
      radius: r1,
      color: "#0000ff",
      mass: m1,
      gradient: true
    };
    var ball2Opt = {
      radius: r2,
      color: "#ff0000",
      mass: m2,
      gradient: true
    };
    debugger;
    var ball1Init = new _Ball.Ball(ball1Opt);
    ball1Init.pos2D = new _Vector2D.Vector2D(150, 200);
    ball1Init.draw(context_bg);
    var ball2Init = new _Ball.Ball(ball2Opt);
    ball2Init.pos2D = new _Vector2D.Vector2D(350, 200);
    ball2Init.draw(context_bg);
    ball1Opt.color = "#9999ff";
    ball1 = new _Ball.Ball(ball1Opt);
    ball1.pos2D = new _Vector2D.Vector2D(150, 200);
    ball1.velo2D = new _Vector2D.Vector2D(0, 150);
    ball1.draw(context);
    ball2Opt.color = "#ff9999";
    ball2 = new _Ball.Ball(ball2Opt);
    ball2.pos2D = ball2Init.pos2D;
    ball2.velo2D = new _Vector2D.Vector2D(0, -2.5);
    ball2.draw(context);
    t0 = Date.now();
    animateFrame();
  }

  function animateFrame() {
    requestAnimationFrame(animateFrame, canvas);
    onTimer();
  }

  function onTimer() {
    var t1 = Date.now();
    dt = 0.001 * (t1 - t0);
    if (dt > 0.2) dt = 0;
    t0 = t1;
    move();
  }

  function move() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    moveObject(ball1);
    moveObject(ball2);
    calcForce(ball1, ball2); // force on ball1 due to ball2

    update(ball1);
    calcForce(ball2, ball1); // force on ball2 due to ball1

    update(ball2);
  }
  /**
   *
   * @param {Ball} obj
   */


  function moveObject(obj) {
    obj.pos2D = obj.pos2D.addScaled(obj.velo2D, dt);
    obj.draw(context);
  }
  /**
   * Calc gravitational force on obj2 due to obj1
   * @param {Ball} obj1
   * @param {Ball} obj2
   */


  function calcForce(obj1, obj2) {
    force = _Force.default.gravity(G, obj1.mass, obj2.mass, obj1.pos2D.subtract(obj2.pos2D));
  }
  /**
   *
   * @param {Ball} obj
   */


  function update(obj) {
    updateAccel(obj);
    updateVelo(obj);
  }
  /**
   *
   * @param {Ball} obj
   */


  function updateAccel(obj) {
    acc = force.scaleBy(1 / obj.mass);
  }
  /**
   *
   * @param {Ball} obj
   */


  function updateVelo(obj) {
    obj.velo2D = obj.velo2D.addScaled(acc, dt);
  }
}
},{"../shared/Ball2":"shared/Ball2.js","../shared/Force":"shared/Force.js","../shared/Vector2D":"shared/Vector2D.js"}],"shared/Triangle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Triangle = /*#__PURE__*/function () {
  function Triangle() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
    var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;
    var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "#ffff00";
    var alpha = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
    var isEmpty = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

    _classCallCheck(this, Triangle);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.alpha = alpha;
    this.isEmpty = isEmpty;
  }
  /**
   *
   * @param {CanvasRenderingContext2D} context
   */


  _createClass(Triangle, [{
    key: "draw",
    value: function draw(context) {
      context.save();

      if (this.isEmpty) {
        context.strokeStyle = this.color;
      } else {
        context.globalAlpha = this.alpha;
        context.fillStyle = this.color;
      }

      context.beginPath();
      context.moveTo(this.x, this.y);
      context.lineTo(this.x + this.width, this.y);
      context.lineTo(this.x + this.width / 2, this.y - this.height);
      context.lineTo(this.x, this.y);
      context.closePath();

      if (this.isEmpty) {
        context.stroke();
      } else {
        context.fill();
      }

      context.restore();
    }
  }]);

  return Triangle;
}();

exports.default = Triangle;
},{}],"shared/Rocket.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Ball2 = require("./Ball2");

var _Triangle = _interopRequireDefault(require("./Triangle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var Rocket = /*#__PURE__*/function (_Ball) {
  _inherits(Rocket, _Ball);

  var _super = _createSuper(Rocket);

  function Rocket() {
    var _this;

    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 40;
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#0000ff";
    var mass = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    _classCallCheck(this, Rocket);

    _this = _super.call(this, {
      color: color,
      mass: mass
    });
    _this.width = width;
    _this.height = height;
    return _this;
  }
  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param {boolean} isFiring
   */


  _createClass(Rocket, [{
    key: "draw",
    value: function draw(context, isFiring) {
      if (isFiring) {
        var exhaust = new _Triangle.default(this.x, this.y + 0.5 * this.height, this.width, this.height, "#ffff00", 0.8);
        exhaust.draw(context);
      }

      var capsule = new _Triangle.default(this.x, this.y, this.width, this.height, this.color);
      capsule.draw(context);
    }
  }]);

  return Rocket;
}(_Ball2.Ball);

exports.default = Rocket;
},{"./Ball2":"shared/Ball2.js","./Triangle":"shared/Triangle.js"}],"simulations/rocket-test.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RocketTest;

var _Vector2D = require("../shared/Vector2D");

var _Ball = require("../shared/Ball2");

var _Rocket = _interopRequireDefault(require("../shared/Rocket"));

var _Force = _interopRequireDefault(require("../shared/Force"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasRenderingContext2D} context
 * @param {HTMLCanvasElement} canvas_bg
 * @param {CanvasRenderingContext2D} context_bg
 */
function RocketTest(canvas, context, canvas_bg, context_bg) {
  var rocket, planet, massPlanet, centerPlanet, radiusPlanetSquared;
  var G = 0.1,
      dmdt = 0.5,
      dmdtSide = 0.1,
      fuelMass = 3.5,
      fuelSideMass = 3.5;
  var fuelUsed = 0,
      fuelSideUsed = 0;
  var ve = new _Vector2D.Vector2D(0, 200);
  var veSide = new _Vector2D.Vector2D(-100, 0);
  var applyTrust = false;
  var showExhaust = true;
  var orientation = 1;
  var animId, t0, dt, acc, force;
  window.onload = init;

  function init() {
    //   create starts
    for (var i = 0; i < 100; i++) {
      var star = new _Ball.Ball({
        color: "#ffff00",
        radius: 1
      });
      star.pos2D = new _Vector2D.Vector2D(Math.random() * canvas_bg.width, Math.random() * canvas_bg.height);
      star.draw(context_bg);
    } // create a stationary planet


    planet = new _Ball.Ball({
      radius: 100,
      color: "#0033ff",
      mass: 1e6
    });
    planet.pos2D = new _Vector2D.Vector2D(400, 400);
    planet.draw(context_bg);
    massPlanet = planet.mass;
    centerPlanet = planet.pos2D;
    radiusPlanetSquared = Math.pow(planet.radius, 2); // create rocket

    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    rocket = new _Rocket.default(12, 12, "#cccccc", 10);
    rocket.pos2D = new _Vector2D.Vector2D(400, 300);
    rocket.draw(context, showExhaust); // set up event listeners

    window.addEventListener("keydown", startSideThrust, false);
    window.addEventListener("keyUp", stopSideTrust, false); // launch the rocket

    t0 = Date.now();
    animFrame();
  }

  function animFrame() {
    animId = requestAnimationFrame(animFrame, canvas);
    onTimer();
  }

  function onTimer() {
    var t1 = Date.now();
    dt = 0.001 * (t1 - t0);
    if (dt > 0.2) dt = 0;
    t0 = t1;
    move();
  }

  function move() {
    moveObjects();
    calcForces();
    updateAccel();
    updateVelo();
    updateMass();
    monitor();
  }

  function moveObjects() {
    rocket.pos2D = rocket.pos2D.addScaled(rocket.velo2D, dt);
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    rocket.draw(context, showExhaust);
  }

  function calcForces() {
    var gravity = _Force.default.gravity(G, massPlanet, rocket.mass, rocket.pos2D.subtract(centerPlanet));

    var thrust = new _Vector2D.Vector2D(0, 0);
    var thrustSide = new _Vector2D.Vector2D(0, 0);

    if (fuelUsed < fuelMass) {
      thrust = ve.scaleBy(-dmdt);
    }

    if (fuelSideUsed < fuelSideMass && applyTrust) {
      thrustSide = veSide.scaleBy(-dmdtSide * orientation);
    }

    force = _Force.default.add([gravity, thrust, thrustSide]);
  }

  function updateAccel() {
    acc = force.scaleBy(1 / rocket.mass);
  }

  function updateVelo() {
    rocket.velo2D = rocket.velo2D.addScaled(acc, dt);
  }

  function updateMass() {
    if (fuelUsed < fuelMass) {
      fuelUsed += dmdt * dt;
      rocket.mass += -dmdt * dt;
    }

    if (fuelSideUsed < fuelSideMass && applyTrust) {
      fuelSideUsed += dmdtSide * dt;
      rocket.mass += -dmdtSide * dt;
    }
  }

  function monitor() {
    if (showExhaust && fuelUsed >= fuelMass) {
      showExhaust = false;
    }

    if (rocket.pos2D.subtract(centerPlanet).lengthSquared() < radiusPlanetSquared) {
      stop();
    }
  }

  function startSideThrust(e) {
    if (e.keyCode === 39) {
      //right arrow
      applyTrust = true;
      orientation = 1;
    }

    if (e.keyCode === 47) {
      // left arrow
      applyTrust = false;
      orientation = -1;
    }
  }

  function stopSideTrust() {
    applyTrust = false;
  }

  function stop() {
    cancelAnimationFrame(animId);
  }
}
},{"../shared/Vector2D":"shared/Vector2D.js","../shared/Ball2":"shared/Ball2.js","../shared/Rocket":"shared/Rocket.js","../shared/Force":"shared/Force.js"}],"simulations/sliding.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Sliding;

var _Ball = require("../shared/Ball2");

var _Force = _interopRequireDefault(require("../shared/Force"));

var _Vector2D = require("../shared/Vector2D");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasRenderingContext2D} context
 * @param {HTMLCanvasElement} canvas_bg
 * @param {CanvasRenderingContext2D} context_bg
 */
function Sliding(canvas, context, canvas_bg, context_bg) {
  var ball;
  var m = 1;
  var g = 10;
  var ck = 0.2; // coeff of kinetic friction

  var cs = 0.25; // coeff of stating friction

  var vtol = 0.000001; // tolarance
  // inclined plane

  var xtop = 50,
      ytop = 150,
      xbot = 450,
      ybot = 250;
  var angle = Math.atan2(ytop - ybot, xtop - xbot); // angle of incline

  var t0, dt, animId, force, acc;
  window.onload = init;

  function init() {
    //   create ball
    ball = new _Ball.Ball({
      radius: 20,
      color: "#0000ff",
      mass: m,
      gradient: true
    });
    ball.pos2D = new _Vector2D.Vector2D(50, 130);
    ball.velo2D = new _Vector2D.Vector2D(0, 0);
    ball.draw(context); // create an inclined plane

    context_bg.strokeStyle = "#333333";
    context_bg.beginPath();
    context_bg.moveTo(xtop, ytop);
    context_bg.lineTo(xbot, ybot);
    context_bg.closePath();
    context_bg.stroke(); // make ball move

    t0 = Date.now();
    animFrame();
  }

  function animFrame() {
    animId = requestAnimationFrame(animFrame, canvas);
    onTimer();
  }

  function onTimer() {
    var t1 = Date.now();
    dt = 0.001 * (t1 - t0);
    if (dt > 0.2) dt = 0;
    t0 = t1;
    move();
  }

  function move() {
    moveObject();
    calcForces();
    updateAccel();
    updateVelo();
  }

  function moveObject() {
    ball.pos2D = ball.pos2D.addScaled(ball.velo2D, dt);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw(context);
  }

  function calcForces() {
    var gravity = _Force.default.constantGravity(m, g);

    var normal = _Vector2D.Vector2D.vector2D(m * g * Math.cos(angle), 0.5 * Math.PI - angle, false);

    var coeff;

    if (ball.velo2D.length() < vtol) {
      coeff = Math.min(cs * normal.length(), m * g * Math.sin(angle)); // static friction
    } else {
      coeff = ck * normal.length(); // kinetic friction
    }

    var friction = normal.perp(coeff);
    force = _Force.default.add([gravity, friction, normal]);
    debugger;
  }

  function updateAccel() {
    acc = force.scaleBy(1 / m);
  }

  function updateVelo() {
    ball.velo2D = ball.velo2D.addScaled(acc, dt);
  }
}
},{"../shared/Ball2":"shared/Ball2.js","../shared/Force":"shared/Force.js","../shared/Vector2D":"shared/Vector2D.js"}],"simulations/Balloon.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Balloon;

var _Ball = require("../shared/Ball2");

var _Force = _interopRequireDefault(require("../shared/Force"));

var _Vector2D = require("../shared/Vector2D");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasRenderingContext2D} context
 * @param {HTMLCanvasElement} canvas_bg
 * @param {CanvasRenderingContext2D} context_bg
 */
function Balloon(canvas, context, canvas_bg, context_bg) {
  var ball, t0, dt;
  var m = 1;
  var g = 10;
  var k = 0.01; // drag coefficient

  var force, acc;
  var rhoP = 1.1;
  var rhoInc = 0.001; // number by which to increment rho

  var rho = 1.2;
  var skyGradient;
  window.onload = init;

  function init() {
    // draw background
    context_bg.fillStyle = "#00ff55";
    context_bg.fillRect(0, 500, canvas.width, 100);
    skyGradient = context.createLinearGradient(canvas.width / 2, 0, canvas.width / 2, canvas.height);
    skyGradient.addColorStop(0, "#ffffff");
    skyGradient.addColorStop(1, "#0055ff");
    context.fillStyle = skyGradient;
    context.fillRect(0, 0, canvas.width, canvas.height); // initialize ball

    ball = new _Ball.Ball({
      radius: 20,
      color: "#ff0000",
      gradient: true,
      mass: m
    });
    ball.pos2D = new _Vector2D.Vector2D(425, 480);
    ball.draw(context); // add event listeners

    addEventListener("keydown", changeDensity, false); // initialize animation

    t0 = Date.now();
    animFrame();
  }

  function animFrame() {
    requestAnimationFrame(animFrame, canvas);
    onTimer();
  }

  function onTimer() {
    var t1 = Date.now();
    dt = 0.001 * (t1 - t0);
    if (dt > 0.2) dt = 0;
    t0 = t1;
    move();
  }

  function move() {
    moveObject();
    calcForces();
    updateAccel();
    updateVelo();
  }

  function changeDensity(e) {
    if (e.keyCode === 38) rhoP += rhoInc; // up arrow

    if (e.keyCode === 40) rhoP -= rhoInc; // down arrow

    console.log(rhoP);
  }

  function moveObject() {
    ball.pos2D = ball.pos2D.addScaled(ball.velo2D, dt);
    context.fillStyle = skyGradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    ball.draw(context);
  }

  function calcForces() {
    var gravity = _Force.default.constantGravity(m, g);

    var V = m / rhoP; // volume of displaced air

    var upthrust = _Force.default.upthrust(rho, V, g);

    var drag = _Force.default.drag(k, ball.velo2D);

    force = _Force.default.add([gravity, upthrust, drag]);
  }

  function updateAccel() {
    acc = force.scaleBy(1 / m);
  }

  function updateVelo() {
    ball.velo2D = ball.velo2D.addScaled(acc, dt);
  }
}
},{"../shared/Ball2":"shared/Ball2.js","../shared/Force":"shared/Force.js","../shared/Vector2D":"shared/Vector2D.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _ballParticle = _interopRequireDefault(require("./simulations/ball-particle"));

var _bouncingBall = _interopRequireDefault(require("./simulations/bouncing-ball"));

var _calculus = _interopRequireDefault(require("./simulations/calculus"));

var _graph = _interopRequireDefault(require("./simulations/graph"));

var _projectileTest = _interopRequireDefault(require("./simulations/projectile-test"));

var _forceExample = _interopRequireDefault(require("./simulations/force-example"));

var _energyExample = _interopRequireDefault(require("./simulations/energy-example"));

var _floatingBall = _interopRequireDefault(require("./simulations/floating-ball"));

var _projectileEnergy = _interopRequireDefault(require("./simulations/projectile-energy"));

var _collisionTest = _interopRequireDefault(require("./simulations/collision-test"));

var _obits = _interopRequireDefault(require("./simulations/obits"));

var _twoMasses = _interopRequireDefault(require("./simulations/two-masses"));

var _rocketTest = _interopRequireDefault(require("./simulations/rocket-test"));

var _sliding = _interopRequireDefault(require("./simulations/sliding"));

var _Balloon = _interopRequireDefault(require("./simulations/Balloon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
var canvas_bg = document.querySelector(".canvas_bg");
var context_bg = canvas_bg.getContext("2d"); // CollisionTest(canvas, context);
// Balloon(canvas, context, canvas_bg, context_bg);
// Sliding(canvas, context, canvas_bg, context_bg);
// RocketTest(canvas, context, canvas_bg, context_bg);
// TwoMasses(canvas, context, canvas_bg, context_bg);
// Orbits(canvas, context, canvas_bg, context_bg);
// ProjectileEnergy(canvas, context, canvas_bg, context_bg);

(0, _floatingBall.default)(canvas, context, canvas_bg, context_bg); // ForceExample(canvas, context, canvas_bg, context_bg);
// EnergyExample(canvas, context, canvas_bg, context_bg);
// ballParticles(canvas, context);
// bouncingBall(canvas, context);
// Calculus(canvas, context);
// GraphFn(canvas, context);
// ProjectileTest(canvas, context);
},{"./simulations/ball-particle":"simulations/ball-particle.js","./simulations/bouncing-ball":"simulations/bouncing-ball.js","./simulations/calculus":"simulations/calculus.js","./simulations/graph":"simulations/graph.js","./simulations/projectile-test":"simulations/projectile-test.js","./simulations/force-example":"simulations/force-example.js","./simulations/energy-example":"simulations/energy-example.js","./simulations/floating-ball":"simulations/floating-ball.js","./simulations/projectile-energy":"simulations/projectile-energy.js","./simulations/collision-test":"simulations/collision-test.js","./simulations/obits":"simulations/obits.js","./simulations/two-masses":"simulations/two-masses.js","./simulations/rocket-test":"simulations/rocket-test.js","./simulations/sliding":"simulations/sliding.js","./simulations/Balloon":"simulations/Balloon.js"}],"../../../../Users/bbdnet2169/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60639" + '/');

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