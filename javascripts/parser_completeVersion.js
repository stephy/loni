/*THIS IS THE FULL-VERSION OF THE PARSER
The current one in onLoadParse.js is not the complete version for simplicity sake on Demo
since not all fields are implemented yet.

If want to use the full version, delete the whole parseXML-parseSomething functions
Copy the whole code from this file, and put it right below function(){ -- 2nd line of onLoadParse file.

Notice that onLoad.js will be modified from time-to-time, and every update means you have to make new onLoadParse.js
using the new onLoad.js

When making new onLoadParse.js from an updated onLoad.js, all you need to do is copy everything from this file, 
put right below the very first function(){ inside the bracket.
Then all the way to the end after this code: 
	window.currentCanvas = canvasHash['canvas-1'];
	$('svg:last').attr('id', 'svg-canvas-1');
Copy down this code:
	//Grab cookie for filename
	var filename = $.cookie("lonifilename");
	filename = "upload/" + filename;
	//PARSING-------------------------------
	$.ajax({
    	type: "GET",
    	url: filename,
		dataType: "xml",
    	success: parseXml
  	});

Another thing is everytime newWorkflow.html is updated, new updateWorkflow.html must be made.
The only thing you need to do is duplicate newWorkflow.html, rename as updateWorkflow.html, 
then change:
	<script src="javascripts/onLoad.js" type="text/javascript"></script>
to:
	<script src="javascripts/onLoadParse.js" type="text/javascript"></script>

*/

function parseXml(xml)
{

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
	//moduleGroup Elements--------------------------------------------
	//Not implemented yet
   });*/
	
	
  //find every MODULE and print the Name and Description
  //Assign variables to attributes and elements
  //ALMOST DONE EXCEPT PARAMETERS + PUTTING EVERYTHING INTO MODULE
  var moduleCitations = [];
  var moduleTag = [];
  var moduleMetadataActions= [];
  var attr = {};
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
	
	//Parse Executable Authors
	var moduleExecutableAuthors = parseAuthors(this, "executableAuthors");
	
	//Testing Authors
	/*for ( var i in moduleExecutableAuthors){
		$("#author").append( moduleExecutableAuthors[i]['fullName']  + "<br />");
	}
	*/
    //$("#output").append($(this).attr("name") + " , package:"+ modulePackage + ", version:" + moduleVersion + "<br />");

	//Parse Citations
	moduleCitations = parseCitations(this);
	//Parse executableProvenance
	var moduleExecutableProvenance = parseExecutableProvenance(this);
	//Parse Input parameter
	var moduleInput = parseParameter(this, input);
	//Parse Metadata
	var moduleMetadata = parseMetadata(this);
	//Parse Output parameter
	var moduleOutput = parseParameter(this, output);
	//Parse Tag
	var moduleTags = parseTag(this);
	//Parse uri
	var moduleUri = $(this).find("uri").text();
	//Parse license
	var moduleLicense = $(this).find("license").text();
	//Parse "metadataActions" 
	moduleMetadataActions = parseMetadataActions(this);

	//Testing on normal html
	//$("#EL1").append(moduleDescription + "<br />");
	
	//NOTE: Not all attributes and elements are passed yet, since the form is not complete
	//To pass just add attribute: value
	//E.g.: executableAuthors: moduleExecutableAuthors,
	attr = {
		id: moduleId, 
		name: moduleName, 
		package: modulePackage, 
		version: moduleVersion,
		executableVersion: moduleExecutableVersion,
		description: moduleDescription,
		rotation: moduleRotation, 
		icon: moduleIcon, 
		advancedOptions: moduleAdvancedOptions,
		smartModule: moduleSmartModule, 
		isIDAModule: moduleIsIDAModule, 
		isRepeatUntil: moduleIsRepeatUntil, 
		sourceCode: moduleSourceCode, 
		requireNetAccess: moduleRequireNetAccess, 
		MPIEnabled: moduleMPIEnabled, 
		MPIParallelEnv: moduleMPIParallelEnv,
		MPINumSlots: moduleMPINumSlots, 
		preserveInputFilename: modulePreserveInputFilename,
		citations: moduleCitations, 
		executableProvenance: moduleExecutableProvenance,
		input: moduleInput, 
		metadata: moduleMetadata, 
		output: moduleOutput, 
		tags: moduleTags, 
		uri: moduleUri, 
		license: moduleLicense, 
		metadataActions: moduleMetadataActions
	}
	
	//Uncomment this when combined with onLoadParse.js
	//Create Module to Canvas
	/*currentCanvas.newModule({
      x: modulePosX,
      y: modulePosY
    }, attr);
	*/	
	
  });
  var dataModuleCitations = [];
  var dataModuleFileTypes = [];
  var dataModuleValues = [];

