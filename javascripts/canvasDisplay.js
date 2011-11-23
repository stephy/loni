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
      this.selectedObjectArray = [];
      this.rectangleStatus = 0;
    }
    canvasDisplay.prototype.newModule = function(coord, attr) {
      var a;
      a = new module(this, coord, attr);
      this.holder.push(a);
      return a;
    };
    canvasDisplay.prototype.newDataSink = function(coord, attr) {
      var a;
      a = new dataSink(this, coord, attr);
      this.holder.push(a);
      return a;
    };
    canvasDisplay.prototype.newDataSource = function(coord, attr) {
      var a;
      a = new dataSource(this, coord, attr);
      this.holder.push(a);
      return a;
    };
    canvasDisplay.prototype.setGlow = function(obj) {
      if (obj.moduleGlow !== "") {
        obj.removeAll();
      }
      if (this.rectangle !== void 0 && this.rectangle.testRange(obj.c.getBBox())) {
        this.selectedObjectArray.push(obj);
        obj.isBeingSelected = 1;
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
      this.rectangleStatus = 1;
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
        this.startObj.connectedObject = endObj;
        endObj.connectedObject = this.startObj;
        this.rectangleStatus = 0;
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
    canvasDisplay.prototype.moveToFront = function() {
      var ele, _i, _len, _ref, _results;
      _ref = this.holder;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ele = _ref[_i];
        _results.push(ele.c.toFront());
      }
      return _results;
    };
    canvasDisplay.prototype.isSelected = function() {
      if (this.selectedObjectArray.length > 0) {
        return true;
      } else {
        return false;
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
        this.rectangle.remRect(this.rectangle.getRect());
        return this.rectangle = void 0;
      }
    };
    canvasDisplay.prototype.setSelectedElements = function() {
      var i, _ref, _results;
      _results = [];
      for (i = 0, _ref = this.holder.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        _results.push(this.rectangle.testRange(this.holder[i].c.getBBox()) ? this.selectedObjectArray.push(this.holder[i]) : void 0);
      }
      return _results;
    };
    canvasDisplay.prototype.sremove = function() {
      return this.paper.clear();
    };
    canvasDisplay.prototype.setLight = function() {
      var i, j, _ref, _ref2, _results;
      this.selectedObjectArray = [];
      for (j = 0, _ref = this.holder.length - 1; 0 <= _ref ? j <= _ref : j >= _ref; 0 <= _ref ? j++ : j--) {
        this.holder[j].isBeingSelected = 0;
      }
      _results = [];
      for (i = 0, _ref2 = this.holder.length - 1; 0 <= _ref2 ? i <= _ref2 : i >= _ref2; 0 <= _ref2 ? i++ : i--) {
        _results.push(this.setGlow(this.holder[i]));
      }
      return _results;
    };
    canvasDisplay.prototype.gCopy = function() {
      var i, j, _ref, _ref2, _results;
      for (i = 0, _ref = this.selectedObjectArray.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        this.selectedObjectMap[this.selectedObjectArray[i].c] = i;
      }
      _results = [];
      for (j = 0, _ref2 = this.selectedObjectArray.length - 1; 0 <= _ref2 ? j <= _ref2 : j >= _ref2; 0 <= _ref2 ? j++ : j--) {
        console.log("here is j" + j);
        _results.push(console.log(this.selectedObjectMap[this.selectedObjectArray[j].c]));
      }
      return _results;
    };
    return canvasDisplay;
  })();
}).call(this);
