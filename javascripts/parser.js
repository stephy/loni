function parseXml(xml)
{
	canvas = new canvasDisplay($('#canvas-1'));
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
    $("#output").append($(this).attr("name") + " , package:"+ modulePackage + ", version:" + moduleVersion + "<br />");	
	
	$("#EL1").append(moduleDescription + "<br />");
	//Create Module to Canvas
	canvas.newModule({
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

	//Create DataSink/Source
	if(dataModuleSource == "true"){
		canvas.newDataSource({
      		x: dataModulePosX,
      		y: dataModulePosY
    	}, {id: dataModuleId, name: dataModuleName, package: dataModulePackage, version: dataModuleVersion});
	}
	else{
		canvas.newDataSink({
      		x: dataModulePosX,
      		y: dataModulePosY
    	}, {id: dataModuleId, name: dataModuleName, package: dataModulePackage, version: dataModuleVersion});
		
	}

  });
}

function parseAuthors(xml)
{
	
	
}

$(document).ready(function()
{
  $.ajax({
    type: "GET",
    //url: "javascripts/test.xml",
    url: "javascripts/testloni2.pipe",
	dataType: "xml",
    success: parseXml
  });
});
