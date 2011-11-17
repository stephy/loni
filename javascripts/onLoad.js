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
      var offset;
      currentCanvas.deleteRect();
      if (e.which !== 1) {
        return;
      }
      rectLocation = getCoord(e);
      currentCanvas.rectangle = new rect(currentCanvas.paper, rectLocation, rectLocation);
      currentCanvas.setLight();
      offset = currentCanvas.offsetCoord;
      if (currentCanvas.paper.getElementByPoint(rectLocation.x + offset.dx, rectLocation.y + offset.dy) !== null) {
        console.log(currentCanvas.paper.getElementByPoint(rectLocation.x + offset.dx, rectLocation.y + offset.dy));
        startDraw = false;
        return currentCanvas.setSelectedElements();
      } else {
        console.log("setting true");
        return startDraw = true;
      }
    });
    $('svg').live('mousemove', function(e) {
      if (currentCanvas.onselect.length === 0) {
        if (startDraw) {
          if (currentCanvas.rectangle !== void 0) {
            currentCanvas.rectangle.remRect(currentCanvas.rectangle.getRect());
          }
          currentCanvas.rectangle = new rect(currentCanvas.paper, rectLocation, getCoord(e));
          return currentCanvas.setLight();
        } else {
          return console.log("translate all objects");
        }
      }
    });
    $('svg').live('mouseup', function(e) {
      currentCanvas.onselect = [];
      if (startDraw) {
        startDraw = false;
      }
      return currentCanvas.deleteRect();
    });
    $('body').click(function(e) {
      $('#main-menu').hide();
      $('#edit-menu').hide();
      if (e.target.nodeName !== "circle" && e.target.nodeName !== "path") {
        return currentCanvas.removeGlow();
      }
    });
    $('#option_module').click(function(e) {
      $('#popup-module').show();
      $('.popup-tab').hide();
      $('#module-info').show();
      $('#module-parameters-bt.tabSelected').removeClass('tabSelected');
      $('#module-execution-bt.tabSelected').removeClass('tabSelected');
      $('#module-metadata-bt.tabSelected').removeClass('tabSelected');
      $('#module-info-module').show();
      $('#module-info-module-website').show();
      $('li#module-info-bt').addClass('tabSelected');
      return $('#option_data_source').click(function(e) {
        return $('#popup-data-source').show();
      });
    });
    $('#option_data_sink').click(function(e) {
      $('#popup-data-sink').show();
      $('.popup-tab').hide();
      $('#data-sink-info-bt').addClass('tabSelected');
      $('#data-sink-info').show();
      return $('#data-sink-outputs-bt.tabSelected').removeClass('tabSelected');
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
