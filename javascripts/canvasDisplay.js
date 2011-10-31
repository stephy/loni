(function() {
  var canvasDisplay;
  window.canvasDisplay = canvasDisplay = (function() {
    function canvasDisplay(canvas) {
      var position;
      position = canvas.position();
      this.paper = Raphael(position.left, position.top, canvas.width(), canvas.height());
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
    canvasDisplay.prototype.startStartPath = function(obj, startObj) {
      this.startPathCoord = obj;
      this.startObj = startObj;
      return console.log(this.startPathCoord);
    };
    canvasDisplay.prototype.drawPath = function(coord) {
      var newcoord;
      if (this.path) {
        this.path.remPath(this.path.getPath());
      }
      newcoord = {
        x: this.startPathCoord.x + coord.x,
        y: this.startPathCoord.y + coord.y
      };
      return this.path = new path(this.paper, this.startPathCoord, newcoord);
    };
    canvasDisplay.prototype.removePath = function() {
      return this.path.remPath(this.path.getPath());
    };
    canvasDisplay.prototype.savePath = function(coord, endObj) {
      this.startObj.c.drag(pathdragger, pathmove, pathup);
      endObj.c.drag(pathdragger, pathmove, pathup);
      this.paths.push(this.paper.connection2(this.startObj.c, endObj.c, "#000"));
      return this.startPathCoord;
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
