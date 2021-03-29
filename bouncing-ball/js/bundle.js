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
})({"objects/Environment.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Environment = Environment;

function Environment() {
  this.gravity = 10;
  this.width = 500;
  this.height = 500;
  this.isPlaying = true;
}

Environment.prototype.clearCanvas = function (ctx) {
  ctx.clearRect(0, 0, this.width, this.height);
};
},{}],"objects/Ball.js":[function(require,module,exports) {
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
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _Environment = require("./objects/Environment");

var _Ball = require("./objects/Ball");

var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
var tooltip = document.querySelector(".tooltip");
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
  env = new _Environment.Environment();
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
  ball.drawOnCanvas(context);
}
},{"./objects/Environment":"objects/Environment.js","./objects/Ball":"objects/Ball.js"}],"../../../../../Users/bbdnet2169/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59552" + '/');

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