//ALMOST DONE EXCEPT PARAMETERS AND DIRSOURCEFILTERS  + Putting everything in datamodule object
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
	
	var dataModuleExecutableAuthors = parseAuthors(this, "executableAuthors");
	
	//Parse Citations
	dataModuleCitations = parseCitations(this);
	//Parse DirSourceFilters
	//Parse Filetypes
	dataModuleFileTypes = parseFileTypes(this);
	//Parse Metadata
	var dataModuleMetadata = parseMetadata(this);
	//Parse Tag
	var dataModuleTags = parseTag(this);
	//Parse uri
	var dataModuleUri = $(this).find("uri").text();
	//parseValues
	dataModuleValues = parseValues(this);
	//Parse Input parameter
	var dataModuleInput = parseParameter(this, input);
	//Parse Output parameter
	var dataModuleOutput = parseParameter(this, output);

	attr = {
		id: moduleId, 
		name: moduleName, 
		package: dataModulePackage, 
		version: dataModuleVersion,
		description: dataModuleDescription
		executableAuthos: dataModuleExecutableAuthors,
		rotation: dataModuleRotation,
		type: dataModuleType, 
		icon: dataModuleIcon, 
		source: dataModuleSource, 
		dirSource: dataModuleDirSource,
		dirDump: dataModuleDirDump,
		//useDirSourceFilters: dataModuleUseDirSourceFilters,
		dirSourceFilterType: dataModuleDirSourceFilterType,
		fileTypes: dataModuleFileTypes,
		recursive: dataModuleRecursive,
		citations: dataModuleCitations, 
		metadata: dataModuleMetadata,
		input: dataModuleInput,  
		output: dataModuleOutput, 
		tags: dataModuleTags, 
		uri: dataModuleUri, 
		values: dataModuleValues
	}
	
	//Uncomment when copied to onLoadParse.js
	/*
	//Create DataSink/Source
	if(dataModuleSource == "true"){
		currentCanvas.newDataSource({
      		x: dataModulePosX,
      		y: dataModulePosY
    	}, attr);
	}
	else{
		currentCanvas.newDataSink({
      		x: dataModulePosX,
      		y: dataModulePosY
    	}, attr);
		
	}*/
	
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
		//Uncomment when copying to onLoadParse,js
		//Connecting Source-Sink
		//currentCanvas.savePathForCopy(sourceObj.objs[0],sinkObj.objs[0]);
		
	});
});
//END OF CONNECTION----------------------------------------------------------------
}

//Parsing Authors tag
//Type can be "authors" or "executableAuthors"---------------------------------
function parseAuthors(xml, type)
{
	var authorFullName, authorEmail, authorWebsite;
	var authors = [];
	var author = {};
	$(xml).find(type).each(function(){
		$(xml).find("author").each(function(){	
			authorFullName = $(this).attr("fullName");
			authorEmail = $(this).attr("email");
			authorWebsite = $(this).attr("website");
			//$("#author").append(  + "<br />");
			author = {fullName : authorFullName, email: authorEmail, website: authorWebsite};
			authors.push(author);
		});
	});
	//return array of (hash of) authors	
	return authors;
}
//Parse Citations----------------
function parseCitations(xml){
	var citations = [];
	var citation;
	$(xml).find("citations").each(function(){
		citation = $(this).find("citation").text();
		citations.push(citation);
	});
	return citations;
}
//Parse Metadata
function parseMetadata(xml){
	var metadata = {};
	$(xml).find("metadata").each(function(){
		metadata ={data: $(this).find("data").text()};
	});
	return metadata;
}
//Parse MetadataActions
function parseMetadataActions(xml){
	var metadataActions = {};
	var metadataAction;
	$(xml).find("metadataActions").each(function(){
		$(xml).find("metadataActions").each(function(){
			metadataAction ={name: $(this).find("name").text(), value: $(this).find("value").text(), location:$(this).attr("location"), action: $(this).attr("action")};
			metadataActions.push(metadataAction);
		});
	});
	return metadataActions;
}
//Parse Tag
function parseTag(xml){
	var tags = [];
	var tag;
	$(xml).find("tag").each(function(){
		tag = $(this).find("tag").text();
		tags.push(tag);
	});
	return tags;
}
//Parse Executable Provenance
function parseExecutableProvenance(xml){
	var executableProv, binary = {};
	var comment; //NOTE: Either one is fine!
	$(xml).find("executableProvenance").each(function(){
		//Parse comment
		comment =  $(this).find("comment").text();
		if(comment != null){
			executableProv = {comment: comment};
		}
		else{
			//Parse binary
			binary = parseBinary(this);
			executableProv = {binary: binary};
		}
	});
	return executeableProv;
}

