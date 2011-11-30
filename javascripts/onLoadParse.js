(function() {
  	function parseXml(xml)
	{
		//canvas = new canvasDisplay($('#canvas-1'));
	  //find every MODULE GROUP and print the Name and Decription
	  //Assign variables to attributes and elements
	  /*$(xml).find("moduleGroup").each(function()
	  {
		//<module> Attributes ---------------------------------------------
		var moduleGroupId = $(this).attr("id");
		var moduleGroupName = $(this).attr("name");
		var moduleGroupPackage = $(this).attr("package");
		var moduleGroupVersion = $(this).attr("version");
		var moduleGroupDescription = $(this).attr("description");
		var moduleGroupIcon = $(this).attr("icon");
		var moduleGroupPosX = $(this).attr("posX");
		var moduleGroupPosY = $(this).attr("posY");
		var moduleRotation = $(this).attr("rotation");
		var moduleGroupNeedsProvenance = $(this).attr("needsProvenance");
		// end of <module> Attributes --------------------------------------
		$("#EL2").append("Module Group, " + $moduleGroupName + " , description:"+ $moduleGroupDescription + "<br />");	

	   });*/


	  //find every MODULE and print the Name and Description
	  //Assign variables to attributes and elements
	  $(xml).find("module").each(function()
	  {
		//<module> Attributes ---------------------------------------------
		var moduleId = $(this).attr("id");
		var moduleName = $(this).attr("name");
		var modulePackage = $(this).attr("package");
		var moduleVersion = $(this).attr("version");
		var moduleExecutableVersion = $(this).attr("executableVersion");
		var moduleDescription = $(this).attr("description");
		var modulePosX = $(this).attr("posX");
		var modulePosY = $(this).attr("posY");
		var moduleRotation = $(this).attr("rotation");
		var moduleIcon = $(this).attr("icon");
		var moduleAdvancedOptions = $(this).attr("advancedOptions");
		var moduleSmartModule = $(this).attr("smartModule");
		var moduleIsIDAModule = $(this).attr("isIDAModule");
		var moduleIsRepeatUntil = $(this).attr("isRepeatUntil");
		var moduleSourceCode = $(this).attr("sourceCode");
		var moduleRequireNetAccess = $(this).attr("requireNetAccess");
		var moduleMPIEnabled = $(this).attr("MPIEnabled");
		var moduleMPIParallelEnv = $(this).attr("MPIParallelEnv");
		var moduleMPINumSlots = $(this).attr("MPINumSlots");
		var modulePreserveInputFilename = $(this).attr("preserveInputFilename");
		// end of <module> Attributes --------------------------------------

		$(this).find("authors").each(function(){
			//$("#author").append($(this).attr("fullName") + "<br />");
		});

		//$("#output").append($(this).attr("name") + " , description:"+ $(this).attr("description")+ "<br />");	
	    //$("#output").append($(this).attr("name") + " , package:"+ modulePackage + ", version:" + moduleVersion + "<br />");	

		$("#EL1").append(moduleDescription + "<br />");
		//Create Module to Canvas
		currentCanvas.newModule({
	      x: modulePosX,
	      y: modulePosY
	    }, {id: moduleId, name: moduleName, package: modulePackage, version: moduleVersion});


	  });
	$(xml).find("dataModule").each(function()
	  {
		//<dataModule> Attributes ---------------------------------------------
		var dataModuleId = $(this).attr("id");
		var dataModuleName = $(this).attr("name");
		var dataModulePackage = $(this).attr("package");
		var dataModuleVersion = $(this).attr("version");
		var dataModuleDescription = $(this).attr("description");
		var dataModulePosX = $(this).attr("posX");
		var dataModulePosY = $(this).attr("posY");
		var dataModuleRotation = $(this).attr("rotation");
		var dataModuleType = $(this).attr("type");
		var dataModuleSource = $(this).attr("source");
		var dataModuleDirSource = $(this).attr("dirSource");
		var dataModuleDirDump = $(this).attr("dirDump");
		var dataModuleUseDirSourceFilters = $(this).attr("useDirSourceFilters");
		var dataModuleDirSourceFilterType = $(this).attr("dirSourceFilterType");
		var dataModuleRecursive= $(this).attr("recursive");
		// end of <dataModule> Attributes --------------------------------------
		
		//Explicitly casting dataModulePosX and dataModulePosY to integer
		dataModulePosX = dataModulePosX*1;
		dataModulePosY = dataModulePosY*1;
		
		//Create DataSink/Source
		if(dataModuleSource == "true"){
			currentCanvas.newDataSource({
	      		x: dataModulePosX,
	      		y: dataModulePosY
	    	}, {id: dataModuleId, name: dataModuleName, package: dataModulePackage, version: dataModuleVersion});
		}
		else{
			currentCanvas.newDataSink({
	      		x: dataModulePosX,
	      		y: dataModulePosY
	    	}, {id: dataModuleId, name: dataModuleName, package: dataModulePackage, version: dataModuleVersion});
		}

	  });
	//MIGHT NEED "CONNECTION OBJECT" TO KEEP TRACK OF EACH CONNECTIONS
	//Parse Connections-----------------
	var source, sink, sourceObj, sinkObj, tempObj,i;
	var canvasHolder = currentCanvas.holder;
	var parseSource = [];
	var parseSink =[];
	var exitFlag = 0;
	var holderLen = canvasHolder.length;
	
	$(xml).find("connections").each(function(){
		$(xml).find("connection").each(function(){
			source = $(this).attr("source");
			sink = $(this).attr("sink");
			parseSource = source.split(/\./);
			parseSink = sink.split(/\./);
			
			i=0;
			//Iterate through Canvas holder array, find object with id source and sink
			while ((i < holderLen) && (exitFlag < 2)){
				tempObj = canvasHolder[i];
				if(tempObj.attr.id == parseSource[0])
				{
					sourceObj = tempObj;
					exitFlag ++;
				}
				else if(tempObj.attr.id == parseSink[0]){
					sinkObj = tempObj;
					exitFlag ++;
				}
				i++;
			}
			//Connecting Source-Sink
			currentCanvas.savePathForCopy(sourceObj.objs[0],sinkObj.objs[0]);
			
		});
	});
	//END OF CONNECTION----------------------------------------------------------------
	
	}
  $(function() {
    var attr, c, coordAfterBoundary, createNewCopy, generate_data_sink_attr, getBox, getCoord, items, location, newCoord, oldCoord, pasteSelected, rectLocation, startDraw, tempCopiedArray, tempRect;
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
    $('#copy').click(function(e) {
      oldCoord = {
        x: e.pageX,
        y: e.pageY
      };
      console.log(e.pageX);
      tempCopiedArray = currentCanvas.selectedObjectArray;
      return console.log(tempCopiedArray);
    });
    $('#cut').click(function(e) {
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
    $('#delete').click(function(e) {
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
    $('#mselect_all').click(function() {
      return currentCanvas.setAllSelectedGlow();
    });
    window.canvasHash = {
      'canvas-1': new canvasDisplay($('#canvas-1'))
    };
    window.currentCanvas = canvasHash['canvas-1'];
    $('svg:last').attr('id', 'svg-canvas-1');
    var filename = $.cookie("lonifilename");
	filename = "upload/" + filename;
	console.log("Filename: " + filename);
	//PARSING-------------------------------
	$.ajax({
	    type: "GET",
	    //url: "upload/testloni2.pipe",
	    url: filename,
		dataType: "xml",
	    success: parseXml
	  });
  });
}).call(this);
