$ ->
	items = []
	location = ""
	rectLocation = ""
	startDraw = false
	
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
			$('#edit-menu').hide()
			$('#main-menu').show().css({top:coord.y, left:coord.x})
		else
			$('#main-menu').hide()
			$('#edit-menu').show().css({top:coord.y, left:coord.x})
		return false
		
	$('svg').live 'mousedown', (e) ->
		if(currentCanvas.paper.getElementByPoint(e.offsetX+currentCanvas.offsetCoord.dx, e.offsetY+currentCanvas.offsetCoord.dy) == null)
			rectLocation = getCoord(e)
			startDraw = true
		else
			startDraw = false
		
	$('svg').live 'mousemove', (e) ->
		if startDraw
			if currentCanvas.rectangle != undefined
				currentCanvas.rectangle.remRect(currentCanvas.rectangle.getRect())
			currentCanvas.rectangle = new rect(currentCanvas.paper, rectLocation, getCoord(e))
			currentCanvas.setLight()
	$('svg').live 'mouseup', (e) ->
		startDraw = false
		currentCanvas.rectangle.remRect(currentCanvas.rectangle.getRect())
		currentCanvas.rectangle = undefined

	$('body').click (e)->
		$('#main-menu').hide()
		$('#edit-menu').hide()
		# console.log e.target.nodeName
		if(e.target.nodeName != "circle" and e.target.nodeName != "path" )
			currentCanvas.removeGlow()

	$('#option_module').click (e)->
		$('#popup-module').show()
	$('#option_data_sink').click (e) ->
		$('#popup-data-sink').show()

	$('#createModuleButton').click ->
		currentCanvas.newModule(location)
		$(@).parents('.popUpObjectBox').hide()
	$('#createDataSinkButton').click ->
		currentCanvas.newDataSink(location)
		$(@).parents('.popUpObjectBox').hide()
		
	$('.cancelObjectButton').click ->
		$(@).parents('.popUpObjectBox').hide()
		
		
	window.canvasHash = {'canvas-1': new canvasDisplay($('#canvas-1'))}
	window.currentCanvas = canvasHash['canvas-1']
	$('svg:last').attr('id', 'svg-canvas-1')
	
	currentCanvas.newDataSink({x:100, y:200})
	currentCanvas.newDataSink({x:450, y:250})
	currentCanvas.newDataSource({x:400, y:250})