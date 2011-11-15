(function() {
  $(function() {
    var attr, coordAfterBoundary, getBox, getCoord, items, location, rectLocation, startDraw, tempRect;
    items = [];
    location = "";
    rectLocation = "";
    startDraw = false;
    tempRect = "";
    attr = {
      name: "Song!"
    };
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
      if ((coord.y + menuBox.height) > boundary.height) {
        coord.y = boundary.height - menuBox.height;
      }
      return coord;
    };
    $('svg').live('contextmenu', function(e) {
      var coord, menuBox;
      location = getCoord(e);
      menuBox = getBox($('#main-menu'));
      coord = location;
      if (currentCanvas.isSelected()) {
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
    $('svg').live('mousedown', function(e) {
      rectLocation = getCoord(e);
      startDraw = true;
      currentCanvas.rectangle = new rect(currentCanvas.paper, rectLocation, rectLocation);
      return currentCanvas.setLight();
    });
    $('svg').live('mousemove', function(e) {
      if (startDraw) {
        if (currentCanvas.rectangle !== void 0) {
          currentCanvas.rectangle.remRect(currentCanvas.rectangle.getRect());
        }
        currentCanvas.rectangle = new rect(currentCanvas.paper, rectLocation, getCoord(e));
        return currentCanvas.setLight();
      }
    });
    $('svg').live('mouseup', function(e) {
      if (startDraw) {
        startDraw = false;
      }
      if (currentCanvas.rectangle !== void 0) {
        currentCanvas.rectangle.remRect(currentCanvas.rectangle.getRect());
        return currentCanvas.rectangle = void 0;
      }
    });
    $('body').click(function(e) {
      $('#main-menu').hide();
      $('#edit-menu').hide();
      if (e.target.nodeName !== "circle" && e.target.nodeName !== "path") {
        return currentCanvas.removeGlow();
      }
    });
    $('#option_module').click(function(e) {
      return $('#popup-module').show();
    });
    $('#option_data_sink').click(function(e) {
      return $('#popup-data-sink').show();
    });
    $('#createModuleButton').click(function() {
      currentCanvas.newModule(location, attr);
      return $(this).parents('.popUpObjectBox').hide();
    });
    $('#createDataSinkButton').click(function() {
      currentCanvas.newDataSink(location, attr);
      return $(this).parents('.popUpObjectBox').hide();
    });
    $('.cancelObjectButton').click(function() {
      return $(this).parents('.popUpObjectBox').hide();
    });
    window.canvasHash = {
      'canvas-1': new canvasDisplay($('#canvas-1'))
    };
    window.currentCanvas = canvasHash['canvas-1'];
    $('svg:last').attr('id', 'svg-canvas-1');
    currentCanvas.newDataSink({
      x: 100,
      y: 200
    }, attr);
    currentCanvas.newModule({
      x: 450,
      y: 250
    }, attr);
    return currentCanvas.newDataSource({
      x: 400,
      y: 250
    }, attr);
  });
}).call(this);
