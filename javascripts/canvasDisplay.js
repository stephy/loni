(function() {
  var canvasDisplay;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.canvasDisplay = canvasDisplay = (function() {
    function canvasDisplay(canvas) {
      this.sremove = __bind(this.sremove, this);
      var position;
      position = canvas.position();
      this.paper = Raphael(position.left, position.top, canvas.width(), canvas.height());
      this.offsetCoord = {
        dx: position.left,
        dy: position.top
      };
      this.glow = "";
      this.linkHover = false;
      this.pathStartCoord = {};
      this.paths = [];
      this.drawingPath = false;
      this.rectangle = void 0;
      this.holder = [];
      this.onselect = [];
    }
    canvasDisplay.prototype.newModule = function(coord, attr) {
      return this.holder.push(new module(this, coord, attr));
    };
    canvasDisplay.prototype.newDataSink = function(coord, attr) {
      return this.holder.push(new dataSink(this, coord, attr));
    };
    canvasDisplay.prototype.newDataSource = function(coord, attr) {
      return this.holder.push(new dataSource(this, coord, attr));
    };
    canvasDisplay.prototype.setGlow = function(obj) {
      if (obj.moduleGlow !== "") {
        obj.removeAll();
      }
      if (this.rectangle !== void 0 && this.rectangle.testRange(obj.c.getBBox())) {
        return obj.glowAll({
          color: '#000'
        });
      }
    };
    canvasDisplay.prototype.removeGlow = function() {
      if (this.glow !== "") {
        this.glow.removeAll();
        return this.glow = "";
      }
    };
    canvasDisplay.prototype.isDrawing = function() {
      return this.drawingPath;
    };
    canvasDisplay.prototype.startPathType = function() {
      return this.startObj.getType();
    };
    canvasDisplay.prototype.startStartPath = function(boxCoord, startObj, startCoord) {
      this.startPathCoord = boxCoord;
      this.startObj = startObj;
      return this.drawingPath = true;
    };
    canvasDisplay.prototype.drawPath = function(coord) {
      if (this.path) {
        this.path.remPath(this.path.getPath());
      }
      return this.path = new path(this.paper, this.startPathCoord, {
        x: coord.x - this.offsetCoord.dx,
        y: coord.y - this.offsetCoord.dy
      });
    };
    canvasDisplay.prototype.removePath = function() {
      this.drawingPath = false;
      return this.path.remPath(this.path.getPath());
    };
    canvasDisplay.prototype.savePath = function(coord, endObj) {
      if (this.startObj.getType() !== endObj.getType()) {
        this.paths.push(this.paper.connection2(this.startObj.c, endObj.c, "#000"));
      }
      this.drawingPath = false;
      return this.startPathCoord;
    };
    canvasDisplay.prototype.translatePaths = function() {
      var ele, _i, _len, _ref, _results;
      _ref = this.paths;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ele = _ref[_i];
        _results.push(this.paper.connection2(ele));
      }
      return _results;
    };
    canvasDisplay.prototype.isSelected = function() {
      if (this.glow !== "") {
        return false;
      } else {
        return true;
      }
    };
    canvasDisplay.prototype.select = function(x, y, w, h) {
      return this.paper.rect(x, y, w, h);
    };
    canvasDisplay.prototype.setHover = function() {
      return this.linkHover = true;
    };
    canvasDisplay.prototype.unsetHover = function() {
      return this.linkHover = false;
    };
    canvasDisplay.prototype.isHover = function() {
      return this.linkHover;
    };
    canvasDisplay.prototype.deleteRect = function() {
      if (this.rectangle !== void 0) {
        this.setSelectedElements();
        this.rectangle.remRect(this.rectangle.getRect());
        return this.rectangle = void 0;
      }
    };
    canvasDisplay.prototype.setSelectedElements = function() {
      var i, _ref, _results;
      _results = [];
      for (i = 0, _ref = this.holder.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        _results.push(this.rectangle.testRange(this.holder[i].c.getBBox()) ? this.onselect.push(this.holder[i]) : void 0);
      }
      return _results;
    };
    canvasDisplay.prototype.sremove = function() {
      return this.paper.clear();
    };
    canvasDisplay.prototype.setLight = function() {
      var i, _ref, _results;
      _results = [];
      for (i = 0, _ref = this.holder.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        _results.push(this.setGlow(this.holder[i]));
      }
      return _results;
    };
    return canvasDisplay;
  })();
}).call(this);
