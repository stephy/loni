(function() {
  $(function() {
    var canvas, items;
    items = [];
    $('body').dblclick(function(e) {
      if (e.target.nodeName === 'svg') {
        return canvas.newDataSink(e);
      }
    });
    return canvas = new canvasDisplay($('#canvas'));
  });
}).call(this);