//Parse Binary (Including Parse Library and System Config?)
function parseBinary(xml){
	var binary;
	var binaryName, binaryDescription, binaryVersion, binaryPackage, binaryUri, binaryCompilationTime;
	var binarySysConfig = {};
	var binaryLibrary = {};
	$(xml).find("binary").each(function(){
		//Binary Attributes
		binaryName = $(this).attr("name");
		binaryDescription = $(this).attr("description");
		binaryVersion = $(this).attr("version");
		binaryPackage = $(this).attr("package");
		binaryUri = $(this).attr("uri");
		binaryCompilationTime = $(this).attr("compilationTime");
		
		//Binary Elements
		//Parse SystemConfig
		binarySysConfig = parseSystemConfig(this);
		//ParseLibrary
		binaryLibrary = parseLibrary(this);
		//Set Attributes + Elements
		binary = {name: binaryName, description: binaryDescription, version: binaryVersion, package: binaryPackage};
		binary = {uri: binaryUri, compilationTime: binaryCompilationTime};
	});
	return binary;
}
//Parse Library
function parseLibrary(xml){
	var library;
	var libraryName, libraryVersion, libraryPackage, libraryUri, libraryCompilationTime;
	var librarySysConfig = {};
	$(xml).find("library").each(function(){
		//Library Attributes
		libraryName = $(this).attr("name");
		libraryVersion = $(this).attr("version");
		libraryPackage = $(this).attr("package");
		libraryUri = $(this).attr("uri");
		libraryCompilationTime = $(this).attr("compilationTime");
		
		//Library Elements
		//Parse SystemConfig
		librarySysConfig = parseSystemConfig(this);
	
		//Set Attributes + Elements
		library = {name: libraryName, version: libraryVersion, package: libraryPackage};
		library = {uri: libraryUri, compilationTime: libraryCompilationTime};
	});
	return library;
}
//Parse sysConfig
function parseSystemConfig(xml){
	var systemConfig = {};
	var architecture = {};
	var name;
	var OS = {};
	var compiler = {};
	$(xml).find("systemConfig").each(function(){
		$(xml).find("architecture").each(function(){
			name = $(this).attr("name");
			architecture = {name:name, vendor:$(this).attr("vendor"), model: $(this).attr("model"), processorFlags:$(this).attr("processorFlags") };
		});
		$(xml).find("OS").each(function(){
			name = $(this).attr("name");
			OS = {name:name, version:$(this).attr("version"), distribution: $(this).attr("distribution"), kernelName:$(this).attr("kernelName"), kernelVersion:$(this).attr("kernelVersion") };
		});
		$(xml).find("compiler").each(function(){
			name = $(this).attr("name");
			OS = {name:name, version:$(this).attr("version"), flags: $(this).attr("flags"), update:$(this).attr("update")};
		});
		systemConfig = {architecture: architecture, OS: OS, compiler: compiler};
	});
	return systemConfig;
}


