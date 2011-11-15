(function() {
  $(function() {
    var curPosition, prevPosition, r, shapes, startDraw, theRect;
    r = Raphael("holder", 640, 480);
    shapes = [r.ellipse(190, 100, 30, 20), r.rect(290, 80, 60, 40, 10), r.rect(290, 180, 60, 40, 2), r.ellipse(450, 100, 20, 20)];
    startDraw = false;
    prevPosition = {};
    curPosition = {};
    theRect = void 0;
    return $('body').mousedown(function(e) {
      startDraw = true;
      return prevPosition = {
        x: e.offsetX,
        y: e.offsetY
      };
    }).mousemove(function(e) {
      var i, _results;
      if (startDraw) {
        curPosition = {
          x: e.offsetX,
          y: e.offsetY
        };
        if (theRect !== void 0) {
          theRect.remRect(theRect.getRect());
        }
        theRect = new rect(r, prevPosition.x, prevPosition.y, curPosition.x, curPosition.y);
        _results = [];
        for (i = 1; i <= 3; i++) {
          _results.push(theRect.testRange(shapes[i].getBBox()) ? theRect.setGlow(shapes[i], true) : theRect.setGlow(shapes[i], false));
        }
        return _results;
      }
    }).mouseup(function() {
      startDraw = false;
      theRect.remRect(theRect.getRect());
      return theRect = void 0;
    });
  });
}).call(this);
