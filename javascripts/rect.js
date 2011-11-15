(function() {
  var rect;
  window.rect = rect = (function() {
    var existingRect;
    existingRect = {};
    function rect(r, prev, cur) {
      this.prev = prev;
      this.cur = cur;
      this.prevX = this.prev.x;
      this.prevY = this.prev.y;
      this.curX = this.cur.x;
      this.curY = this.cur.y;
      this.height = this.curY - this.prevY;
      this.width = this.curX - this.prevX;
      this.newX = this.prevX;
      this.newY = this.prevY;
      if (this.height >= 0 && this.width >= 0) {} else if (this.height <= 0 && this.width <= 0) {
        this.height = Math.abs(this.height);
        this.width = Math.abs(this.width);
        this.newX = this.prevX - this.width;
        this.newY = this.prevY - this.height;
      } else if (this.height <= 0 && this.width >= 0) {
        this.height = Math.abs(this.height);
        this.newY = this.prevY - this.height;
      } else if (this.height >= 0 && this.width <= 0) {
        this.width = Math.abs(this.width);
        this.newX = this.prevX - this.width;
      }
      existingRect = r.rect(this.newX, this.newY, this.width, this.height);
    }
    rect.prototype.getRect = function() {
      return existingRect;
    };
    rect.prototype.remRect = function(existRect) {
      return existRect.remove();
    };
    rect.prototype.testRange = function(obj) {
      this.obj = obj;
      if (this.obj.x > this.newX + this.width || this.obj.x + this.obj.width < this.newX || this.obj.y + this.obj.height < this.newY || this.obj.y > this.newY + this.height) {
        return false;
      }
      return true;
    };
    rect.prototype.setGlow = function(curObj, state) {
      this.c = curObj.glow();
      if (state) {
        return this.c = curObj.glow();
      } else {
        return this.c.remove();
      }
    };
    return rect;
  })();
}).call(this);