//----------------------------------------------------------------------------
//Parsing Parameters tag------------------------------------------------------
//NOTE: JUST NEED TO PUT ALL PARAMETERS ATTRIBUTES + ELEMENTS ON TAG AND PUSH IT TO ARRAY OF PARAMETERS
//ALL PARSING IS DONE
//Type can be "input" or "output"
function parseParameter(xml, type){
	var parameters = [];
	var parameter = {};
	var parameterId, parametereName, parameterDescription,parameterEnabled,parameterRequired;
	var parameterPredefined,parameterIsMetaData,parameterIsListFile,parameterIsHideData;
	var parameterIncludeTransformedParameter,parameterOrder,parameterPrefix,parameterPrefixSpaced,parameterPrefixAllArgs;
	var parameterValues = [];
	var parameterMetadataElements=[];
	var parameterTransform=[];
	var parameterStringExtract= {};
	var parameterFormat= {};
	var parameterFileTypes = [];
	var parameterDependencies= {};	
	
	$(xml).find(type).each(function(){
		//<parameter> Attributes *********
		parameterId = $(this).attr("id");
		parametereName = $(this).attr("name");
		parameterDescription = $(this).attr("description");
		parameterEnabled = $(this).attr("enabled");
		parameterRequired = $(this).attr("required");
		parameterPredefined = $(this).attr("predefined");
		parameterIsMetaData = $(this).attr("isMetaData");
		parameterIsListFile = $(this).attr("isListFile");
		parameterIsHideData = $(this).attr("isHideData");
		parameterIncludeTransformedParameter = $(this).attr("includeTransformedParameter");
		parameterOrder = $(this).attr("order");
		parameterPrefix = $(this).attr("prefix");
		parameterPrefixSpaced = $(this).attr("prefixSpaced");
		parameterPrefixAllArgs = $(this).attr("prefixAllArgs");
		
		//<parameter> Elements----------------
		//parseFormat
		parameterFormat = parseFormat(this);
		//parseFileTypes
		parameterFileTypes = parseFileTypes(this);
		//parseTrasnform
		parameterTransform = parseTransform(this);
		//parseMetaDataElement
		parameterMetadataElements = parseMetadataElement(this);
		//parseDependencies
		parameterDependencies = parseDependencies(this);
		//parseValues
		parameterValues = parseValues(this);
		//parseStringExtract
		parameterStringExtract = parseStringExtract(this);
		
		//add these attributes to parameter
		parameter = {
			id: parameterId,
			name: parameterName,
			description: parameterDescription, 
			enabled: parameterEnabled, 
			required: parameterRequired
			predefined: parameterPredefined, 
			isMetaData: parameterIsMetaData, 
			isListFile: parameterIsListFile,
			isHideDate: parameterIsHideDate,
			includeTransformedParameter: parameterIncludeTransformedParameter
			order: parameterOrder,
			prefix: parameterPrefix,
			prefixSpaced: parameterPrefixSpaced,
			prefixAllArgs: parameterPrefixAllArgs
			format: parameterFormat,
			fileTypes: parameterFileTypes,
			transform: parameterTransform,
			metadataElements: parameterMetadataElements,
			dependencies: parameterDependencies,
			values: parameterValues,
			stringExtract: parameterStringExtract
		};
		
		//push parameter to array of parameters 
		parameters.push(parameter);
	});
	return parameters;
}
//Parse Dependencies----------------
function parseDependencies(xml){
	var dependencies = {};
	var formatDependsOn, formatDependent; //NOTE: Either one is fine!
	$(xml).find("dependencies").each(function(){
		formatDependsOn =  $(this).find("dependsOn").text();
		formatDependent =  $(this).find("dependent").text();
		/* If want to check the choices during parsing, uncomment this!
		if(formatDependsOn != null){
			dependencies = {dependsOn : formatDependsOn};
		}
		else{
			formatDependent =  $(this).attr("dependent");
			if(formatDependent != null){
				dependencies = {dependent : formatDependent};
			}
		}*/
		//If want both and check which one has null values later, use this
		dependencies = {dependsOn : formatDependsOn, dependent : formatDependent};
	});
	return dependencies;
}
//Parse Format----------------
function parseFormat(xml){
	var format = {};
	$(xml).find("format").each(function(){
		stringExtract = {type: $(this).attr("type"),cardinality: $(this).attr("cardinality"),cardinalityBase: $(this).attr("cardinalityBase"), transformationBase: $(this).attr("transformationBase")};
	});
	return format;
}
//Parse StringExtract----------------
function parseStringExtract(xml){
	var stringExtract = {};
	$(xml).find("stringExtract").each(function(){
		stringExtract = {source: $(this).attr("source"),rule: $(this).attr("rule"),startString: $(this).attr("startString"), endString: $(this).attr("endString")};
		stringExtract = {caseSensitive: $(this).attr("caseSensitive"), delimiter:$(this).attr("delimiter"),row: $(this).attr("row"), col: $(this).attr("col")};
	});
	return stringExtract;
}
//Parse Transform----------------
function parseTransform(xml){
	var transforms = [];
	var transform = {};
	$(xml).find("transform").each(function(){
		transform ={order: $(this).attr("order"), operation:$(this).attr("operation")};
		transforms.push(transform);
	});
	return transforms;
}
//Parse MetadataElement----------------
function parseMetadataElement(xml){
	var metadataElmts = [];
	var metadataElmt = {};
	$(xml).find("metdataElement").each(function(){
		metadataElmt ={location: $(this).attr("location"), prefix:$(this).attr("prefix"), spaceAfterPrefix: $(this).attr("spaceAfterPrefix")};
		metadataElmts.push(metadataElmt);
	});
	return metadataElmts;
}
//NOTE: STILL CONFUSED WHETEHER THERE's ARRAY of VALUES or just ARRAY of VALUE, same goes with FILETYPES
//Parse Values------------------------
function parseValues(xml){
	var values = []; var metadata;
	$(xml).find("values").each(function(){
		$(xml).find("value").each(function(){
			//metadata --> optional
			metadata = $(this).attr("metadata");
			if(metadata != null){
				values.push(metadata);
			}
		});
	});
	return values;
}
//Parse FileTypes------------------------
function parseFileTypes(xml){
	var fileTypes = []; var filetype ={};
	$(xml).find("fileTypes").each(function(){
		$(xml).find("fileType").each(function(){
			fileType = {need: $(this).find("need").text(), name: $(this).attr("name"), extension: $(this).attr("extension"), description: $(this).attr("description")};
			fileTypes.push(fileType);
		});
	});
	return fileTypes;
}
$(document).ready(function()
{
  $.ajax({
    type: "GET",
    //url: "javascripts/test.xml",
    url: "javascripts/testloni4.pipe",
	dataType: "xml",
    success: parseXml
  });
});
