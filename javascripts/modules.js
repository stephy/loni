(function() {
  var dataSink, path, sink;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.path = path = (function() {
    function path(startx, starty, endx, endy, disp) {
      this.startx = startx;
      this.starty = starty;
      this.endx = endx;
      this.endy = endy;
      this.disp = disp;
      this.empty = false;
      this.path = this.disp.paper.path(this.getStringPath());
    }
    path.prototype.setStart = function(x, y) {
      this.startx = x;
      return this.starty = y;
    };
    path.prototype.setEnd = function(x, y) {
      this.endx = x;
      return this.endy = y;
    };
    path.prototype.getStringPath = function() {
      return "M " + this.startx + " " + this.starty + " l " + this.endx + " " + this.endy;
    };
    path.prototype.makePath = function() {
      this.path.remove();
      return this.path = this.disp.paper.path(this.getStringPath());
    };
    path.prototype.destroy = function() {
      this.empty = true;
      return this.path.remove();
    };
    return path;
  })();
  window.sink = sink = (function() {
    function sink(disp, dim) {
      this.disp = disp;
      this.dim = dim;
      this.ztranslate = __bind(this.ztranslate, this);
      this.mUp = __bind(this.mUp, this);
      this.mDown = __bind(this.mDown, this);
      this.drag = __bind(this.drag, this);
      this.d = this.disp.paper.circle(dim.x + dim.width / 2, dim.y, 10);
      this.d.attr("fill", '#faa');
      this.d.attr('stroke', '#000');
      this.d.hover(__bind(function() {
        this.disp.setGlow(this.d);
        return this.disp.setHover();
      }, this), __bind(function() {
        return this.disp.unsetHover();
      }, this));
      this.d.drag(this.drag, this.mDown, this.mUp);
      this.path = new path(0, 0, 0, 0, this.disp);
    }
    sink.prototype.drag = function(dx, dy) {
      this.path.setEnd(dx, dy);
      return this.path.makePath();
    };
    sink.prototype.mDown = function(x, y) {
      this.path.setStart(x, y);
      return this.disp.setGlow(this.d);
    };
    sink.prototype.mUp = function(x, y) {
      if (!this.disp.isHover()) {
        return this.path.destroy();
      }
    };
    sink.prototype.ztranslate = function(x, y) {
      this.path.setStart(this.path.startx + x, this.path.starty + y);
      this.path.setEnd(this.path.endx - x, this.path.endy - y);
      this.path.makePath();
      return this.d.translate(x, y);
    };
    return sink;
  })();
  window.dataSink = dataSink = (function() {
    function dataSink(disp, e) {
      this.disp = disp;
      this.ztranslate = __bind(this.ztranslate, this);
      this.mDown = __bind(this.mDown, this);
      this.drag = __bind(this.drag, this);
      this.c = this.disp.paper.circle(e.offsetX, e.offsetY, 50);
      this.dxOld = 0;
      this.dyOld = 0;
      this.objs = [];
      this.objs.push(this);
      this.initialize();
    }
    dataSink.prototype.initialize = function() {
      this.c.attr("fill", '#f00');
      this.c.attr('stroke', '#000');
      this.disp.setGlow(this.c);
      this.sink = new sink(this.disp, this.c.getBBox());
      this.objs.push(this.sink);
      this.c.hover(__bind(function() {
        return this.disp.setGlow(this.c);
      }, this));
      return this.c.drag(this.drag, this.mDown);
    };
    dataSink.prototype.drag = function(dx, dy) {
      var ele, _i, _len, _ref;
      _ref = this.objs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ele = _ref[_i];
        ele.ztranslate(dx - this.dxOld, dy - this.dyOld);
      }
      if (this.disp.glow !== "") {
        this.disp.glow.translate(dx - this.dxOld, dy - this.dyOld);
      }
      this.dxOld = dx;
      return this.dyOld = dy;
    };
    dataSink.prototype.mDown = function(x, y) {
      this.dxOld = 0;
      this.dyOld = 0;
      return this.disp.setGlow(this.c);
    };
    dataSink.prototype.ztranslate = function(dx, dy) {
      return this.c.translate(dx, dy);
    };
    return dataSink;
  })();
}).call(this);
