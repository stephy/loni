(function() {
  $(function() {
    var attr, c, coordAfterBoundary, createNewCopy, generate_data_sink_attr, generate_data_source_attr, generate_module_attr, getBox, getCoord, items, location, newCoord, oldCoord, pasteSelected, rectLocation, startDraw, tempCopiedArray, tempRect;
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
        objectType: 'dataSource',
        package: data_source_package,
        version: data_source_pkg_version,
        tags: data_source_tags,
        description: data_source_description
      };
      $('input.data-source_input').val('');
      $('textarea.data_source_input').val('');
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
      $('input.module_input').val('');
      $('textarea.module_input').val('');
      return module_attr;
    };
    window.getObjectDataName = function() {
      var objData;
      objData = currentCanvas.selectedObjectArray;
      return objData[0].attr.name;
    };
    pasteSelected = function(objArray) {
      var a, b, i, map, _ref, _ref2, _results;
      console.log("PASTING!!!");
      map = new Object();
      for (i = 0, _ref = objArray.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        if (objArray[i].objs[0] !== void 0) {
          objArray[i].objs[0].isBeingSelected = 1;
        }
      }
      _results = [];
      for (i = 0, _ref2 = objArray.length - 1; 0 <= _ref2 ? i <= _ref2 : i >= _ref2; 0 <= _ref2 ? i++ : i--) {
        _results.push((objArray[i].modID === 0) || (objArray[i].objs[0].connectedObject === void 0) || (objArray[i].objs[0].connectedObject.isBeingSelected === 0) ? (console.log("GO IF"), console.log(objArray[i]), createNewCopy(objArray[i])) : map[objArray[i].objs[0].connectedObject] === void 0 ? (console.log("GO ELSE 1"), map[objArray[i].objs[0]] = objArray[i]) : (console.log("GO ELSE 2"), a = createNewCopy(map[objArray[i].objs[0].connectedObject]), b = createNewCopy(objArray[i]), map = new Object(), currentCanvas.savePathForCopy(a.objs[0], b.objs[0])));
      }
      return _results;
    };
    createNewCopy = function(obj) {
      var a, theCoord;
      if (obj.c.getBBox().x !== void 0) {
        theCoord = {
          x: obj.c.getBBox().x,
          y: obj.c.getBBox().y
        };
      } else {
        console.log("beta");
        console.log(obj.coord);
        theCoord = obj.coord;
      }
      if (obj.modID === 0) {
        a = currentCanvas.newModule(theCoord, attr);
      } else if (obj.modID === 1) {
        a = currentCanvas.newDataSink(theCoord, attr);
      } else {
        a = currentCanvas.newDataSource(theCoord, attr);
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
    $('.edit_module').click(function() {
      console.log("clicked");
      if (currentCanvas.selectedObjectArray[0].attr.objectType === 'module') {
        $('#popup-module').css("display", "block");
        $('input#module_name').val(getObjectDataName());
      }
      if (currentCanvas.selectedObjectArray[0].attr.objectType === 'dataSink') {
        $('#popup-data-sink').css("display", "block");
      }
      if (currentCanvas.selectedObjectArray[0].attr.objectType === 'dataSource') {
        return $('#popup-data-source').css("display", "block");
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
      currentCanvas.newModule(location, generate_module_attr());
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
      console.log(tempCopiedArray);
      newCoord = {
        x: e.pageX,
        y: e.pageY
      };
      if (tempCopiedArray.length > 0) {
        pasteSelected(tempCopiedArray);
      }
      return console.log(currentCanvas.holder);
    });
    $('.copy').click(function(e) {
      oldCoord = {
        x: e.pageX,
        y: e.pageY
      };
      console.log(e.pageX);
      tempCopiedArray = currentCanvas.selectedObjectArray;
      return console.log(tempCopiedArray);
    });
    $('.cut').click(function(e) {
      var i, _ref;
      oldCoord = {
        x: e.pageX,
        y: e.pageY
      };
      tempCopiedArray = currentCanvas.selectedObjectArray;
      console.log("here");
      for (i = 0, _ref = tempCopiedArray.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        tempCopiedArray[i].coord = {
          x: tempCopiedArray[i].c.getBBox().x,
          y: tempCopiedArray[i].c.getBBox().y
        };
        if (tempCopiedArray[i].moduleGlow !== "") {
          tempCopiedArray[i].removeAll();
        }
        currentCanvas.holder[$.inArray(tempCopiedArray[i], currentCanvas.holder)].deleteObject();
        currentCanvas.holder.splice($.inArray(tempCopiedArray[i], currentCanvas.holder), 1);
      }
      console.log(currentCanvas.holder);
      return console.log(tempCopiedArray);
    });
    $('.delete').click(function(e) {
      var i, _ref;
      tempCopiedArray = currentCanvas.selectedObjectArray;
      for (i = 0, _ref = tempCopiedArray.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        if (tempCopiedArray[i].moduleGlow !== "") {
          tempCopiedArray[i].removeAll();
        }
        tempCopiedArray[i].deleteObject();
        currentCanvas.holder.splice($.inArray(tempCopiedArray[i], currentCanvas.holder), 1);
      }
      tempCopiedArray = [];
      return console.log(currentCanvas.holder);
    });
    $('.select_all').click(function() {
      return currentCanvas.setAllSelectedGlow();
    });
    window.canvasHash = {
      'canvas-1': new canvasDisplay($('#canvas-1'))
    };
    window.currentCanvas = canvasHash['canvas-1'];
    $('svg:last').attr('id', 'svg-canvas-1');
    console.log(attr);
    currentCanvas.newDataSink({
      x: 100,
      y: 200
    }, attr);
    console.log(attr);
    currentCanvas.newModule({
      x: 450,
      y: 250
    }, attr);
    currentCanvas.newDataSource({
      x: 400,
      y: 250
    }, attr);
    return c = currentCanvas.newDataSink({
      x: 300,
      y: 200
    }, attr);
  });
}).call(this);
