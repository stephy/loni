(function() {
  $(function() {
    var CANVASBOX, canvas, coordAfterBoundary, getBox, getCoord, items, location;
    items = [];
    location = "";
    getCoord = function(e) {
      var coord;
      coord = {
        x: e.offsetX,
        y: e.offsetY
      };
      return coord;
    };
    getBox = function(obj) {
      var box;
      box = {
        width: obj.width(),
        height: obj.height()
      };
      return box;
    };
    coordAfterBoundary = function(coord, menuBox, boundary) {
      if ((coord.x + menuBox.width) > boundary.width) {
        coord.x = boundary.width - menuBox.width;
        $('ul.menu li ul').css({
          left: -menuBox.width
        });
      } else {
        $('ul.menu li ul').css({
          left: menuBox.width
        });
      }
      if ((coord.y + menuBox.height) > CANVASBOX.height) {
        coord.y = CANVASBOX.height - menuBox.height;
      }
      return coord;
    };
    CANVASBOX = getBox($('#canvas'));
    $(document).bind('contextmenu', function(e) {
      var coord, menuBox;
      location = e;
      menuBox = getBox($('#main-menu'));
      coord = coordAfterBoundary(getCoord(e), menuBox, CANVASBOX);
      if (canvas.isSelected()) {
        $('#edit-menu').hide();
        $('#main-menu').show().css({
          top: coord.y,
          left: coord.x
        });
      } else {
        $('#main-menu').hide();
        $('#edit-menu').show().css({
          top: coord.y,
          left: coord.x
        });
      }
      return false;
    });
    $('body').click(function(e) {
      $('#main-menu').hide();
      $('#edit-menu').hide();
      if (e.target.nodeName !== "circle") {
        return canvas.removeGlow();
      }
    });
    $('#option_module').click(function(e) {
      return canvas.newModule(location);
    });
    return canvas = new canvasDisplay($('#canvas'));
  });
}).call(this);
