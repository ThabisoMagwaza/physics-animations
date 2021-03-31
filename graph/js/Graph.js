export class Graph {
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
  constructor(context, xmin, xmax, ymin, ymax, x0, y0, width, height) {
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
  drawgrid(xmajor, xminor, ymajor, yminor) {
    const xRange = this.xmax - this.xmin;
    const yRange = this.ymax - this.ymin;
    const xdivs = xRange / xminor;
    const ydivs = yRange / yminor;
    // ticks in px
    this.xtick = this.width / xdivs;
    this.ytick = this.height / ydivs;

    // for plotting
    this.xUnitToPxMult = this.xtick / xminor;
    this.yUnitToPxMult = this.ytick / yminor;

    // find startX in on canvas
    const xticksFromOrigin = this.xmin / xminor;
    const xpixelsFromOrigin = Math.abs(xticksFromOrigin * this.xtick);
    this.xStart =
      xticksFromOrigin < 0
        ? this.x0 - xpixelsFromOrigin
        : this.x0 + xpixelsFromOrigin;
    this.xEnd = this.xStart + xdivs * this.xtick; // in px
    // find startY on canvas
    const yticksFromOrigin = this.ymin / yminor;
    const ypixelsFromOrigin = Math.abs(yticksFromOrigin * this.ytick);
    this.yStart =
      yticksFromOrigin < 0
        ? this.y0 + ypixelsFromOrigin
        : this.y0 - ypixelsFromOrigin;
    this.yEnd = this.yStart - ydivs * this.ytick; // in px

    this.ctx.strokeStyle = "lightgray";

    // draw minor divisions
    this.ctx.beginPath();
    for (let x = this.xStart; x <= this.xEnd; x += this.xtick) {
      this.ctx.moveTo(x, this.yStart);
      this.ctx.lineTo(x, this.yEnd);
    }

    for (let y = this.yStart; y >= this.yEnd; y -= this.ytick) {
      this.ctx.moveTo(this.xStart, y);
      this.ctx.lineTo(this.xEnd, y);
    }
    this.ctx.stroke();

    // major ticks
    const x_tick_major = this.xtick * (xmajor / xminor);
    const y_tick_major = this.ytick * (ymajor / yminor);

    // draw major division
    this.ctx.strokeStyle = "#999999";
    this.ctx.beginPath();
    for (let x = this.xStart; x <= this.xEnd; x += x_tick_major) {
      this.ctx.moveTo(x, this.yStart);
      this.ctx.lineTo(x, this.yEnd);
    }
    for (let y = this.yStart; y >= this.yEnd; y -= y_tick_major) {
      this.ctx.moveTo(this.xStart, y);
      this.ctx.lineTo(this.xEnd, y);
    }
    this.ctx.stroke();

    // display font
    this.ctx.font = "10pt Arial";
    this.ctx.fillStyle = "#000000";
    this.ctx.textAlign = "right";
    this.ctx.textBaseline = "top";

    // draw labels
    let curr_x = this.xmin;
    let curr_y = this.ymin;

    this.ctx.beginPath();
    for (let x = this.xStart; x <= this.xEnd; x += x_tick_major) {
      this.ctx.fillText(curr_x, x + 2, this.y0 + 5);
      curr_x += xmajor;
    }
    for (let y = this.yStart; y >= this.yEnd; y -= y_tick_major) {
      this.ctx.fillText(curr_y, this.x0 - 5, y - 5);
      curr_y += ymajor;
    }
    this.ctx.stroke();
  }

  /**
   * Draws the axes with labels
   * @param {String} xlabel
   * @param {String} ylabel
   */
  drawaxes(xlabel = "X", ylabel = "Y") {
    // write labels
    this.ctx.font = "10pt Arial";
    this.ctx.fillStyle = "#000000";
    this.ctx.textAlign = "right";
    this.ctx.textBaseline = "top";

    this.ctx.fillText(ylabel, this.x0 + 5, this.yEnd - 20);
    this.ctx.fillText(xlabel, this.xEnd + 20, this.y0 + 15);

    // draw axes
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
  plot(xvals, yvals, color = "#ff0000", dots = false, lines = true) {
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = color;

    const xvalsPx = xvals.map((x) => {
      const pxFromOrigin = Math.abs(x * this.xUnitToPxMult);
      return x < 0 ? this.x0 - pxFromOrigin : this.x0 + pxFromOrigin;
    });

    const yvalsPx = yvals.map((y) => {
      const pxFromOrigin = Math.abs(y * this.yUnitToPxMult);
      return y < 0 ? this.y0 + pxFromOrigin : this.y0 - pxFromOrigin;
    });

    if (dots) {
      for (let i = 0; i < xvalsPx.length; i++) {
        this.ctx.beginPath();
        this.ctx.arc(xvalsPx[i], yvalsPx[i], 2, 0, 2 * Math.PI);
        this.ctx.fill();
      }
    }

    if (lines) {
      this.ctx.beginPath();
      for (let i = 0; i < xvalsPx.length - 1; i++) {
        this.ctx.moveTo(xvalsPx[i], yvalsPx[i]);
        this.ctx.lineTo(xvalsPx[i + 1], yvalsPx[i + 1]);
      }
      this.ctx.stroke();
    }
  }

  /**
   * Calculate x-y value for a given function
   * @param {Function} fn
   * @param {Number} xmin
   * @param {Number} xmax
   * @param {Number} numPoints
   * @returns {Object} Object containing one array with the x-values and another with the corresponding y-values
   */
  createPoints(fn, xmin, xmax, numPoints = 100) {
    const retObj = {
      xVals: [],
      yVals: [],
    };
    const xtick = (xmax - xmin) / numPoints;
    for (let i = xmin; i <= xmax; i += xtick) {
      retObj.xVals.push(i);
      retObj.yVals.push(fn(i));
    }
    // ensure that the graph ends at xmax
    if (retObj.xVals[retObj.xVals.length - 1] !== xmax) {
      retObj.xVals[retObj.xVals.length - 1] = xmax;
      retObj.yVals[retObj.yVals.length - 1] = fn(xmax);
    }
    return retObj;
  }
}
