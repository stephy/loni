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
    }).mouseup(function() {
      startDraw = false;
      theRect.remRect(theRect.getRect());
      return theRect = void 0;
    });
  });
}).call(this);
