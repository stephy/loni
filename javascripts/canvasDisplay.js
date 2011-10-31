(function() {
  var canvasDisplay;
  window.canvasDisplay = canvasDisplay = (function() {
    function canvasDisplay(canvas) {
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
    }
    canvasDisplay.prototype.newModule = function(coord) {
      var item;
      return item = new module(this, coord);
    };
    canvasDisplay.prototype.newDataSink = function(coord) {
      var item;
      return item = new dataSink(this, coord);
    };
    canvasDisplay.prototype.setGlow = function(obj) {
      if (this.glow !== "") {
        this.glow.removeAll();
      }
      return this.glow = obj.glowAll({
        color: '#000'
      });
    };
    canvasDisplay.prototype.removeGlow = function() {
      if (this.glow !== "") {
        this.glow.removeAll();
        return this.glow = "";
      }
    };
    canvasDisplay.prototype.startStartPath = function(boxCoord, startObj, startCoord) {
      this.startPathCoord = boxCoord;
      return this.startObj = startObj;
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
      return this.path.remPath(this.path.getPath());
    };
    canvasDisplay.prototype.savePath = function(coord, endObj) {
      this.paths.push(this.paper.connection2(this.startObj.c, endObj.c, "#000"));
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
    return canvasDisplay;
  })();
}).call(this);
