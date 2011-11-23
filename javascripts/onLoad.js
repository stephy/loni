(function() {
  $(function() {
    var attr, coordAfterBoundary, createNewCopy, generate_data_sink_attr, getBox, getCoord, items, location, newCoord, oldCoord, pasteSelected, rectLocation, startDraw, tempCopiedArray, tempRect;
    items = [];
    location = "";
    rectLocation = "";
    startDraw = false;
    tempRect = "";
    tempCopiedArray = [];
    attr = {
      name: "Song!"
    };
    generate_data_sink_attr = function() {
      var data_sink_attr, data_sink_description, data_sink_name, data_sink_package, data_sink_pkg_version, data_sink_tags;
      data_sink_name = $('input#data-sink_name').val();
      data_sink_package = $('input#data-sink_package').val();
      data_sink_pkg_version = $('input#data-sink_pkg_version').val();
      data_sink_tags = $('input#data_sink_tags').val();
      data_sink_description = $('textarea#data_sink_description').val();
      data_sink_attr = {
        name: data_sink_name,
        package: data_sink_package,
        version: data_sink_pkg_version,
        tags: data_sink_tags,
        description: data_sink_description
      };
      $('input#data-sink_name').val('');
      $('input#data-sink_package').val('');
      $('input#data-sink_pkg_version').val('');
      $('input#data_sink_tags').val('');
      $('textarea#data_sink_description').val('');
      return data_sink_attr;
    };
    pasteSelected = function(objArray) {
      var a, b, i, map, _ref, _results;
      console.log("PASTING!!!");
      map = new Object();
      console.log(map);
      _results = [];
      for (i = 0, _ref = objArray.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        _results.push((objArray[i].modID === 0) || (objArray[i].objs[0].connectedObject === void 0) || (objArray[i].objs[0].connectedObject.isBeingSelected = 0) ? createNewCopy(objArray[i]) : map[objArray[i].objs[0].connectedObject] === void 0 ? map[objArray[i].objs[0]] = objArray[i] : (a = createNewCopy(map[objArray[i].objs[0].connectedObject]), b = createNewCopy(objArray[i]), currentCanvas.savePathForCopy(a.objs[0], b.objs[0])));
      }
      return _results;
    };
    createNewCopy = function(obj) {
      var a;
      if (obj.modID === 0) {
        a = currentCanvas.newModule({
          x: obj.c.getBBox().x,
          y: obj.c.getBBox().y
        }, attr);
      } else if (obj.modID === 1) {
        a = currentCanvas.newDataSink({
          x: obj.c.getBBox().x,
          y: obj.c.getBBox().y
        }, attr);
      } else {
        a = currentCanvas.newDataSource({
          x: obj.c.getBBox().x,
          y: obj.c.getBBox().y
        }, attr);
      }
      a.ztranslate(newCoord.x - oldCoord.x, newCoord.y - oldCoord.y);
      return a;
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
        $('#main-menu').hide();
        $('#edit-menu').show().css({
          top: coord.y,
          left: coord.x
        });
      } else {
        $('#edit-menu').hide();
        $('#main-menu').show().css({
          top: coord.y,
          left: coord.x
        });
      }
      return false;
    });
    $('svg').live('mousedown', function(e) {
      var offset;
      if (e.which !== 1) {
        return;
      }
      rectLocation = getCoord(e);
      currentCanvas.rectangle = new rect(currentCanvas.paper, rectLocation, rectLocation);
      currentCanvas.setLight();
      return offset = currentCanvas.offsetCoord;
    });
    $('svg').live('mousemove', function(e) {
      currentCanvas.moveToFront();
      if (currentCanvas.rectangleStatus === 0) {
        if (currentCanvas.rectangle !== void 0) {
          currentCanvas.rectangle.remRect(currentCanvas.rectangle.getRect());
          currentCanvas.rectangle = new rect(currentCanvas.paper, rectLocation, getCoord(e));
          currentCanvas.setLight();
          return console.log(currentCanvas.selectedObjectArray.length);
        }
      }
    });
    $('svg').live('mouseup', function(e) {
      currentCanvas.setLight();
      console.log(currentCanvas.selectedObjectArray.length);
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
      return $('li#module-info-bt').addClass('tabSelected');
    });
    $('#option_data_source').click(function(e) {
      $('#popup-data-source').show();
      $('.popup-tab').hide();
      $('#data-source-info-bt').addClass('tabSelected');
      $('#data-source-info').show();
      return $('#data-source-inputs-bt.tabSelected').removeClass('tabSelected');
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
      currentCanvas.newDataSink(location, generate_data_sink_attr());
      return $(this).parents('.popUpObjectBox').hide();
    });
    $('#createDataSourceButton').click(function() {
      currentCanvas.newDataSource(location, generate_data_sink_attr());
      return $(this).parents('.popUpObjectBox').hide();
    });
    $('.cancelObjectButton').click(function() {
      return $(this).parents('.popUpObjectBox').hide();
    });
    oldCoord = {
      x: 0,
      y: 0
    };
    newCoord = {
      x: 0,
      y: 0
    };
    $('.paste').click(function(e) {
      newCoord = {
        x: e.pageX,
        y: e.pageY
      };
      return pasteSelected(tempCopiedArray);
    });
    $('#copy').click(function(e) {
      oldCoord = {
        x: e.pageX,
        y: e.pageY
      };
      console.log(e.pageX);
      tempCopiedArray = currentCanvas.selectedObjectArray;
      return console.log(tempCopiedArray);
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
