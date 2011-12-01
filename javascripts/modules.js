(function() {
  var baseModule, dataSink, dataSource, groupmodule, module, sink, source;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  baseModule = (function() {

    function baseModule(disp, prevCoord, attr) {
      this.disp = disp;
      this.prevCoord = prevCoord;
      this.attr = attr;
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
      this.coord = {
        x: 0,
        y: 0
      };
      this.id = 0;
      this.c.drag(this.drag, this.mDown, this.mUp);
      this.c.hover(this.hoverIn, this.hoverOut);
      this.moduleGlow = "";
      this.modID = 0;
      this.connectedObject = void 0;
      this.isBeingSelected = 0;
    }

    baseModule.prototype.draw = function() {
      var c;
      c = this.disp.paper.circle(this.prevCoord.x, this.prevCoord.y, 40);
      c.attr({
        fill: '120-#a4abd6-#8793c9:60-#8793c9',
        stroke: '#6d76c1',
        'stroke-width': 5
      });
      return c;
    };

    baseModule.prototype.insertChildren = function(obj) {
      return this.objs.push(obj);
    };

    baseModule.prototype.hoverIn = function() {
      var dim, label;
      dim = this.c.getBBox();
      this.text = this.disp.paper.text(dim.x + dim.width / 2 + 60, dim.y + 20, this.attr.name);
      label = this.text;
      return label.attr({
        'font-size': 20,
        fill: '#75757c'
      });
    };

    baseModule.prototype.deleteObject = function() {
      return this.c.remove();
    };

    baseModule.prototype.hoverOut = function() {
      return this.text.remove();
    };

    baseModule.prototype.drag = function(dx, dy) {
      var elmt, tx, ty;
      this.disp.deleteRect();
      elmt = this.c.getBBox();
      tx = 0;
      ty = 0;
      if (elmt.x + elmt.width > this.disp.paper.width) {
        tx = -10;
      } else if (elmt.x < 10) {
        tx = 10;
      } else {
        tx = dx - this.prevCoord.x;
      }
      if (elmt.y + elmt.height > this.disp.paper.height - 10) {
        ty = -10;
      } else if (elmt.y < 10) {
        ty = 10;
      } else {
        ty = dy - this.prevCoord.y;
      }
      this.disp.translateSelected(tx, ty);
      this.prevCoord = {
        x: dx,
        y: dy
      };
      return this.text.remove();
    };

    baseModule.prototype.mDown = function() {
      this.text.remove();
      this.coord = {
        x: this.c.attr("cx"),
        y: this.c.attr("cy")
      };
      this.prevCoord = {
        x: 0,
        y: 0
      };
      this.disp.deleteRect();
      return false;
    };

    baseModule.prototype.glowAll = function(attr) {
      var ele, _i, _len, _ref;
      this.moduleGlow = this.c.glow(attr);
      console.log("glow is: " + this.moduleGlow);
      _ref = this.objs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ele = _ref[_i];
        ele.glowAll(attr);
      }
      return this;
    };

    baseModule.prototype.removeAll = function() {
      var ele, _i, _len, _ref;
      this.moduleGlow.remove();
      this.moduleGlow = "";
      _ref = this.objs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ele = _ref[_i];
        ele.removeAll();
      }
      return this;
    };

    baseModule.prototype.ztranslate = function(dx, dy) {
      var ele, _i, _len, _ref, _results;
      if (this.moduleGlow !== "") {
        console.log("glow to be shifted is: " + this.moduleGlow);
        this.moduleGlow.translate(dx, dy);
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

  window.groupmodule = groupmodule = (function() {

    __extends(groupmodule, baseModule);

    function groupmodule() {
      groupmodule.__super__.constructor.apply(this, arguments);
    }

    groupmodule.prototype.draw = function() {
      var c;
      c = this.disp.paper.rect(this.prevCoord.x - (this.dim.width / 2), this.prevCoord.y, this.dim.width * 3 / 5, this.dim.height * 7 / 4, 25);
      c.attr({
        stroke: '#cdc9c9',
        fill: '120-#a4abd6-#8793c9:60-#8793c9',
        'stroke-width': 25
      });
      return c;
    };

    return groupmodule;

  })();

  window.sink = sink = (function() {

    __extends(sink, baseModule);

    function sink(disp, prevCoord, attr) {
      this.disp = disp;
      this.prevCoord = prevCoord;
      this.attr = attr;
      this.ztranslate = __bind(this.ztranslate, this);
      this.hoverOut = __bind(this.hoverOut, this);
      this.hoverIn = __bind(this.hoverIn, this);
      this.otherMouseUp = __bind(this.otherMouseUp, this);
      this.mUp = __bind(this.mUp, this);
      this.mDown = __bind(this.mDown, this);
      this.drag = __bind(this.drag, this);
      sink.__super__.constructor.call(this, this.disp, this.prevCoord, this.attr);
      this.connectable = true;
      this.c.mouseup(this.otherMouseUp);
    }

    sink.prototype.draw = function() {
      var c, connectDim;
      connectDim = {
        x: this.dim.width / 2 + this.prevCoord.x,
        y: this.prevCoord.y - this.dim.height / 2
      };
      c = this.disp.paper.circle(connectDim.x, connectDim.y, 10);
      c.attr({
        fill: '#FFF',
        stroke: '#6d76c1',
        'stroke-width': 2
      });
      return c;
    };

    sink.prototype.drag = function(dx, dy, x, y) {
      this.prevCoord = {
        x: dx,
        y: dy
      };
      this.disp.drawPath({
        x: x,
        y: y
      });
      return this.text.remove();
    };

    sink.prototype.mDown = function(x, y) {
      this.text.remove();
      this.prevCoord = {
        x: 0,
        y: 0
      };
      this.disp.setGlow(this);
      this.disp.startStartPath(this.c.getBBox(), this, {
        x: x,
        y: y
      });
      return false;
    };

    sink.prototype.mUp = function(e) {
      return this.disp.removePath();
    };

    sink.prototype.getType = function() {
      return 'sink';
    };

    sink.prototype.otherMouseUp = function(e) {
      return this.disp.savePath(this.c.getBBox(), this);
    };

    sink.prototype.hoverIn = function() {
      var dim;
      dim = this.c.getBBox();
      if (this.disp.isDrawing() && this.disp.startPathType() === this.getType()) {
        this.text = this.disp.paper.text(dim.x + dim.width, dim.y + dim.height, "Cannot Connect!");
        return this.text.attr({
          stroke: '#f00'
        });
      } else {
        return this.text = this.disp.paper.text(dim.x + dim.width, dim.y + dim.height, this.attr.name);
      }
    };

    sink.prototype.hoverOut = function() {
      return this.text.remove();
    };

    sink.prototype.ztranslate = function(dx, dy) {
      sink.__super__.ztranslate.call(this, dx, dy);
      return this.disp.translatePaths();
    };

    return sink;

  })();

  window.dataSink = dataSink = (function() {

    __extends(dataSink, baseModule);

    function dataSink(disp, prevCoord, attr) {
      this.disp = disp;
      this.prevCoord = prevCoord;
      this.attr = attr;
      dataSink.__super__.constructor.call(this, this.disp, this.prevCoord, this.attr);
      this.objs.push(new sink(this.disp, this.prevCoord, {
        name: "Sink"
      }));
      this.modID = 1;
    }

    dataSink.prototype.draw = function() {
      var c;
      c = this.disp.paper.path("M " + this.prevCoord.x + " " + this.prevCoord.y + " l " + this.dim.height + " 0 l -" + (this.dim.width / 2) + " " + this.dim.height + " z");
      c.attr({
        stroke: '#75757c',
        fill: '#c8c8cd',
        'stroke-width': 10
      });
      return c;
    };

    dataSink.prototype.deleteObject = function() {
      this.c.remove();
      return this.objs[0].deleteObject();
    };

    return dataSink;

  })();

  window.source = source = (function() {

    __extends(source, sink);

    function source(disp, prevCoord, attr) {
      this.disp = disp;
      this.prevCoord = prevCoord;
      this.attr = attr;
      source.__super__.constructor.call(this, this.disp, this.prevCoord, this.attr);
      this.connectable = true;
      this.c.mouseup(this.otherMouseUp);
    }

    source.prototype.draw = function() {
      var c, start;
      start = {
        x: this.dim.width / 2 + this.prevCoord.x,
        y: this.prevCoord.y - this.dim.height
      };
      c = this.disp.paper.path("M " + this.prevCoord.x + " " + (this.prevCoord.y + this.dim.height) + " l -" + (this.dim.width / 4) + " -" + (this.dim.height / 4) + " l " + (this.dim.width / 2) + " 0 z");
      c.attr({
        fill: '#FFF',
        stroke: '#6d76c1',
        'stroke-width': 2
      });
      return c;
    };

    source.prototype.getType = function() {
      return 'source';
    };

    return source;

  })();

  window.dataSource = dataSource = (function() {

    __extends(dataSource, baseModule);

    function dataSource(disp, prevCoord, attr) {
      this.disp = disp;
      this.prevCoord = prevCoord;
      this.attr = attr;
      dataSource.__super__.constructor.call(this, this.disp, this.prevCoord, this.attr);
      this.objs.push(new source(this.disp, this.prevCoord, {
        name: "Source"
      }));
      this.modID = 2;
    }

    dataSource.prototype.deleteObject = function() {
      this.c.remove();
      return this.objs[0].deleteObject();
    };

    dataSource.prototype.draw = function() {
      var c;
      c = this.disp.paper.circle(this.prevCoord.x, this.prevCoord.y, this.dim.height / 2);
      c.attr({
        stroke: '#75757c',
        fill: '#c8c8cd',
        'stroke-width': 10
      });
      return c;
    };

    return dataSource;

  })();

}).call(this);
