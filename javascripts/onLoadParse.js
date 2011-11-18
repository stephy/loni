

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
	}
	
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
	var filename = $.cookie("lonifilename");
	filename = "upload/" + filename;
	console.log("Filename: " + filename);
	//PARSING-------------------------------
	$.ajax({
	    type: "GET",
	    //url: "javascripts/test.xml",
	    url: filename,
		dataType: "xml",
	    success: parseXml
	  });
	//--------------------------------------------
    /*currentCanvas.newDataSink({
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
    }, attr);*/
  });
}).call(this);
