(function() {
  $(function() {
    var canvas, items, location;
    items = [];
    location = "";
    $('body').dblclick(function(e) {
      location = e;
      return $('#main-menu').toggle().css({
        top: e.offsetY,
        left: e.offsetX
      });
    });
    $('body').click(function(e) {
      return $('#main-menu').hide();
    });
    $('#option_module').click(function(e) {
      return canvas.newDataSink(location);
    });
    return canvas = new canvasDisplay($('#canvas'));
  });
}).call(this);
