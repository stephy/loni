(function() {
  var baseModule, dataSink, module, sink;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  baseModule = (function() {
    function baseModule(disp, prevCoord) {
      this.disp = disp;
      this.prevCoord = prevCoord;
      this.ztranslate = __bind(this.ztranslate, this);
      this.mDown = __bind(this.mDown, this);
      this.drag = __bind(this.drag, this);
      this.hoverOut = __bind(this.hoverOut, this);
      this.hoverIn = __bind(this.hoverIn, this);
      this.dim = {
        width: 50,
        height: 50
      };
      this.c = this.draw();
      this.objs = [];
      this.name = "Sexy Stephy";
      this.c.drag(this.drag, this.mDown, this.mUp);
      this.c.hover(this.hoverIn, this.hoverOut);
    }
    baseModule.prototype.draw = function() {
      var c;
      c = this.disp.paper.circle(this.prevCoord.x, this.prevCoord.y, 25);
      c.attr({
        fill: '#ddf',
        stroke: '#33f',
        'stroke-width': 3
      });
      return c;
    };
    baseModule.prototype.insertChildren = function(obj) {
      return this.objs.push(obj);
    };
    baseModule.prototype.hoverIn = function() {
      var dim;
      dim = this.c.getBBox();
      return this.text = this.disp.paper.text(dim.x + dim.width / 2, dim.y + dim.height / 2, this.name);
    };
    baseModule.prototype.hoverOut = function() {
      return this.text.remove();
    };
    baseModule.prototype.drag = function(dx, dy) {
      this.disp.glow.ztranslate(dx - this.prevCoord.x, dy - this.prevCoord.y);
      this.prevCoord = {
        x: dx,
        y: dy
      };
      return this.text.remove();
    };
    baseModule.prototype.mDown = function(x, y) {
      this.text.remove();
      this.prevCoord = {
        x: 0,
        y: 0
      };
      this.disp.setGlow(this);
      return false;
    };
    baseModule.prototype.glowAll = function(attr) {
      var ele, _i, _len, _ref;
      this.glowing = this.c.glow(attr);
      _ref = this.objs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ele = _ref[_i];
        ele.glowAll(attr);
      }
      return this;
    };
    baseModule.prototype.removeAll = function() {
      var ele, _i, _len, _ref;
      this.glowing.remove();
      _ref = this.objs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ele = _ref[_i];
        ele.removeAll();
      }
      return this;
    };
    baseModule.prototype.ztranslate = function(dx, dy) {
      var ele, _i, _len, _ref, _results;
      if (this.glowing) {
        this.glowing.translate(dx, dy);
      }
      this.c.translate(dx, dy);
      _ref = this.objs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ele = _ref[_i];
        _results.push(ele.ztranslate(dx, dy));
      }
      return _results;
    };
    return baseModule;
  })();
  window.module = module = (function() {
    __extends(module, baseModule);
    function module() {
      module.__super__.constructor.apply(this, arguments);
    }
    return module;
  })();
  window.sink = sink = (function() {
    __extends(sink, baseModule);
    function sink() {
      sink.__super__.constructor.apply(this, arguments);
    }
    sink.prototype.draw = function() {
      var c, connectDim;
      connectDim = {
        x: this.dim.width / 2 + this.prevCoord.x,
        y: this.prevCoord.y - this.dim.height / 2
      };
      c = this.disp.paper.circle(connectDim.x, connectDim.y, 10);
      c.attr({
        fill: '#ddf',
        stroke: '#33f',
        'stroke-width': 1
      });
      return c;
    };
    return sink;
  })();
  window.dataSink = dataSink = (function() {
    __extends(dataSink, baseModule);
    function dataSink(disp, prevCoord) {
      this.disp = disp;
      this.prevCoord = prevCoord;
      dataSink.__super__.constructor.call(this, this.disp, this.prevCoord);
      this.objs.push(new sink(this.disp, this.prevCoord));
    }
    dataSink.prototype.draw = function() {
      var c;
      c = this.disp.paper.path("M " + this.prevCoord.x + " " + this.prevCoord.y + " l " + this.dim.height + " 0 l -" + (this.dim.width / 2) + " " + this.dim.height + " z");
      c.attr({
        stroke: '#00f',
        fill: '#0f0'
      });
      return c;
    };
    return dataSink;
  })();
}).call(this);
