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
})({"../../shared/Ball.js":[function(require,module,exports) {
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

Ball.prototype.drawOnCanvas = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
};
},{}],"../../shared/Graph.js":[function(require,module,exports) {
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

  }, {
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
  }]);

  return Graph;
}();

exports.Graph = Graph;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _Ball = require("../../shared/Ball");

var _Graph = require("../../shared/Graph");

var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
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

var _graph$createPoints = graph.createPoints(function (x) {
  return Math.tan(x * (Math.PI / 180));
}, -720, 720),
    xVals = _graph$createPoints.xVals,
    yVals = _graph$createPoints.yVals; // for (var i = 0; i <= 1000; i++) {
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
},{"../../shared/Ball":"../../shared/Ball.js","../../shared/Graph":"../../shared/Graph.js"}],"../../../../../Users/bbdnet2169/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61521" + '/');

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
},{}]},{},["../../../../../Users/bbdnet2169/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=bundle.js.map