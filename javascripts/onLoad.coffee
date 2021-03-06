$ ->
	items = []
	location = ""
	rectLocation = ""
	startDraw = false
	tempRect = ""
	tempCopiedArray = []
	# Testing:
	attr = {name: "Song!"}

	clearDataSinkInputs = ->
 		$('input.data_sink_input').val('')
 		$('textarea.data_sink_input').val('')

 	clearDataSourceInputs = ->
	 	$('input.data_source_input').val('')
	 	$('textarea.data_source_input').val('')

	clearModuleInputs = ->
		$('input.module_input').val('')
		$('textarea.module_input').val('')
		$("#parameters-table").find("tr:gt(0)").remove();
		cleanIdx();

	#data sink form data
	generate_data_source_attr = ->
		data_source_name = $('input#data-source_name').val()
		data_source_package = $('input#data-source_package').val()
		data_source_pkg_version = $('input#data-source_pkg_version').val()
		data_source_tags = $('input#data_source_tags').val()
		data_source_description = $('textarea#data_source_description').val()
		data_source_attr = {
		  name: data_source_name,
		  package: data_source_package,
		  version: data_source_pkg_version,
		  tags: data_source_tags,
		  description: data_source_description
		}
		clearDataSourceInputs()
		return data_source_attr

	generate_data_sink_attr = ->
	  data_sink_name = $('input#data-sink_name').val()
	  data_sink_package = $('input#data-sink_package').val()
	  data_sink_pkg_version = $('input#data-sink_pkg_version').val()
	  data_sink_tags = $('input#data_sink_tags').val()
	  data_sink_description = $('textarea#data_sink_description').val()
	  data_sink_attr = {
		  name: data_sink_name,
		  package: data_sink_package,
		  version: data_sink_pkg_version,
		  tags: data_sink_tags,
		  description: data_sink_description
	  }
	  clearDataSinkInputs()
	  return data_sink_attr

  	

	generate_module_attr = ->
    #info
    module_name = $('input#module_name').val()
    module_package = $('input#module_package').val()
    module_pkg_version = $('input#module_pkg_version').val()
    module_exec_version = $('input#module_exec_version').val()
    module_tags = $('input#module_tags').val()
    module_description = $('textarea#module_description').val()
    #parameters 
    parameter_name = $('input#m_parameter_name1').val()

    module_attr = {
  	  name: module_name,
  	  package: module_package,
  	  version: module_pkg_version,
  	  executableVersion: module_exec_version,
  	  tags: module_tags,
  	  description: module_description,
  	  parameterName: parameter_name
    }
    clearModuleInputs()
    return module_attr
    
	save_module_attr = ->
		module_data = generate_module_attr()
		currentCanvas.selectedObjectArray[0].attr = module_data
 	
	getModuleAttr = ->
		obj = currentCanvas.selectedObjectArray[0].attr
		$('input#module_name').val(obj.name)
		$('input#module_package').val(obj.package)
		$('input#module_pkg_version').val(obj.version)
		$('input#module_exec_version').val(obj.executableVersion)
		$('input#module_tags').val(obj.tags)
		$('textarea#module_description').val(obj.description)

	getDataSinkAttr = ->
		obj = currentCanvas.selectedObjectArray[0].attr 
		$('input#data-sink_name').val(obj.name)
		$('input#data-sink_package').val(obj.package)
		$('input#data-sink_pkg_version').val(obj.version)
		$('input#data_sink_tags').val(obj.tags)
		$('textarea#data_sink_description').val(obj.description)

	getDataSourceAttr = ->
		obj = currentCanvas.selectedObjectArray[0].attr
		$('input#data-source_name').val(obj.name)
		$('input#data-source_package').val(obj.package)
		$('input#data-source_pkg_version').val(obj.version)
		$('input#data_source_tags').val(obj.tags)
		$('textarea#data_source_description').val(obj.description)	

	saveDataSinkAttr = ->
		obj = currentCanvas.selectedObjectArray[0].attr
		obj.name = $('input#data-sink_name').val()
		obj.package = $('input#data-sink_package').val()
		obj.version = $('input#data-sink_pkg_version').val()
		obj.tags = $('input#data_sink_tags').val()
		obj.description = $('textarea#data_sink_description').val()

	saveDataSourceAttr = ->
		obj = currentCanvas.selectedObjectArray[0].attr
		obj.name = $('input#data-source_name').val()
		obj.package = $('input#data-source_package').val()
		obj.version = $('input#data-source_pkg_version').val()
		obj.tags = $('input#data_source_tags').val()
		obj.description = $('textarea#data_source_description').val()

	saveModuleAttr = ->
		obj = currentCanvas.selectedObjectArray[0].attr
		obj.name = $('input#module_name').val()
		obj.package = $('input#module_package').val()
		obj.version = $('input#module_pkg_version').val()
		obj.executableVersion= $('input#module_exec_version').val()
		obj.tags = $('input#module_tags').val()
		obj.description = $('textarea#module_description').val()


	pasteSelected = (objArray) ->
		console.log "PASTING!!!"
		map = new Object()
		for i in [0..objArray.length-1]		
			if objArray[i].objs[0] != undefined
				objArray[i].objs[0].isBeingSelected = 1
		for i in [0..objArray.length-1]		
			if (objArray[i].modID is 0) or (objArray[i].objs[0].connectedObject is undefined) or (objArray[i].objs[0].connectedObject.isBeingSelected is 0)
				console.log "GO IF"
				console.log objArray[i]
				createNewCopy(objArray[i])
			else 
				if map[objArray[i].objs[0].connectedObject] is undefined
					console.log "GO ELSE 1"
					map[objArray[i].objs[0]] = objArray[i]
				else
					console.log "GO ELSE 2"
					a = createNewCopy(map[objArray[i].objs[0].connectedObject])
					b = createNewCopy(objArray[i])
					map = new Object()
					#currentCanvas.paths.push(currentCanvas.paper.connection2(a.objs[0].c, b.objs[0].c, "#000"))
					currentCanvas.savePathForCopy(a.objs[0],b.objs[0])



	createNewCopy = (obj) ->
		if obj.c.getBBox().x != undefined
			theCoord = {x:obj.c.getBBox().x, y:obj.c.getBBox().y}
		else
			console.log "beta"
			console.log obj.coord
			theCoord = obj.coord
		if obj.modID is 0
			a = currentCanvas.newModule(theCoord, obj.attr)		

		else if obj.modID is 1
			a = currentCanvas.newDataSink(theCoord, obj.attr)
		else 
			a =currentCanvas.newDataSource(theCoord, obj.attr)
		a.ztranslate(newCoord.x-oldCoord.x, newCoord.y-oldCoord.y)
		return a

	getCoord = (e) ->
		# Need to take into account mozilla
		coord = {x: e.offsetX, y:e.offsetY}
		return coord

	getBox = (obj) ->
		box = {width: obj.width(), height: obj.height()}
		return box

	coordAfterBoundary = (coord, menuBox, boundary) ->
		if( (coord.x+menuBox.width) > boundary.width)
			# To Fix: Error... menu li ui is out of range
			coord.x = boundary.width - menuBox.width
			$('ul.menu li ul').css(left: -(menuBox.width))
		else
			$('ul.menu li ul').css(left:(menuBox.width))

		if( (coord.y + menuBox.height) > boundary.height )
			coord.y = boundary.height- menuBox.height
		return coord

	# Disable right click
	$('svg').live 'contextmenu' , (e) ->
		location = getCoord(e)
		menuBox = getBox($('#main-menu'))

		# Checking Boundaries, modify menu position so it does not show out of scope
		# Broken: please fix-- someone?
		# coord = coordAfterBoundary(getCoord(e), menuBox, getBox($('#canvas')) )
		coord = location

		# Show Edit or new depending if object is selected
		if currentCanvas.isSelected()
			$('#main-menu').hide()
			if currentCanvas.selectedObjectArray.length > 1
				$('#group-menu').show().css({top:coord.y, left:coord.x})
			else
				$('#edit-menu').show().css({top:coord.y, left:coord.x})
		else
			$('#edit-menu').hide()
			$('#group-menu').hide()
			$('#main-menu').show().css({top:coord.y, left:coord.x})
		return false

	$('svg').live 'mousedown', (e) ->
		if e.which != 1 then return
		if e.target.nodeName == 'svg' or currentCanvas.selectedObjectArray.length < 2
			# Did not click on any element or there's only one element
			rectLocation = getCoord(e)
			currentCanvas.rectangle = new rect(currentCanvas.paper, rectLocation, rectLocation)
			currentCanvas.setLight()
			offset = currentCanvas.offsetCoord
		# if currentCanvas.paper.getElementByPoint(rectLocation.x+offset.dx, rectLocation.y+offset.dy) != null
		# 	console.log currentCanvas.paper.getElementByPoint(rectLocation.x+offset.dx, rectLocation.y+offset.dy)
		# 	currentCanvas.deleteRect()


	$('svg').live 'mousemove', (e) ->
		currentCanvas.moveToFront()
		if currentCanvas.rectangleStatus is 0
			if currentCanvas.rectangle != undefined
				currentCanvas.rectangle.remRect(currentCanvas.rectangle.getRect())
				currentCanvas.rectangle = new rect(currentCanvas.paper, rectLocation, getCoord(e))
				currentCanvas.setLight()
				console.log currentCanvas.selectedObjectArray.length

	$('svg').live 'mouseup', (e) ->
		currentCanvas.selectedTranslate = false
		# currentCanvas.setLight()
		# console.log currentCanvas.selectedObjectArray.length
		currentCanvas.deleteRect()

	$('body').click (e)->
		$('#main-menu').hide()
		$('#edit-menu').hide()
		$('#group-menu').hide()


	$('#saveModuleButton').click ->
		saveModuleAttr()
		clearModuleInputs() #clear html form 
		$('#popup-module').css("display","none")
		$('#saveModuleButton').css("display", "none")
		$('#createModuleButton').css("display", "block")

	$('#saveDataSourceButton').click ->
		saveDataSourceAttr()
		clearDataSourceInputs()
		$('#popup-data-source').css("display","none")
		$('#saveDataSourceButton').css("display", "none")
		$('#createDataSourceButton').css("display", "block")

	$('#saveDataSinkButton').click ->
		saveDataSinkAttr()
		clearDataSinkInputs()
		$('#popup-data-sink').css("display","none")
		$('#saveDataSinkButton').css("display", "none")
		$('#createDataSinkButton').css("display", "block")				


	$('.edit_module').click ->
		obj = currentCanvas.selectedObjectArray[0].attr
		#console.log "clicked"
		if (obj.objectType == 'module')
			getModuleAttr()
			$('#popup-module').css("display","block")
			$('#saveModuleButton').css("display", "block")
			$('#createModuleButton').css("display", "none")

		if (obj.objectType == 'dataSink')
			getDataSinkAttr()
			$('#popup-data-sink').css("display","block")
			$('#saveDataSinkButton').css("display", "block")
			$('#createDataSinkButton').css("display", "none")


		if (obj.objectType == 'dataSource')
			getDataSourceAttr()
			$('#popup-data-source').css("display","block")
			$('#saveDataSourceButton').css("display", "block")
			$('#createDataSourceButton').css("display", "none")


	$('#group_modules').click (e) ->
		currentCanvas.newGroup(location)

	$('#option_module').click (e)->
		$('#popup-module').show()
		$('.popup-tab').hide()
		$('#module-info').show()
		$('#module-parameters-bt.tabSelected').removeClass('tabSelected')
		$('#module-execution-bt.tabSelected').removeClass('tabSelected')
		$('#module-metadata-bt.tabSelected').removeClass('tabSelected')
		$('#module-info-module').show()
		$('#module-info-module-website').show()
		$('li#module-info-bt').addClass('tabSelected')

	$('#option_data_source').click (e) ->
		$('#popup-data-source').show()
		$('.popup-tab').hide()
		$('#data-source-info-bt').addClass('tabSelected')
		$('#data-source-info').show()
		$('#data-source-inputs-bt.tabSelected').removeClass('tabSelected')

	$('#option_data_sink').click (e) ->
		$('#popup-data-sink').show()
		$('.popup-tab').hide()
		$('#data-sink-info-bt').addClass('tabSelected')
		$('#data-sink-info').show()
		$('#data-sink-outputs-bt.tabSelected').removeClass('tabSelected')

	$('#createModuleButton').click ->
		currentCanvas.newModule(location, generate_module_attr())
		$(@).parents('.popUpObjectBox').hide()

	$('#createDataSinkButton').click ->
		currentCanvas.newDataSink(location, generate_data_sink_attr())
		$(@).parents('.popUpObjectBox').hide()

	$('#createDataSourceButton').click ->
		currentCanvas.newDataSource(location, generate_data_source_attr())
		$(@).parents('.popUpObjectBox').hide()

	$('.cancelObjectButton').click ->
		$(@).parents('.popUpObjectBox').hide()

	oldCoord = {x:0, y:0}
	newCoord = {x:0, y:0}
	$('.paste').click (e) ->
		console.log tempCopiedArray
		newCoord = {x: e.pageX, y:e.pageY}
		if tempCopiedArray.length > 0 then pasteSelected(tempCopiedArray)
		console.log currentCanvas.holder

	$('.copy').click (e) ->
		oldCoord = {x: e.pageX, y:e.pageY}
		console.log e.pageX
		tempCopiedArray = currentCanvas.selectedObjectArray
		console.log tempCopiedArray

	$('.cut').click (e) ->
		oldCoord = {x: e.pageX, y:e.pageY}
		tempCopiedArray = currentCanvas.selectedObjectArray
		#holdMap = new Object()
		#for i in [0..currentCanvas.holder.length-1]	
		#	holdMap[currentCanvas.holder[i].objs[0]] = 
		#console.log holdMap
		#console.log currentCanvas.selectedObjectArray
		console.log "here"
		#console.log currentCanvas.selectedObjectArray
		for i in [0..tempCopiedArray.length-1]
		#	console.log tempCopiedArray[i]
			#tempCopiedArray[i].remove()
			tempCopiedArray[i].coord = {x: tempCopiedArray[i].c.getBBox().x, y: tempCopiedArray[i].c.getBBox().y} 
			if (tempCopiedArray[i].moduleGlow!="") then tempCopiedArray[i].removeAll()
			#console.log "copying" 
			#console.log tempCopiedArray[i].coord
			currentCanvas.holder[$.inArray(tempCopiedArray[i], currentCanvas.holder)].deleteObject()
			#delete currentCanvas.holder[$.inArray(tempCopiedArray[i], currentCanvas.holder)]
			currentCanvas.holder.splice( $.inArray(tempCopiedArray[i], currentCanvas.holder), 1 );
		console.log currentCanvas.holder
		console.log tempCopiedArray

	$('.delete').click (e) ->
		tempCopiedArray = currentCanvas.selectedObjectArray
		for i in [0..tempCopiedArray.length-1]
		#	console.log tempCopiedArray[i]
			#tempCopiedArray[i].removeAll()
			if (tempCopiedArray[i].moduleGlow!="") then tempCopiedArray[i].removeAll()
			tempCopiedArray[i].deleteObject()
			currentCanvas.translatePaths()
			#delete currentCanvas.holder[$.inArray(tempCopiedArray[i], currentCanvas.holder)]
			currentCanvas.holder.splice( $.inArray(tempCopiedArray[i], currentCanvas.holder), 1 );
		tempCopiedArray = []
		console.log currentCanvas.holder
		#keys = [];
		#for key in holdMap
		#	if key != undefined
		#		keys.push(key)
		#console.log keys
		#console.log "HEHE"
		#c.remove()
		#console.log currentCanvas.holder
	$('.select_all').click ->
		currentCanvas.setAllSelectedGlow()

	window.canvasHash = {'canvas-1': new canvasDisplay($('#canvas-1'))}
	window.currentCanvas = canvasHash['canvas-1']
	$('svg:last').attr('id', 'svg-canvas-1')