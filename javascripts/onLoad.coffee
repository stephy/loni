$ ->
	items = []
	location = ""
	rectLocation = ""
	startDraw = false
	tempRect = ""
	tempCopiedArray = []
	# Testing:
	attr = {name: "Song!"}
	

	
	#data sink form data
	generate_data_sink_attr = () ->
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
	  #clear form
	  $('input#data-sink_name').val('')
	  $('input#data-sink_package').val('')
	  $('input#data-sink_pkg_version').val('')
	  $('input#data_sink_tags').val('')
	  $('textarea#data_sink_description').val('')
	  
	  return data_sink_attr
	

	pasteSelected = (objArray) ->
		console.log "PASTING!!!"
		console.log objArray
		for i in [0..objArray.length-1]
			if objArray[i].modID is 0
				a = currentCanvas.newModule({x:objArray[i].c.getBBox().x, y:objArray[i].c.getBBox().y}, attr)
			else if objArray[i].modID is 1
				a = currentCanvas.newDataSink({x:objArray[i].c.getBBox().x, y:objArray[i].c.getBBox().y}, attr)
			else 
				a =currentCanvas.newDataSource({x:objArray[i].c.getBBox().x, y:objArray[i].c.getBBox().y}, attr)
			a.ztranslate(newCoord.x-oldCoord.x, newCoord.y-oldCoord.y)
			
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
			$('#edit-menu').show().css({top:coord.y, left:coord.x})
		else
			$('#edit-menu').hide()
			$('#main-menu').show().css({top:coord.y, left:coord.x})
		return false
		
	$('svg').live 'mousedown', (e) ->
		if e.which != 1 then return
		rectLocation = getCoord(e)
		currentCanvas.rectangle = new rect(currentCanvas.paper, rectLocation, rectLocation)
		currentCanvas.setLight()
		offset = currentCanvas.offsetCoord
		# if currentCanvas.paper.getElementByPoint(rectLocation.x+offset.dx, rectLocation.y+offset.dy) != null
		# 	console.log currentCanvas.paper.getElementByPoint(rectLocation.x+offset.dx, rectLocation.y+offset.dy)
		# 	currentCanvas.deleteRect()
			
			
	$('svg').live 'mousemove', (e) ->
		if currentCanvas.rectangle != undefined
			currentCanvas.rectangle.remRect(currentCanvas.rectangle.getRect())
			currentCanvas.rectangle = new rect(currentCanvas.paper, rectLocation, getCoord(e))
			currentCanvas.setLight()
			console.log currentCanvas.selectedObjectArray.length
				
	$('svg').live 'mouseup', (e) ->
		currentCanvas.setLight()
		console.log currentCanvas.selectedObjectArray.length
		currentCanvas.deleteRect()

	$('body').click (e)->
		$('#main-menu').hide()
		$('#edit-menu').hide()
		# console.log e.target.nodeName
		if(e.target.nodeName != "circle" and e.target.nodeName != "path" )
			currentCanvas.removeGlow()

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
		currentCanvas.newModule(location, attr)
		$(@).parents('.popUpObjectBox').hide()
		
	$('#createDataSinkButton').click ->
		currentCanvas.newDataSink(location, generate_data_sink_attr())
		$(@).parents('.popUpObjectBox').hide()
		
	$('#createDataSourceButton').click ->
		currentCanvas.newDataSource(location, generate_data_sink_attr())
		$(@).parents('.popUpObjectBox').hide()
		
	$('.cancelObjectButton').click ->
		$(@).parents('.popUpObjectBox').hide()
	
	oldCoord = {x:0, y:0}
	newCoord = {x:0, y:0}
	$('.paste').click (e) ->
		newCoord = {x: e.pageX, y:e.pageY}
		pasteSelected(tempCopiedArray)
	
	$('#copy').click (e) ->
		oldCoord = {x: e.pageX, y:e.pageY}
		console.log e.pageX
		tempCopiedArray = currentCanvas.selectedObjectArray
		console.log tempCopiedArray
		
		
	window.canvasHash = {'canvas-1': new canvasDisplay($('#canvas-1'))}
	window.currentCanvas = canvasHash['canvas-1']
	$('svg:last').attr('id', 'svg-canvas-1')
	
	currentCanvas.newDataSink({x:100, y:200}, attr)
	currentCanvas.newModule({x:450, y:250}, attr)
	currentCanvas.newDataSource({x:400, y:250}, attr)