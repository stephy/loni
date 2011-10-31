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
    canvasDisplay.prototype.startStartPath = function(obj) {
      return this.startPathCoord = obj;
    };
    canvasDisplay.prototype.drawPath = function(coord) {
      return console.log("draw path");
    };
    canvasDisplay.prototype.removePath = function() {
      return console.log("removed Path");
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
