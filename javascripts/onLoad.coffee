$ ->
	items = []
	location = ""
	
	getCoord = (e) ->
		# Need to take into account mozilla
		coord = {x: e.offsetX, y:e.offsetY}
		return coord
	
	getBox = (obj) ->
		box = {width: obj.width(), height: obj.height()}
		return box
		
	coordAfterBoundary = (coord, menuBox, boundary) ->
		if( (coord.x+menuBox.width) > boundary.width)
			coord.x = boundary.width - menuBox.width
			$('ul.menu li ul').css(left: -(menuBox.width))
		else
			$('ul.menu li ul').css(left:(menuBox.width))
			
		if( (coord.y + menuBox.height) > CANVASBOX.height )
			coord.y = CANVASBOX.height- menuBox.height
		return coord
	
	CANVASBOX = getBox($('#canvas'))
	
	# Disable right click
	$(document).bind 'contextmenu' , (e) ->
		location = e
		menuBox = getBox($('#main-menu'))
		
		
		
		# Checking Boundaries, modify menu position so it does not show out of scope
		coord = coordAfterBoundary(getCoord(e), menuBox, CANVASBOX)
		
		# Show Edit or new depending if object is selected
		if canvas.isSelected()
			$('#edit-menu').hide()
			$('#main-menu').show().css({top:coord.y, left:coord.x})
		else
			$('#main-menu').hide()
			$('#edit-menu').show().css({top:coord.y, left:coord.x})
		return false

	$('body').click (e)->
		$('#main-menu').hide()
		$('#edit-menu').hide()
		if(e.target.nodeName != "circle")
			canvas.removeGlow()
	
	# orig_x = 0
	# orig_y = 0
	# drag = false
	# selectRect = ""
	# $('body').mousedown (e) ->
	# 	if e.which ==1 && (e.target.nodeName != "circle")
	# 		drag = true
	# 		orig_x = e.offsetX
	# 		orig_y = e.offsetY
	# 		selectRect = canvas.select(orig_x, orig_y, 1, 1)
	# $('body').mouseup (e) ->
	# 	if e.which ==1 && (e.target.nodeName != "circle")
	# 		if e.which ==1
	# 			drag = false
	# 			selectRect.remove()
	# $('body').mousemove (e) ->
	# 	selectRect.remove() # error-> when selectRect is empty
	# 	if e.which ==1 && (e.target.nodeName != "circle")
	# 		if drag
	# 			selectRect.remove()
	# 			selectRect = canvas.select(orig_x, orig_y, e.offsetX-orig_x , e.offsetY-orig_y)
	# 	
	
	$('#option_module').click (e)->
		canvas.newModule(location)
			
	canvas = new canvasDisplay($('#canvas'))