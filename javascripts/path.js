(function() {
  var path;
  window.path = path = (function() {
    var existingLine;
    existingLine = {};
    function path(r, startPos, endPos) {
      this.startPos = startPos;
      this.endPos = endPos;
      existingLine = r.connection(this.startPos, this.endPos, "#000");
    }
    path.prototype.getPath = function() {
      return existingLine;
    };
    path.prototype.remPath = function(existPath) {
      return existPath.line.remove();
    };
    return path;
  })();
}).call(this);
