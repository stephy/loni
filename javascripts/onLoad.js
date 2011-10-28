(function() {
  $(function() {
    var MAXHEIGHT, MAXWIDTH, canvas, items, location;
    MAXWIDTH = $('#canvas').width();
    MAXHEIGHT = $('#canvas').height();
    items = [];
    location = "";
    $(document).bind('contextmenu', function(e) {
      var menuHeight, menuWidth, posx, posy;
      location = e;
      posx = e.offsetX;
      posy = e.offsetY;
      menuWidth = $('#main-menu').width();
      menuHeight = $('#main-menu').height();
      if ((posx + menuWidth) > MAXWIDTH) {
        posx = MAXWIDTH - menuWidth;
        $('ul.menu li ul').css({
          left: -161
        });
      } else {
        $('ul.menu li ul').css({
          left: 161
        });
      }
      if ((posy + menuHeight) > MAXHEIGHT) {
        posy = MAXHEIGHT - menuHeight;
      }
      if (canvas.isSelected()) {
        $('#main-menu').show().css({
          top: posy,
          left: posx
        });
      } else {
        $('#main-menu').show().css({
          top: 0,
          left: 0
        });
      }
      return false;
    });
    $('body').click(function(e) {
      return $('#main-menu').hide();
    });
    $('#option_module').click(function(e) {
      return canvas.newModule(location);
    });
    return canvas = new canvasDisplay($('#canvas'));
  });
}).call(this);
