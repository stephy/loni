(function() {
  $(function() {
    var attr, coordAfterBoundary, generate_data_sink_attr, generate_data_source_attr, generate_module_attr, getBox, getCoord, items, location, pasteSelected, rectLocation, startDraw, tempCopiedArray, tempRect;
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
      $('input.data_sink_input').val('');
      $('textarea.data_sink_input').val('');
      return data_sink_attr;
    };
    generate_data_source_attr = function() {
      var data_source_attr, data_source_description, data_source_name, data_source_package, data_source_pkg_version, data_source_tags;
      data_source_name = $('input#data-source_name').val();
      data_source_package = $('input#data-source_package').val();
      data_source_pkg_version = $('input#data-source_pkg_version').val();
      data_source_tags = $('input#data_source_tags').val();
      data_source_description = $('textarea#data_source_description').val();
      data_source_attr = {
        name: data_source_name,
        package: data_source_package,
        version: data_source_pkg_version,
        tags: data_source_tags,
        description: data_source_description
      };
      $('input#data-source_input').val('');
      $('textarea#data_source_input').val('');
      return data_source_attr;
    };
    generate_module_attr = function() {
      var module_attr, module_description, module_name, module_package, module_pkg_version, module_tags;
      module_name = $('input#module_name').val();
      module_package = $('input#module_package').val();
      module_pkg_version = $('input#module_pkg_version').val();
      module_tags = $('input#module_tags').val();
      module_description = $('textarea#module_description').val();
      module_attr = {
        name: module_name,
        package: module_package,
        version: module_pkg_version,
        tags: module_tags,
        description: module_description
      };
      $('input#module_input').val('');
      $('textarea#module_input').val('');
      return module_attr;
    };
    pasteSelected = function(objArray) {
      var i, _ref, _results;
      _results = [];
      for (i = 0, _ref = objArray.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        _results.push(objArray[i].modID === 0 ? currentCanvas.newModule({
          x: objArray[i].c.getBBox().x,
          y: objArray[i].c.getBBox().y
        }, attr) : objArray[i].modID === 1 ? currentCanvas.newDataSink({
          x: objArray[i].c.getBBox().x,
          y: objArray[i].c.getBBox().y
        }, attr) : currentCanvas.newDataSource({
          x: objArray[i].c.getBBox().x,
          y: objArray[i].c.getBBox().y
        }, attr));
      }
      return _results;
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
      console.log("test");
      currentCanvas.selectedObjectArray = [];
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
        currentCanvas.setLight();
      } else {
        console.log("setting true");
      }
      return startDraw = true;
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
      console.log(currentCanvas.selectedObjectArray.length);
      if (currentCanvas.rectangle !== void 0) {
        currentCanvas.rectangle.remRect(currentCanvas.rectangle.getRect());
      }
      if (startDraw) {
        return startDraw = false;
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
      $('#popup-module').show();
      $('.popup-tab').hide();
      $('#module-info').show();
      $('#module-parameters-bt.tabSelected').removeClass('tabSelected');
      $('#module-execution-bt.tabSelected').removeClass('tabSelected');
      $('#module-metadata-bt.tabSelected').removeClass('tabSelected');
      $('#module-info-module').show();
      $('#module-info-module-website').show();
      $('li#module-info-bt').addClass('tabSelected');
      $('#option_data_source').click(function(e) {
        $('#popup-data-source').show();
        return $('.popup-tab').hide();
      });
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
      currentCanvas.newModule(location, generate_module_attr());
      return $(this).parents('.popUpObjectBox').hide();
    });
    $('#paste').click(function() {
      return pasteSelected(tempCopiedArray);
    });
    $('#copy').click(function() {
      return tempCopiedArray = currentCanvas.selectedObjectArray;
    });
    $('#createDataSinkButton').click(function() {
      currentCanvas.newDataSink(location, generate_data_sink_attr());
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
